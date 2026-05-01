// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

let siteData = null;

// -----------------------------------------------------
// 1. Data Loading
// -----------------------------------------------------
async function loadContent() {
    try {
        const response = await fetch('content.json');
        siteData = await response.json();
        
        // Populate UI
        updateUI();
        
        // Start Three.js
        initThreeJS();
    } catch (error) {
        console.error("Error loading content:", error);
    }
}

function updateUI() {
    if (!siteData) return;

    // SEO & Head
    document.title = `${siteData.hero.name} | ${siteData.hero.title}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', siteData.hero.intro);

    // Hero
    document.getElementById('header-name').innerText = siteData.hero.name;
    document.getElementById('header-title').innerText = siteData.hero.title;
    document.getElementById('header-linkedin').href = siteData.hero.linkedin_url;
    document.getElementById('header-cv').href = siteData.hero.cv_url;

    document.getElementById('hero-name-full').innerHTML = siteData.hero.name.split(' ').slice(0, -1).join(' ') + ` <span class="gradient-text">${siteData.hero.name.split(' ').pop()}</span>`;
    document.getElementById('hero-title-main').innerText = siteData.hero.title;
    document.getElementById('hero-intro').innerText = siteData.hero.intro;
    document.getElementById('hero-cv').href = siteData.hero.cv_url;
    document.getElementById('hero-linkedin').href = siteData.hero.linkedin_url;

    // Factory
    document.getElementById('factory-title').innerText = siteData.sections.foundation.title;
    document.getElementById('factory-subtitle').innerText = siteData.sections.foundation.subtitle;
    
    const expList = document.getElementById('experience-list');
    expList.innerHTML = siteData.sections.foundation.experience.map(exp => `
        <div class="cv-column">
            <h4>${exp.company}</h4>
            <p><em>${exp.role}</em><br>${exp.description}</p>
        </div>
    `).join('');

    const expTags = document.getElementById('experience-tags');
    expTags.innerHTML = siteData.sections.foundation.experience.flatMap(exp => exp.tags).map(tag => `<li>${tag}</li>`).join('');

    // Strategy
    document.getElementById('market-title').innerText = siteData.sections.strategy.title;
    document.getElementById('market-subtitle').innerText = siteData.sections.strategy.subtitle;
    document.getElementById('insights-list').innerHTML = siteData.sections.strategy.insights.map(point => `<li>${point}</li>`).join('');
    
    // Categorized Toolkit
    const toolkitContainer = document.getElementById('toolkit-container');
    if (siteData.sections.toolkit_categorized) {
        toolkitContainer.innerHTML = Object.entries(siteData.sections.toolkit_categorized).map(([cat, tags]) => `
            <div class="toolkit-category">
                <h4>${cat}</h4>
                <div class="toolkit-tags">
                    ${tags.map(t => `<span class="toolkit-tag">${t}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    // Projects
    document.getElementById('projects-title').innerText = siteData.sections.projects.title;
    document.getElementById('projects-subtitle').innerText = siteData.sections.projects.subtitle;
    
    const projectsList = document.getElementById('projects-list');
    projectsList.innerHTML = siteData.sections.projects.items.map(proj => `
        <div class="glass-card project-card">
            <h4 style="text-transform:none; margin-bottom: 0.5rem;">${proj.title}</h4>
            <div class="project-meta">
                <div class="meta-item"><strong>Business Problem</strong> ${proj.problem || "N/A"}</div>
                <div class="meta-item"><strong>Approach</strong> ${proj.approach || "N/A"}</div>
                <div class="meta-item"><strong>Outcome</strong> <span style="color:var(--accent-1); font-weight:600;">${proj.impact || "N/A"}</span></div>
            </div>
            <p style="font-size:0.85rem; opacity:0.8; margin-bottom:1rem;">${proj.description}</p>
            <div class="project-tools">
                ${(proj.tools || []).map(t => `<span class="tool-tag">${t}</span>`).join('')}
            </div>
            <div class="button-group" style="justify-content: flex-end; margin-top: 15px;">
                ${proj.links.map(link => `<a href="${link.url}" target="_blank" class="btn mini-btn ${link.label === 'Github' ? 'secondary-btn' : 'primary-btn'}" style="padding: 0.4rem 0.8rem; font-size: 0.75rem;">${link.label}</a>`).join('')}
            </div>
        </div>
    `).join('');

    // Delivery
    document.getElementById('delivery-title').innerText = siteData.sections.delivery.title;
    document.getElementById('delivery-subtitle').innerText = siteData.sections.delivery.subtitle;
    document.getElementById('delivery-points').innerHTML = siteData.sections.delivery.points.map(point => `<li>${point}</li>`).join('');

    // Contact
    document.getElementById('contact-title').innerText = siteData.sections.contact.title;
    document.getElementById('contact-description').innerText = siteData.sections.contact.description;
    document.getElementById('academics-list').innerHTML = siteData.sections.contact.academics.map(item => `<li>${item}</li>`).join('');
    
    document.getElementById('contact-cv').href = siteData.hero.cv_url;
    document.getElementById('contact-linkedin').href = siteData.hero.linkedin_url;
    document.getElementById('contact-email').href = `mailto:${siteData.sections.contact.email}`;
    document.getElementById('contact-phone').href = siteData.sections.contact.phone_url;
    document.getElementById('contact-phone').innerText = `Call ${siteData.sections.contact.phone}`;

    // Certifications
    const certsContainer = document.getElementById('certs-container');
    if (siteData.certifications) {
        certsContainer.innerHTML = siteData.certifications.map(cert => `
            <div class="cert-card">
                <img src="${cert.image}" alt="${cert.name}">
                <h4>${cert.name}</h4>
                <p>${cert.issuer} • ${cert.date}</p>
            </div>
        `).join('');
    }
}

// Premium Interactions Logic
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("scroll-progress").style.width = scrolled + "%";
});

const cursor = document.getElementById('custom-cursor');
window.addEventListener('mousemove', (e) => {
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

document.addEventListener('mousedown', () => cursor?.classList.add('active'));
document.addEventListener('mouseup', () => cursor?.classList.remove('active'));

// Hover effects for links
document.querySelectorAll('a, button, .sidebar-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursor?.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor?.classList.remove('active'));
});

// -----------------------------------------------------
// 2. Three.js Initialization
// -----------------------------------------------------
function initThreeJS() {
    const canvas = document.querySelector('#webgl');
    const scene = new THREE.Scene();

    const colors = {
        daySky: new THREE.Color(siteData.graphics.theme.daySky),
        nightSky: new THREE.Color(siteData.graphics.theme.nightSky)
    };
    let isNight = false;

    scene.fog = new THREE.FogExp2(colors.daySky, siteData.graphics.theme.fogDensity);
    scene.background = colors.daySky;

    const sizes = { width: window.innerWidth, height: window.innerHeight };
    const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 0.1, 100);
    camera.position.set(0, 3, 7); 
    scene.add(camera);

    // Particle System
    const particlesGroup = new THREE.Group();
    camera.add(particlesGroup);

    let particleGeo;
    if (siteData.graphics.particles.type === 'snow') {
        particleGeo = new THREE.SphereGeometry(0.02, 8, 8);
    } else {
        particleGeo = new THREE.ConeGeometry(0.05, 0.15, 3);
    }
    
    const particleMat = new THREE.MeshLambertMaterial({ color: siteData.graphics.particles.color, side: THREE.DoubleSide });
    const count = siteData.graphics.particles.count;
    const particles = [];

    for(let i=0; i<count; i++){
        const p = new THREE.Mesh(particleGeo, particleMat);
        p.position.x = (Math.random() - 0.5) * 20; 
        p.position.y = (Math.random() - 0.5) * 15;
        p.position.z = -3 - Math.random() * 10; 
        
        p.userData = {
            speedY: siteData.graphics.particles.speedY[0] + Math.random() * (siteData.graphics.particles.speedY[1] - siteData.graphics.particles.speedY[0]),
            speedX: siteData.graphics.particles.speedX[0] + Math.random() * (siteData.graphics.particles.speedX[1] - siteData.graphics.particles.speedX[0]),
            swaySpeed: 1 + Math.random() * 2,
            rotSpeedX: Math.random() * 0.05,
            rotSpeedY: Math.random() * 0.05
        }
        
        p.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        particlesGroup.add(p);
        particles.push(p);
    }

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    window.addEventListener('resize', () => {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();
        renderer.setSize(sizes.width, sizes.height);
    });

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const celestialGroup = new THREE.Group();
    celestialGroup.position.set(0, 0, -40); 
    scene.add(celestialGroup);

    const sunObj = new THREE.Mesh(new THREE.SphereGeometry(3, 32, 32), new THREE.MeshBasicMaterial({ color: 0xffcc00 }));
    sunObj.position.set(-10, 15, 0); 
    celestialGroup.add(sunObj);

    const moonObj = new THREE.Mesh(new THREE.SphereGeometry(2.5, 32, 32), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    moonObj.position.set(-10, -15, 0); 
    celestialGroup.add(moonObj);

    document.getElementById('theme-toggle').addEventListener('click', () => {
        isNight = !isNight;
        document.body.setAttribute('data-theme', isNight ? 'night' : 'day');
        document.getElementById('theme-toggle').innerText = isNight ? "☀️ Switch to Day" : "🌙 Switch to Night";

        gsap.to(scene.fog.color, { r: isNight ? colors.nightSky.r : colors.daySky.r, g: isNight ? colors.nightSky.g : colors.daySky.g, b: isNight ? colors.nightSky.b : colors.daySky.b, duration: 1.5 });
        gsap.to(scene.background, { r: isNight ? colors.nightSky.r : colors.daySky.r, g: isNight ? colors.nightSky.g : colors.daySky.g, b: isNight ? colors.nightSky.b : colors.daySky.b, duration: 1.5 });

        gsap.to(sunObj.position, { y: isNight ? -15 : 15, duration: 1.5, ease: "power2.inOut" });
        gsap.to(moonObj.position, { y: isNight ? 15 : -15, duration: 1.5, ease: "power2.inOut" });
        gsap.to(ambientLight, { intensity: isNight ? 0.3 : 0.8, duration: 1.5 });
    });

    // Sticky Header Logic
    const stickyHeader = document.getElementById('sticky-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight * 0.5) {
            stickyHeader.classList.add('visible');
        } else {
            stickyHeader.classList.remove('visible');
        }
    });

    // Materials
    const charTheme = siteData.graphics.character || { skin: '#ffccaa', hardhat: '#facc15', cap: '#ef4444', briefcase: '#8b4513' };
    const matSkin = new THREE.MeshLambertMaterial({ color: charTheme.skin });
    const matShirt = new THREE.MeshLambertMaterial({ color: siteData.graphics.environment.characterShirt }); 
    const matYellow = new THREE.MeshLambertMaterial({ color: charTheme.hardhat });
    const matBrown = new THREE.MeshLambertMaterial({ color: charTheme.briefcase });
    const matRed = new THREE.MeshLambertMaterial({ color: charTheme.cap });

    const character = new THREE.Group();
    scene.add(character);

    const headGroup = new THREE.Group();
    headGroup.position.y = 2.2;
    character.add(headGroup);

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), matSkin);
    headGroup.add(head);

    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 16), eyeMat);
    leftEye.position.set(-0.15, 0.1, 0.45);
    const rightEye = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 16), eyeMat);
    rightEye.position.set(0.15, 0.1, 0.45);
    headGroup.add(leftEye, rightEye);

    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.35, 1.2, 32), matShirt);
    body.position.y = 1.0;
    character.add(body);

    const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.0, 16), matSkin);
    leftArm.position.set(-0.6, 1.0, 0);
    const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.0, 16), matSkin);
    rightArm.position.set(0.6, 1.0, 0);
    character.add(leftArm, rightArm);

    const hardhat = new THREE.Mesh(new THREE.SphereGeometry(0.52, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2), matYellow);
    hardhat.position.y = 0.1;
    headGroup.add(hardhat);

    const briefcase = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.4, 0.5), matBrown);
    briefcase.position.set(0, -0.6, 0); 
    briefcase.visible = false;
    rightArm.add(briefcase); 

    const capBase = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.15, 32), matRed);
    const visor = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.05, 0.4), matRed);
    visor.position.set(0, -0.05, 0.4);
    const capGroup = new THREE.Group(); capGroup.add(capBase, visor);
    capGroup.position.set(0, 0.45, 0); capGroup.rotation.x = -0.1; capGroup.visible = false;
    headGroup.add(capGroup);

    const packageBox = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.5, 0.5), matBrown);
    packageBox.position.set(0, 0, 0.5); 
    packageBox.visible = false;
    body.add(packageBox);

    // Environments
    const factoryEnv = new THREE.Group();
    const belt = new THREE.Mesh(new THREE.BoxGeometry(4, 0.2, 2.5), new THREE.MeshLambertMaterial({color: siteData.graphics.environment.factoryBelt}));
    belt.position.set(0, -0.1, 1);
    factoryEnv.add(belt);
    scene.add(factoryEnv);

    const marketEnv = new THREE.Group();
    marketEnv.position.set(0, 0, -14);
    for(let i=0; i<4; i++){
        const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, i+1, 16), new THREE.MeshLambertMaterial({color: siteData.graphics.environment.marketBars}));
        bar.position.set(-1.5 + (i*1.0), (i+1)/2, 0);
        marketEnv.add(bar);
    }
    scene.add(marketEnv);

    const projectEnv = new THREE.Group();
    projectEnv.position.set(0, 0, -28);
    const glowingNode = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), new THREE.MeshLambertMaterial({color: siteData.graphics.environment.projectNode, emissive: siteData.graphics.environment.projectNode, emissiveIntensity: 0.2, wireframe: true}));
    glowingNode.position.set(0, 1, 0);
    projectEnv.add(glowingNode);
    scene.add(projectEnv);

    const deliveryEnv = new THREE.Group();
    deliveryEnv.position.set(0, 0, -42);
    const road = new THREE.Mesh(new THREE.BoxGeometry(6, 0.1, 6), new THREE.MeshLambertMaterial({color: siteData.graphics.environment.roadColor}));
    deliveryEnv.add(road);
    scene.add(deliveryEnv);

    // Animation Loop
    const clock = new THREE.Clock();
    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / sizes.width) * 2 - 1;
        mouseY = -(e.clientY / sizes.height) * 2 + 1;
    });

    const tick = () => {
        const time = clock.getElapsedTime();
        character.position.y = Math.sin(time * 2) * 0.05;
        leftArm.rotation.x = Math.sin(time * 2) * 0.1 + (packageBox.visible ? Math.PI/2 : 0);
        rightArm.rotation.x = -Math.sin(time * 2) * 0.1 + (packageBox.visible ? Math.PI/2 : 0);
        glowingNode.rotation.y = time * 0.5;

        const targetRotX = -mouseY * 0.4;
        const targetRotY = mouseX * 0.6;
        headGroup.rotation.x += (targetRotX - headGroup.rotation.x) * 0.1;
        headGroup.rotation.y += (targetRotY - headGroup.rotation.y) * 0.1;

        particles.forEach(p => {
            p.position.x -= p.userData.speedX;
            p.position.y -= p.userData.speedY;
            p.position.x += Math.sin(time * p.userData.swaySpeed) * 0.01;
            p.rotation.x += p.userData.rotSpeedX;
            p.rotation.y += p.userData.rotSpeedY;
            if(p.position.y < -7) p.position.y = 7;
            if(p.position.x < -10) p.position.x = 10;
        });

        renderer.render(scene, camera);
        window.requestAnimationFrame(tick);
    };
    tick();

    // GSAP Timeline
    const cards = gsap.utils.toArray('.glass-card');
    cards.forEach(card => gsap.to(card, { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: card, start: "top 80%", toggleActions: "play none none reverse" }}));

    let tl = gsap.timeline({
        scrollTrigger: { trigger: ".content-wrapper", start: "top top", end: "bottom bottom", scrub: 1 }
    });

    // Determine Visible Sections
    const vis = siteData.sections.visibility || { foundation: true, strategy: true, projects: true, delivery: true };
    
    if (!vis.foundation) { document.getElementById('factory').style.display = 'none'; factoryEnv.visible = false; }
    if (!vis.strategy) { document.getElementById('market').style.display = 'none'; marketEnv.visible = false; }
    if (!vis.projects) { document.getElementById('projects').style.display = 'none'; projectEnv.visible = false; }
    if (!vis.delivery) { document.getElementById('office').style.display = 'none'; deliveryEnv.visible = false; }

    let step = 0;
    
    // Hero -> Foundation (or skip)
    tl.to(camera.position, { x: -1.5, z: 6, duration: 1, ease: "none" }, step);
    
    if (vis.foundation) {
        step++;
        tl.to(character.position, { z: -14, duration: 1, ease: "none" }, step);
        tl.to(camera.position, { z: -7, duration: 1, ease: "none" }, step);
        tl.to(celestialGroup.position, { z: -54, duration: 1, ease: "none" }, step);
        
        tl.call(() => {
            hardhat.visible = false; packageBox.visible = false; capGroup.visible = false;
            briefcase.visible = true; matShirt.color.setHex(0xffffff);
        }, [], step + 0.5);
        tl.call(() => {
            hardhat.visible = true; briefcase.visible = false; matShirt.color.set(siteData.graphics.environment.characterShirt);
        }, [], step + 0.49);
    }

    if (vis.strategy || vis.projects) {
        step++;
        tl.to(character.position, { z: -28, duration: 1, ease: "none" }, step);
        tl.to(camera.position, { z: -21, x: 1.5, duration: 1, ease: "none" }, step);
        tl.to(celestialGroup.position, { z: -68, duration: 1, ease: "none" }, step);
    }

    if (vis.delivery) {
        step++;
        tl.to(character.position, { z: -42, duration: 1, ease: "none" }, step);
        tl.to(camera.position, { z: -35, duration: 1, ease: "none" }, step);
        tl.to(celestialGroup.position, { z: -82, duration: 1, ease: "none" }, step);

        tl.call(() => {
            briefcase.visible = false; capGroup.visible = true; packageBox.visible = true;
            matShirt.color.setHex(0xf97316); 
        }, [], step + 0.5);
        tl.call(() => {
            capGroup.visible = false; packageBox.visible = false; briefcase.visible = true;
            matShirt.color.setHex(0xffffff);
        }, [], step + 0.49);
    }

    // Final Contact Section
    step++;
    tl.to(camera.position, { z: -39.5, y: 2.2, x: -1.2, duration: 1, ease: "power2.inOut" }, step);
    tl.call(() => {
        capGroup.visible = false; packageBox.visible = false;
        matShirt.color.set(siteData.graphics.environment.characterShirt); 
    }, [], step + 0.8);
    tl.call(() => {
        capGroup.visible = true; packageBox.visible = true;
        matShirt.color.setHex(0xf97316);
    }, [], step + 0.79);
}

// Start sequence
loadContent();
