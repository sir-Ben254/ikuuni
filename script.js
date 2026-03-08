/* ================================================
   NEW IKUUNI - JavaScript
   Interactive Features & Animations
   ================================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ================================================
    // NAVIGATION
    // ================================================
    
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ================================================
    // SCROLL REVEAL ANIMATIONS
    // ================================================
    
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    // Initial check
    revealOnScroll();
    
    // ================================================
    // MENU FILTERING
    // ================================================
    
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            menuTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            menuItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (category === 'all' || category === itemCategory) {
                    item.style.display = 'block';
                    // Add animation
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // ================================================
    // RESERVATION FORM
    // ================================================
    
    const reservationForm = document.getElementById('reservationForm');
    
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const date = document.getElementById('date').value;
        const guests = document.getElementById('guests').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !phone) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Show success message
            alert(`Thank you, ${name}! Your inquiry has been received. We will contact you shortly.`);
            
            // Reset form
            reservationForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
    
    // ================================================
    // GALLERY LIGHTBOX
    // ================================================
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.id = 'lightbox';
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                cursor: pointer;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            const img = document.createElement('img');
            img.src = imgSrc;
            img.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 8px;
                box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
            `;
            
            lightbox.appendChild(img);
            document.body.appendChild(lightbox);
            
            // Fade in
            setTimeout(() => {
                lightbox.style.opacity = '1';
            }, 10);
            
            // Close on click
            lightbox.addEventListener('click', function() {
                lightbox.style.opacity = '0';
                setTimeout(() => {
                    lightbox.remove();
                }, 300);
            });
        });
    });
    
    // ================================================
    // PARALLAX EFFECT FOR HERO
    // ================================================
    
    const heroSection = document.querySelector('.hero');
    const heroVideo = document.querySelector('.hero-video');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        if (heroSection) {
            const heroHeight = heroSection.offsetHeight;
            if (scrollPosition < heroHeight) {
                const parallaxValue = scrollPosition * 0.4;
                if (heroVideo) {
                    heroVideo.style.transform = `translateY(${parallaxValue}px)`;
                }
            }
        }
    });
    
    // ================================================
    // SCROLL TO TOP BUTTON
    // ================================================
    
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.id = 'scrollTopBtn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--color-gold, #c9a227);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        z-index: 9999;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ================================================
    // COUNTER ANIMATION FOR STATS
    // ================================================
    
    const experienceBadge = document.querySelector('.experience-badge .years');
    
    if (experienceBadge) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate the number
                    let count = 0;
                    const target = parseInt(experienceBadge.textContent);
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    
                    const timer = setInterval(() => {
                        count += increment;
                        if (count >= target) {
                            count = target;
                            clearInterval(timer);
                        }
                        experienceBadge.textContent = Math.floor(count) + '+';
                    }, 16);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(experienceBadge);
    }
    
    // ================================================
    // ROOM CARD HOVER EFFECTS
    // ================================================
    
    const roomCards = document.querySelectorAll('.room-card');
    
    roomCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '1';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '0';
        });
    });
    
    // ================================================
    // SMOOTH IMAGE LOADING
    // ================================================
    
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ================================================
    // ACTIVE NAV LINK HIGHLIGHTING
    // ================================================
    
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.querySelectorAll('a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // ================================================
    // LOADER
    // ================================================
    
    // Create a simple page loader
    const loader = document.createElement('div');
    loader.id = 'pageLoader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #1a1a1a;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        transition: opacity 0.5s ease;
    `;
    
    loader.innerHTML = `
        <div style="text-align: center;">
            <h2 style="color: #c9a227; font-family: 'Cormorant Garamond', serif; font-size: 2.5rem; margin-bottom: 20px;">New Ikuuni</h2>
            <div style="width: 50px; height: 3px; background: #c9a227; margin: 0 auto; animation: loaderAnim 1.5s infinite;"></div>
        </div>
        <style>
            @keyframes loaderAnim {
                0%, 100% { width: 50px; opacity: 0.5; }
                50% { width: 100px; opacity: 1; }
            }
        </style>
    `;
    
    document.body.appendChild(loader);
    
    // Hide loader after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    });
    
    // ================================================
    // SERVICE CARD STAGGERED ANIMATION
    // ================================================
    
    const serviceCards = document.querySelectorAll('.service-card');
    
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100);
                serviceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    serviceCards.forEach(card => serviceObserver.observe(card));
    
    // ================================================
    // TESTIMONIALS (If added in future)
    // ================================================
    
    // Auto-scroll testimonials if present
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        let currentSlide = 0;
        const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
        
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            testimonialSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
        }, 5000);
    }
    
});

/* ================================================
   ADDITIONAL UTILITY FUNCTIONS
   ================================================ */

// Format phone number
function formatPhoneNumber(phone) {
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '+254 ' + match[1] + ' ' + match[2] + ' ' + match[3];
    }
    return phone;
}

// Get URL parameters
function getUrlParams() {
    const params = {};
    const searchParams = new URLSearchParams(window.location.search);
    for (const [key, value] of searchParams) {
        params[key] = value;
    }
    return params;
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
