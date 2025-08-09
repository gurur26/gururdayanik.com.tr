// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Portfolio filtering
    initPortfolioFilter();
    
    // Navbar scroll effect
    initNavbarScrollEffect();
    
    // Skill bars animation
    initSkillBarsAnimation();
    
    // Contact form handling
    initContactForm();
    
    // Loading animations
    initLoadingAnimations();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    navbarToggler.click();
                }
            }
        });
    });
}

// Portfolio filtering functionality
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active', 'btn-primary'));
            filterButtons.forEach(btn => btn.classList.add('btn-outline-primary'));
            this.classList.remove('btn-outline-primary');
            this.classList.add('active', 'btn-primary');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                        item.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

// Navbar scroll effect
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Skill bars animation
function initSkillBarsAnimation() {
    const skillBars = document.querySelectorAll('.progress-bar');
    const aboutSection = document.querySelector('#about');
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        });
    };
    
    // Intersection Observer for skill bars animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (aboutSection) {
        observer.observe(aboutSection);
    }
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Lütfen tüm alanları doldurun.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Lütfen geçerli bir e-posta adresi girin.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Gönderiliyor...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                showNotification('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.', 'success');
                contactForm.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} position-fixed`;
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>
            <span>${message}</span>
            <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Loading animations
function initLoadingAnimations() {
    // Add loading class to elements for fade-in effect
    const animatedElements = document.querySelectorAll('.card, .achievement-item, .process-step');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loading');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Parallax effect for hero section
function initParallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Initialize parallax effect
initParallaxEffect();

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification {
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
`;
document.head.appendChild(style);

// Preloader (optional)
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = `
        <div class="d-flex justify-content-center align-items-center min-vh-100 bg-white">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Yükleniyor...</span>
            </div>
        </div>
    `;
    
    document.body.prepend(preloader);
    
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    });
}

// Initialize preloader
// initPreloader();

// Back to top button
function initBackToTop() {
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopButton.className = 'btn btn-primary position-fixed';
    backToTopButton.style.cssText = `
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: none;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
initBackToTop();

// Portfolio item click handlers
function initPortfolioItemHandlers() {
    const portfolioLinks = document.querySelectorAll('a[data-project]');
    
    portfolioLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project');
            
            // Proje linklerini buraya ekleyebilirsiniz
            const projectLinks = {
                'kurumsal-kimlik': '#', // Daha sonra gerçek link eklenecek
                'muzik-festivali': '#', // Daha sonra gerçek link eklenecek
                'web-tasarim': '#', // Daha sonra gerçek link eklenecek
                'kurumsal-video': '#', // Daha sonra gerçek link eklenecek
                'sosyal-medya': '#', // Daha sonra gerçek link eklenecek
                'motion-graphics': '#' // Daha sonra gerçek link eklenecek
            };
            
            if (projectLinks[projectId] && projectLinks[projectId] !== '#') {
                window.open(projectLinks[projectId], '_blank');
            } else {
                showNotification(`${projectId} projesinin linki yakında eklenecek.`, 'info');
            }
        });
    });
}

// Initialize portfolio item handlers
initPortfolioItemHandlers();

// Typing effect for hero title (optional)
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 1000);
}

// Uncomment to enable typing effect
// initTypingEffect();


// Rotating Circle Mouse Wheel Control
function initRotatingCircle() {
    const rotatingIcons = document.getElementById('rotatingIcons');
    let currentRotation = 0;
    let isRotating = false;
    
    if (!rotatingIcons) return;
    
    // Mouse wheel event for rotation control
    rotatingIcons.addEventListener('wheel', function(e) {
        e.preventDefault();
        
        // Calculate rotation based on wheel delta
        const delta = e.deltaY > 0 ? 10 : -10;
        currentRotation += delta;
        
        // Apply rotation
        const iconOrbit = rotatingIcons.querySelector('.icon-orbit');
        if (iconOrbit) {
            iconOrbit.style.transform = `rotate(${currentRotation}deg)`;
            iconOrbit.style.animationPlayState = 'paused';
            
            // Resume animation after a delay
            clearTimeout(isRotating);
            isRotating = setTimeout(() => {
                iconOrbit.style.animationPlayState = 'running';
            }, 1000);
        }
    });
    
    // Touch events for mobile
    let startY = 0;
    let startRotation = 0;
    
    rotatingIcons.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
        startRotation = currentRotation;
        
        const iconOrbit = rotatingIcons.querySelector('.icon-orbit');
        if (iconOrbit) {
            iconOrbit.style.animationPlayState = 'paused';
        }
    });
    
    rotatingIcons.addEventListener('touchmove', function(e) {
        e.preventDefault();
        const currentY = e.touches[0].clientY;
        const deltaY = startY - currentY;
        currentRotation = startRotation + (deltaY * 0.5);
        
        const iconOrbit = rotatingIcons.querySelector('.icon-orbit');
        if (iconOrbit) {
            iconOrbit.style.transform = `rotate(${currentRotation}deg)`;
        }
    });
    
    rotatingIcons.addEventListener('touchend', function() {
        const iconOrbit = rotatingIcons.querySelector('.icon-orbit');
        if (iconOrbit) {
            setTimeout(() => {
                iconOrbit.style.animationPlayState = 'running';
            }, 1000);
        }
    });
    
    // Software icon click events
    const softwareIcons = rotatingIcons.querySelectorAll('.software-icon');
    softwareIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const iconType = this.getAttribute('data-icon');
            showSoftwareInfo(iconType);
        });
    });
}

// Show software information
function showSoftwareInfo(iconType) {
    const softwareInfo = {
        'photoshop': 'Adobe Photoshop - Profesyonel fotoğraf düzenleme ve grafik tasarım',
        'illustrator': 'Adobe Illustrator - Vektör grafik tasarım ve logo oluşturma',
        'premiere': 'Adobe Premiere Pro - Profesyonel video düzenleme ve montaj',
        'aftereffects': 'Adobe After Effects - Motion graphics ve görsel efektler'
    };
    
    const message = softwareInfo[iconType] || 'Yazılım bilgisi bulunamadı';
    showNotification(message, 'info');
}

// Initialize rotating circle on page load
document.addEventListener('DOMContentLoaded', function() {
    initRotatingCircle();
});

// Add to existing initialization
initRotatingCircle();

