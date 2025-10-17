// Pixel Perfect Digital - Interactive JavaScript
// Modern, clean, and elegant code following best practices

class PixelPerfectApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupSmoothScrolling();
        this.setupNavbarScroll();
        this.setupIncomeStatementToggle();
        this.setupFormHandling();
        this.setupAnimations();
        this.setupMobileMenu();
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Navbar scroll effect
        window.addEventListener('scroll', this.handleNavbarScroll.bind(this));
        
        // Mobile menu toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', this.toggleMobileMenu.bind(this));
        }

        // Close mobile menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', this.closeMobileMenu.bind(this));
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', this.handleOutsideClick.bind(this));

        // Income statement toggle (in-section button)
        const toggleButton = document.getElementById('toggle-statement');
        if (toggleButton) {
            toggleButton.addEventListener('click', () => this.toggleIncomeStatement());
        }

        // Floating action button (bottom-left)
        const fabButton = document.getElementById('fab-statement');
        if (fabButton) {
            fabButton.addEventListener('click', () => this.toggleIncomeStatement());
        }

        // Form submission
        const contactForm = document.querySelector('.contact-form form');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleFormSubmit.bind(this));
        }

        // Pricing card interactions
        this.setupPricingCardInteractions();

        // Service card hover effects
        this.setupServiceCardEffects();
    }

    // Smooth Scrolling for Navigation Links
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Navbar Scroll Effect
    setupNavbarScroll() {
        this.handleNavbarScroll();
    }

    handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        const scrollY = window.scrollY;
        
        if (navbar) {
            if (scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }
    }

    // Mobile Menu Functionality
    setupMobileMenu() {
        // Already handled in setupEventListeners
    }

    toggleMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    }

    closeMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    handleOutsideClick(e) {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu && navMenu.classList.contains('active')) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                this.closeMobileMenu();
            }
        }
    }

    // Income Statement Toggle
    setupIncomeStatementToggle() {
        // Already handled in setupEventListeners
    }

    toggleIncomeStatement() {
        const toggleButton = document.getElementById('toggle-statement');
        const fabButton = document.getElementById('fab-statement');
        const statementDetails = document.getElementById('statement-details');
        if (!statementDetails) return;

        const isVisible = statementDetails.style.display !== 'none';

        if (isVisible) {
            // Hide the statement
            statementDetails.style.display = 'none';
            if (toggleButton) {
                toggleButton.innerHTML = '<i class="fas fa-chart-bar"></i> View Detailed Income Statement';
                toggleButton.classList.remove('active');
            }
            if (fabButton) {
                fabButton.classList.remove('active');
                fabButton.setAttribute('aria-label', 'View Detailed Income Statement');
                fabButton.innerHTML = '<i class="fas fa-chart-bar" aria-hidden="true"></i>';
            }
        } else {
            // Show the statement
            statementDetails.style.display = 'block';
            if (toggleButton) {
                toggleButton.innerHTML = '<i class="fas fa-chart-bar"></i> Hide Income Statement';
                toggleButton.classList.add('active');
            }
            if (fabButton) {
                fabButton.classList.add('active');
                fabButton.setAttribute('aria-label', 'Hide Income Statement');
                fabButton.innerHTML = '<i class="fas fa-times" aria-hidden="true"></i>';
            }

            // Smooth scroll to the statement
            setTimeout(() => {
                statementDetails.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }

    // Form Handling
    setupFormHandling() {
        // Already handled in setupEventListeners
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        
        // Show loading state
        if (submitButton) {
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            submitButton.classList.add('loading');
        }
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            this.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            form.reset();
            
            // Reset button state
            if (submitButton) {
                submitButton.textContent = 'Send Message';
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
            }
        }, 2000);
    }
    // Service Card Effects
    setupServiceCardEffects() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    // Animation Setup
    setupAnimations() {
        this.setupScrollAnimations();
        this.setupCounterAnimations();
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll(
            '.market-card, .service-card, .pricing-card, .strategy-card, .summary-card'
        );
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('.metric-value, .summary-value');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    animateCounter(element) {
        const text = element.textContent;
        const number = parseFloat(text.replace(/[^\d.]/g, ''));
        
        if (isNaN(number)) return;
        
        const duration = 2000;
        const start = performance.now();
        const startValue = 0;
        
        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentValue = startValue + (number - startValue) * this.easeOutCubic(progress);
            
            // Format the number with currency symbol
            const formattedValue = this.formatCurrency(currentValue, text);
            element.textContent = formattedValue;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    formatCurrency(value, originalText) {
        const currency = originalText.includes('₱') ? '₱' : '';
        const formatted = Math.round(value).toLocaleString();
        return currency + formatted;
    }

    // Notification System
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button functionality
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            this.hideNotification(notification);
        });
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.hideNotification(notification);
        }, 5000);
    }

    hideNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    getNotificationColor(type) {
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#6366f1'
        };
        return colors[type] || '#6366f1';
    }

    // Utility Methods
    debounce(func, wait) {
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

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PixelPerfectApp();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, pause any animations or timers
        console.log('Page hidden');
    } else {
        // Page is visible, resume animations
        console.log('Page visible');
    }
});

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Handle responsive adjustments
    const app = window.pixelPerfectApp;
    if (app) {
        // Any resize-specific logic can go here
    }
}, 250));

// Utility function for debouncing
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

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PixelPerfectApp;
}
