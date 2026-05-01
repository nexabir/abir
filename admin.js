// Removed Supabase dependencies since we are using purely local auth
let githubConfig = {
    token: localStorage.getItem('gh_token') || '',
    user: 'nexabir',
    repo: 'abir'
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
// 1. Supabase Authentication
// -----------------------------------------------------

// Session Check on Load
function checkSession() {
    // Check local login
    const logged = localStorage.getItem('loggedIn');
    if (logged === 'true') {
        showDashboard();
    }
}
checkSession();

// Login
    // Login with username/password (local credentials)
    document.getElementById('login-btn').addEventListener('click', () => {
        const username = document.getElementById('login-email').value.trim(); // repurposed as username
        const password = document.getElementById('login-pass').value;
        // Load stored credentials
        const stored = JSON.parse(localStorage.getItem('adminCreds') || 'null');
        if (stored && stored.username === username && stored.password === password) {
            // Successful local login
            showStatus('Logging in...', 'saving');
            // Mark session flag
            localStorage.setItem('loggedIn', 'true');
            showDashboard();
        } else {
            alert('Invalid username or password! If you have not created an account yet, use the Sign Up button.');
        }
    });

// Signup (Temporary for initial user creation)
    // Signup (temporary) – create local credentials if none exist
    document.getElementById('signup-btn').addEventListener('click', async () => {
        const username = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-pass').value;
        if (confirm('Create a new admin account with this username/password?')) {
            const creds = { username, password };
            localStorage.setItem('adminCreds', JSON.stringify(creds));
            alert('Local admin account created. You can now log in with these credentials.');
        }
    });

async function showDashboard() {
    authOverlay.style.display = 'none';
    adminMain.style.display = 'block';
    sidebar.style.display = 'flex';
    actionBar.style.display = 'flex';
    
    // Check if GitHub token is present
    if (!githubConfig.token) {
        const token = prompt("GitHub Token Required. Please enter your PAT to enable 'Save' functionality:");
        if (token) {
            githubConfig.token = token.trim();
            localStorage.setItem('gh_token', githubConfig.token);
        }
    }

    const success = await fetchData();
    if (success) {
        populateForms();
    } else {
        showStatus("GitHub Sync Error. Check your Token/Repo in Settings.", "error");
    }
}

// -----------------------------------------------------
// 2. Data Sync (GitHub API)
// -----------------------------------------------------

async function fetchData() {
    if (!githubConfig.token) return false;
    const url = `https://api.github.com/repos/${githubConfig.user}/${githubConfig.repo}/contents/content.json`;
    try {
        const response = await fetch(url, {
            headers: { 'Authorization': `Bearer ${githubConfig.token}` }
        });
        
        if (response.status === 401 || response.status === 403) {
            console.error("Auth Error:", response.status);
            return false;
        }
        if (!response.ok) return false;

        const json = await response.json();
        currentSha = json.sha;
        currentData = JSON.parse(atob(json.content));
        return true;
    } catch (e) {
        return false;
    }
}

async function saveToGithub() {
    if (!githubConfig.token) {
        alert("GitHub Token missing. Setup in Settings.");
        return;
    }
    showStatus("Saving...", "saving");
    
    const updatedData = collectFormData();
    const content = btoa(unescape(encodeURIComponent(JSON.stringify(updatedData, null, 2))));
    
    const url = `https://api.github.com/repos/${githubConfig.user}/${githubConfig.repo}/contents/content.json`;
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 
                'Authorization': `Bearer ${githubConfig.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: "Update website content via Supabase Admin",
                content: content,
                sha: currentSha
            })
        });

        if (response.ok) {
            const resJson = await response.json();
            currentSha = resJson.content.sha;
            
            const cvFile = document.getElementById('cv-upload').files[0];
            if (cvFile) await uploadCV(cvFile);

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
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
        reader.onload = async () => {
            const base64Content = reader.result.split(',')[1];
            let cvSha = null;
            const getUrl = `https://api.github.com/repos/${githubConfig.user}/${githubConfig.repo}/contents/${file.name}`;
            const getRes = await fetch(getUrl, { headers: { 'Authorization': `Bearer ${githubConfig.token}` } });
            if (getRes.ok) {
                const getJson = await getRes.json();
                cvSha = getJson.sha;
            }

            const putUrl = `https://api.github.com/repos/${githubConfig.user}/${githubConfig.repo}/contents/${file.name}`;
            await fetch(putUrl, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${githubConfig.token}` },
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

    // Visibility
    document.getElementById('toggle-foundation').checked = currentData.sections.visibility.foundation;
    document.getElementById('toggle-strategy').checked = currentData.sections.visibility.strategy;
    document.getElementById('toggle-projects').checked = currentData.sections.visibility.projects;
    document.getElementById('toggle-delivery').checked = currentData.sections.visibility.delivery;

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
    document.getElementById('color-skin').value = currentData.graphics.character.skin;
    document.getElementById('color-hardhat').value = currentData.graphics.character.hardhat;
    document.getElementById('color-cap').value = currentData.graphics.character.cap;
    document.getElementById('color-briefcase').value = currentData.graphics.character.briefcase;
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
    const data = JSON.parse(JSON.stringify(currentData));
    data.hero.name = document.getElementById('hero-name-input').value;
    data.hero.title = document.getElementById('hero-title-input').value;
    data.hero.intro = document.getElementById('hero-intro-input').value;
    data.hero.linkedin_url = document.getElementById('hero-linkedin-input').value;
    data.sections.visibility.foundation = document.getElementById('toggle-foundation').checked;
    data.sections.visibility.strategy = document.getElementById('toggle-strategy').checked;
    data.sections.visibility.projects = document.getElementById('toggle-projects').checked;
    data.sections.visibility.delivery = document.getElementById('toggle-delivery').checked;
    data.sections.foundation.title = document.getElementById('exp-section-title').value;
    data.sections.foundation.subtitle = document.getElementById('exp-section-subtitle').value;
    data.sections.strategy.title = document.getElementById('strategy-section-title').value;
    data.sections.strategy.insights = document.getElementById('strategy-insights-input').value.split('\n').filter(l => l.trim() !== '');
    data.sections.strategy.toolkit = document.getElementById('strategy-toolkit-input').value.split(',').map(s => s.trim()).filter(s => s !== '');
    data.sections.delivery.points = document.getElementById('delivery-points-input').value.split('\n').filter(l => l.trim() !== '');
    data.sections.contact.title = document.getElementById('contact-title-input').value;
    data.sections.contact.email = document.getElementById('contact-email-input').value;
    data.sections.contact.phone = document.getElementById('contact-phone-input').value;
    data.sections.contact.academics = document.getElementById('contact-academics-input').value.split('\n').filter(l => l.trim() !== '');
    data.graphics.theme.daySky = document.getElementById('color-daySky').value;
    data.graphics.theme.nightSky = document.getElementById('color-nightSky').value;
    data.graphics.character.skin = document.getElementById('color-skin').value;
    data.graphics.character.hardhat = document.getElementById('color-hardhat').value;
    data.graphics.character.cap = document.getElementById('color-cap').value;
    data.graphics.character.briefcase = document.getElementById('color-briefcase').value;
    data.graphics.environment.characterShirt = document.getElementById('color-shirt').value;
    data.graphics.environment.factoryBelt = document.getElementById('color-belt').value;
    data.graphics.environment.marketBars = document.getElementById('color-bars').value;
    data.graphics.particles.type = document.getElementById('particle-type').value;
    data.graphics.particles.count = parseInt(document.getElementById('particle-count').value);
    const cvFile = document.getElementById('cv-upload').files[0];
    if (cvFile) data.hero.cv_url = cvFile.name;
    return data;
}

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

document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
        document.querySelectorAll('.editor-section').forEach(s => s.classList.remove('active'));
        item.classList.add('active');
        document.getElementById(item.dataset.target).classList.add('active');
    });
});

document.getElementById('save-btn').addEventListener('click', saveToGithub);

// Reset GitHub Token
document.getElementById('reset-token-btn').addEventListener('click', () => {
    if (confirm("Are you sure you want to remove the current GitHub token?")) {
        localStorage.removeItem('gh_token');
        githubConfig.token = '';
        location.reload();
    }
});

// Logout clears simple session
document.getElementById('logout-btn').addEventListener('click', async () => {
    localStorage.removeItem('loggedIn');
    location.reload();
});

function showStatus(text, type) {
    statusBadge.innerText = text;
    statusBadge.className = `status-badge ${type}`;
    statusBadge.style.display = 'block';
}

function hideStatus() {
    statusBadge.style.display = 'none';
}
