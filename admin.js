let config = {
    token: localStorage.getItem('gh_token') || '',
    user: localStorage.getItem('gh_user') || '',
    repo: localStorage.getItem('gh_repo') || ''
};

let currentData = null;
let currentSha = null;

// DOM Elements
const authOverlay = document.getElementById('auth-overlay');
const adminMain = document.getElementById('admin-main');
const sidebar = document.getElementById('sidebar');
const actionBar = document.getElementById('action-bar');
const statusBadge = document.getElementById('status-badge');

// -----------------------------------------------------
// 1. Authentication & Startup
// -----------------------------------------------------

if (config.token && config.user && config.repo) {
    document.getElementById('github-token').value = config.token;
    document.getElementById('github-user').value = config.user;
    document.getElementById('github-repo').value = config.repo;
    autoLogin();
}

async function autoLogin() {
    statusBadge.innerText = "Connecting...";
    statusBadge.className = "status-badge saving";
    const success = await fetchData();
    if (success) {
        showAdmin();
    } else {
        localStorage.clear();
        alert("Authentication failed. Please check your token and repo details.");
    }
}

document.getElementById('auth-btn').addEventListener('click', async () => {
    config.token = document.getElementById('github-token').value.trim();
    config.user = document.getElementById('github-user').value.trim();
    config.repo = document.getElementById('github-repo').value.trim();

    if (!config.token || !config.user || !config.repo) {
        alert("Please fill in all fields.");
        return;
    }

    const success = await fetchData();
    if (success) {
        localStorage.setItem('gh_token', config.token);
        localStorage.setItem('gh_user', config.user);
        localStorage.setItem('gh_repo', config.repo);
        showAdmin();
    } else {
        alert("Could not connect to GitHub. Verify your Repo Owner, Repo Name, and Token (with 'repo' scope).");
    }
});

function showAdmin() {
    authOverlay.style.display = 'none';
    adminMain.style.display = 'block';
    sidebar.style.display = 'flex';
    actionBar.style.display = 'flex';
    populateForms();
}

// -----------------------------------------------------
// 2. Data Sync
// -----------------------------------------------------

async function fetchData() {
    const url = `https://api.github.com/repos/${config.user}/${config.repo}/contents/content.json`;
    try {
        const response = await fetch(url, {
            headers: { 'Authorization': `Bearer ${config.token}` }
        });
        
        if (response.status === 401 || response.status === 403) {
            console.error("Auth Error:", response.status);
            alert("GitHub says: Unauthorized. Check if your token is correct and has 'repo' scope.");
            return false;
        }
        if (response.status === 404) {
            console.error("Not Found:", response.status);
            alert(`GitHub says: Not Found. Verify your Username (${config.user}) and Repo Name (${config.repo}) are exact (case-sensitive).`);
            return false;
        }
        if (!response.ok) return false;

        const json = await response.json();
        currentSha = json.sha;
        currentData = JSON.parse(atob(json.content));
        return true;
    } catch (e) {
        console.error("Connection Error:", e);
        return false;
    }
}

