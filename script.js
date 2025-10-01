// Effet d'encre sur canvas
const canvas = document.getElementById('inkCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Classe pour les gouttes d'encre
class InkDrop {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = Math.random() * 0.5 + 0.5;
        this.size = Math.random() * 80 + 40;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.life = 1;
        this.decay = 0.002;
        this.tendrils = [];
        
        // Créer des tentacules d'encre
        for (let i = 0; i < 5; i++) {
            this.tendrils.push({
                angle: Math.random() * Math.PI * 2,
                length: Math.random() * 50 + 20,
                width: Math.random() * 3 + 1
            });
        }
    }
    
    update() {
        this.y += this.vy;
        this.x += this.vx;
        this.life -= this.decay;
        this.size += 0.2;
        
        // Effet de dispersion
        this.vx *= 0.99;
        this.vy *= 0.99;
    }
    
    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity * this.life;
        
        // Dessiner le corps principal
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Dessiner les tentacules
        this.tendrils.forEach(tendril => {
            ctx.beginPath();
            const endX = this.x + Math.cos(tendril.angle) * tendril.length;
            const endY = this.y + Math.sin(tendril.angle) * tendril.length;
            
            ctx.moveTo(this.x, this.y);
            ctx.quadraticCurveTo(
                this.x + Math.cos(tendril.angle) * tendril.length * 0.5,
                this.y + Math.sin(tendril.angle) * tendril.length * 0.5 + 20,
                endX,
                endY
            );
            
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = tendril.width;
            ctx.stroke();
        });
        
        ctx.restore();
    }
    
    isDead() {
        return this.life <= 0;
    }
}

let inkDrops = [];
let lastDropTime = 0;

// Créer des gouttes périodiquement
function createInkDrop() {
    const x = Math.random() * canvas.width;
    const y = -50;
    inkDrops.push(new InkDrop(x, y));
}

// Animation
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const now = Date.now();
    if (now - lastDropTime > 3000) {
        createInkDrop();
        lastDropTime = now;
    }
    
    inkDrops = inkDrops.filter(drop => {
        drop.update();
        drop.draw();
        return !drop.isDead() && drop.y < canvas.height + 100;
    });
    
    requestAnimationFrame(animate);
}

animate();

// Créer quelques gouttes initiales
for (let i = 0; i < 3; i++) {
    setTimeout(() => createInkDrop(), i * 1000);
}

// Navigation mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu mobile lors du clic sur un lien
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navigation active selon la section
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Scroll fluide pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Lightbox pour les galeries
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const overlay = this.querySelector('.gallery-overlay');
        
        lightbox.style.display = 'block';
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        
        if (overlay) {
            const title = overlay.querySelector('h3').textContent;
            const description = overlay.querySelector('p').textContent;
            lightboxCaption.innerHTML = `<strong>${title}</strong><br>${description}`;
        } else {
            lightboxCaption.textContent = img.alt;
        }
        
        document.body.style.overflow = 'hidden';
    });
});

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.style.display === 'block') {
        closeLightbox();
    }
});

// Animation au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.gallery-item, .project-card, .section-title, .section-description').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Gestion des erreurs d'images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        const parent = this.closest('.gallery-item, .project-image');
        if (parent) {
            parent.style.background = 'linear-gradient(135deg, #e9ecef, #dee2e6)';
            parent.innerHTML += '<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #495057; font-size: 2rem; font-family: \'Playfair Display\', serif;">🖼️</div>';
        }
    });
});

console.log('Portfolio chargé avec succès !');