async function saveToGithub() {
    showStatus("Saving...", "saving");
    
    // 1. Prepare Content
    const updatedData = collectFormData();
    const content = btoa(unescape(encodeURIComponent(JSON.stringify(updatedData, null, 2))));
    
    // 2. Push content.json
    const url = `https://api.github.com/repos/${config.user}/${config.repo}/contents/content.json`;
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 
                'Authorization': `Bearer ${config.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: "Update website content via Admin Panel",
                content: content,
                sha: currentSha
            })
        });

        if (response.ok) {
            const resJson = await response.json();
            currentSha = resJson.content.sha; // Update SHA for next save
            
            // 3. Handle CV Upload if exists
            const cvFile = document.getElementById('cv-upload').files[0];
            if (cvFile) {
                await uploadCV(cvFile);
            }

            showStatus("Changes pushed to GitHub!", "success");
            setTimeout(() => hideStatus(), 3000);
        } else {
            showStatus("Error pushing to GitHub", "error");
        }
    } catch (e) {
        showStatus("Connection Error", "error");
    }
}

async function uploadCV(file) {
    showStatus("Uploading CV...", "saving");
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
        reader.onload = async () => {
            const base64Content = reader.result.split(',')[1];
            
            // Get SHA of existing CV (to overwrite)
            let cvSha = null;
            const getUrl = `https://api.github.com/repos/${config.user}/${config.repo}/contents/${file.name}`;
            const getRes = await fetch(getUrl, { headers: { 'Authorization': `Bearer ${config.token}` } });
            if (getRes.ok) {
                const getJson = await getRes.json();
                cvSha = getJson.sha;
            }

            const putUrl = `https://api.github.com/repos/${config.user}/${config.repo}/contents/${file.name}`;
            await fetch(putUrl, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${config.token}` },
                body: JSON.stringify({
                    message: "Update CV via Admin Panel",
                    content: base64Content,
                    sha: cvSha
                })
            });
            resolve();
        };
    });
}

// -----------------------------------------------------
// 3. UI Helpers
// -----------------------------------------------------

function populateForms() {
    if (!currentData) return;

    // Hero
    document.getElementById('hero-name-input').value = currentData.hero.name;
    document.getElementById('hero-title-input').value = currentData.hero.title;
    document.getElementById('hero-intro-input').value = currentData.hero.intro;
    document.getElementById('hero-linkedin-input').value = currentData.hero.linkedin_url;

    // Experience
    document.getElementById('exp-section-title').value = currentData.sections.foundation.title;
    document.getElementById('exp-section-subtitle').value = currentData.sections.foundation.subtitle;
    renderExperienceList();

    // Strategy
    document.getElementById('strategy-section-title').value = currentData.sections.strategy.title;
    document.getElementById('strategy-insights-input').value = currentData.sections.strategy.insights.join('\n');
    document.getElementById('strategy-toolkit-input').value = currentData.sections.strategy.toolkit.join(', ');

    // Projects
    renderProjectsList();

    // Delivery
    document.getElementById('delivery-points-input').value = currentData.sections.delivery.points.join('\n');

    // Contact
    document.getElementById('contact-title-input').value = currentData.sections.contact.title;
    document.getElementById('contact-email-input').value = currentData.sections.contact.email;
    document.getElementById('contact-phone-input').value = currentData.sections.contact.phone;
    document.getElementById('contact-academics-input').value = currentData.sections.contact.academics.join('\n');

    // Graphics
    document.getElementById('color-daySky').value = currentData.graphics.theme.daySky;
    document.getElementById('color-nightSky').value = currentData.graphics.theme.nightSky;
    document.getElementById('color-shirt').value = currentData.graphics.environment.characterShirt;
    document.getElementById('color-belt').value = currentData.graphics.environment.factoryBelt;
    document.getElementById('color-bars').value = currentData.graphics.environment.marketBars;
    document.getElementById('particle-type').value = currentData.graphics.particles.type;
    document.getElementById('particle-count').value = currentData.graphics.particles.count;

    // Assets
    document.getElementById('current-cv-name').innerText = currentData.hero.cv_url;
}

function renderExperienceList() {
    const container = document.getElementById('exp-list-container');
    container.innerHTML = currentData.sections.foundation.experience.map((exp, index) => `
        <div class="list-item">
            <button class="remove-btn" onclick="removeItem('exp', ${index})">×</button>
            <div class="form-group" style="padding:0; border:none; background:none; margin-bottom:1rem;">
                <label>Company</label>
                <input type="text" value="${exp.company}" onchange="updateItem('exp', ${index}, 'company', this.value)">
            </div>
            <div class="form-group" style="padding:0; border:none; background:none; margin-bottom:1rem;">
                <label>Role</label>
                <input type="text" value="${exp.role}" onchange="updateItem('exp', ${index}, 'role', this.value)">
            </div>
            <div class="form-group" style="padding:0; border:none; background:none;">
                <label>Description</label>
                <textarea onchange="updateItem('exp', ${index}, 'description', this.value)">${exp.description}</textarea>
            </div>
        </div>
    `).join('');
}

function renderProjectsList() {
    const container = document.getElementById('projects-list-container');
    container.innerHTML = currentData.sections.projects.items.map((proj, index) => `
        <div class="list-item">
            <button class="remove-btn" onclick="removeItem('proj', ${index})">×</button>
            <div class="form-group" style="padding:0; border:none; background:none; margin-bottom:1rem;">
                <label>Project Title</label>
                <input type="text" value="${proj.title}" onchange="updateItem('proj', ${index}, 'title', this.value)">
            </div>
            <div class="form-group" style="padding:0; border:none; background:none;">
                <label>Description</label>
                <textarea onchange="updateItem('proj', ${index}, 'description', this.value)">${proj.description}</textarea>
            </div>
            ${proj.links.map((link, lIndex) => `
                <div style="display:flex; gap:10px; margin-top:5px;">
                    <input type="text" value="${link.label}" placeholder="Link Label" onchange="updateProjLink(${index}, ${lIndex}, 'label', this.value)">
                    <input type="text" value="${link.url}" placeholder="URL" onchange="updateProjLink(${index}, ${lIndex}, 'url', this.value)">
                </div>
            `).join('')}
        </div>
    `).join('');
}

function collectFormData() {
    const data = JSON.parse(JSON.stringify(currentData)); // Deep copy

    // Hero
    data.hero.name = document.getElementById('hero-name-input').value;
    data.hero.title = document.getElementById('hero-title-input').value;
    data.hero.intro = document.getElementById('hero-intro-input').value;
    data.hero.linkedin_url = document.getElementById('hero-linkedin-input').value;

    // Experience Header
    data.sections.foundation.title = document.getElementById('exp-section-title').value;
    data.sections.foundation.subtitle = document.getElementById('exp-section-subtitle').value;

    // Strategy
    data.sections.strategy.title = document.getElementById('strategy-section-title').value;
    data.sections.strategy.insights = document.getElementById('strategy-insights-input').value.split('\n').filter(l => l.trim() !== '');
    data.sections.strategy.toolkit = document.getElementById('strategy-toolkit-input').value.split(',').map(s => s.trim()).filter(s => s !== '');

    // Delivery
    data.sections.delivery.points = document.getElementById('delivery-points-input').value.split('\n').filter(l => l.trim() !== '');

    // Contact
    data.sections.contact.title = document.getElementById('contact-title-input').value;
    data.sections.contact.email = document.getElementById('contact-email-input').value;
    data.sections.contact.phone = document.getElementById('contact-phone-input').value;
    data.sections.contact.academics = document.getElementById('contact-academics-input').value.split('\n').filter(l => l.trim() !== '');

    // Graphics
    data.graphics.theme.daySky = document.getElementById('color-daySky').value;
    data.graphics.theme.nightSky = document.getElementById('color-nightSky').value;
    data.graphics.environment.characterShirt = document.getElementById('color-shirt').value;
    data.graphics.environment.factoryBelt = document.getElementById('color-belt').value;
    data.graphics.environment.marketBars = document.getElementById('color-bars').value;
    data.graphics.particles.type = document.getElementById('particle-type').value;
    data.graphics.particles.count = parseInt(document.getElementById('particle-count').value);
    
    // Asset Check
    const cvFile = document.getElementById('cv-upload').files[0];
    if (cvFile) {
        data.hero.cv_url = cvFile.name;
    }

    return data;
}

// Global scope functions for inline events
window.removeItem = (type, index) => {
    if (type === 'exp') currentData.sections.foundation.experience.splice(index, 1);
    if (type === 'proj') currentData.sections.projects.items.splice(index, 1);
    type === 'exp' ? renderExperienceList() : renderProjectsList();
};

window.updateItem = (type, index, field, value) => {
    if (type === 'exp') currentData.sections.foundation.experience[index][field] = value;
    if (type === 'proj') currentData.sections.projects.items[index][field] = value;
};

window.updateProjLink = (pIndex, lIndex, field, value) => {
    currentData.sections.projects.items[pIndex].links[lIndex][field] = value;
};

document.getElementById('add-exp-btn').addEventListener('click', () => {
    currentData.sections.foundation.experience.push({ company: "New Company", role: "Role", description: "Desc", tags: [] });
    renderExperienceList();
});

document.getElementById('add-project-btn').addEventListener('click', () => {
    currentData.sections.projects.items.push({ title: "New Project", description: "Desc", links: [{label: "Link", url: "#"}] });
    renderProjectsList();
});

// Sidebar Navigation
document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
        document.querySelectorAll('.editor-section').forEach(s => s.classList.remove('active'));
        
        item.classList.add('active');
        document.getElementById(item.dataset.target).classList.add('active');
    });
});

document.getElementById('save-btn').addEventListener('click', saveToGithub);

document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});

function showStatus(text, type) {
    statusBadge.innerText = text;
    statusBadge.className = `status-badge ${type}`;
}

function hideStatus() {
    statusBadge.style.display = 'none';
}
