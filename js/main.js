document.addEventListener("DOMContentLoaded", function() {
    // Mobile menu toggle
    const toggleMenuButton = document.getElementById("toggle-menu");
    const menu = document.getElementById("menu");
    
    if (toggleMenuButton) {
        toggleMenuButton.addEventListener("click", function() {
            menu.classList.toggle("active");
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== "#") {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (menu && menu.classList.contains('active')) {
                    menu.classList.remove('active');
                }
            }
        });
    });
    
    // Testimonial carousel
    const testimonialCarousel = document.getElementById("testimonial-carousel");
    if (testimonialCarousel) {
        const testimonials = document.querySelectorAll('.testimonial');
        const indicators = document.querySelectorAll('.indicator');
        const prevBtn = document.getElementById('prev');
        const nextBtn = document.getElementById('next');
        let currentIndex = 0;
        
        function updateCarousel() {
            testimonials.forEach((testimonial, index) => {
                testimonial.classList.remove('active');
                if (indicators[index]) {
                    indicators[index].classList.remove('active');
                }
            });
            
            testimonials[currentIndex].classList.add('active');
            if (indicators[currentIndex]) {
                indicators[currentIndex].classList.add('active');
            }
        }
        
        function nextTestimonial() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateCarousel();
        }
        
        function prevTestimonial() {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            updateCarousel();
        }
        
        // Auto-advance testimonials
        let testimonialInterval = setInterval(nextTestimonial, 5000);
        
        // Reset interval on manual navigation
        function resetInterval() {
            clearInterval(testimonialInterval);
            testimonialInterval = setInterval(nextTestimonial, 5000);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextTestimonial();
                resetInterval();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevTestimonial();
                resetInterval();
            });
        }
        
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
                resetInterval();
            });
        });
    }
    
    // Contact form handling
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let isValid = true;
            
            if (name && name.value.trim() === '') {
                highlightField(name, true);
                isValid = false;
            } else if (name) {
                highlightField(name, false);
            }
            
            if (email && (email.value.trim() === '' || !isValidEmail(email.value))) {
                highlightField(email, true);
                isValid = false;
            } else if (email) {
                highlightField(email, false);
            }
            
            if (message && message.value.trim() === '') {
                highlightField(message, true);
                isValid = false;
            } else if (message) {
                highlightField(message, false);
            }
            
            if (isValid) {
                // Success message
                const formContainer = contactForm.parentElement;
                contactForm.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i><h3>Thank You!</h3><p>Your message has been sent successfully.</p></div>';
                
                // Reset form appearance after showing success message
                setTimeout(() => {
                    contactForm.innerHTML = contactForm.originalHTML || '';
                }, 5000);
                
                // Store original HTML for reset if needed
                if (!contactForm.originalHTML) {
                    contactForm.originalHTML = contactForm.innerHTML;
                }
            }
        });
        
        // If form fields exist, add blur event listeners for real-time validation
        const formFields = contactForm.querySelectorAll('input, textarea');
        formFields.forEach(field => {
            field.addEventListener('blur', function() {
                if (field.id === 'email' && field.value.trim() !== '') {
                    highlightField(field, !isValidEmail(field.value));
                } else {
                    highlightField(field, field.value.trim() === '');
                }
            });
            
            // Remove error styling on focus
            field.addEventListener('focus', function() {
                field.classList.remove('error');
                const errorMsg = field.parentElement.querySelector('.error-message');
                if (errorMsg) errorMsg.remove();
            });
        });
    }
    
    // Helper functions
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function highlightField(field, isError) {
        if (isError) {
            field.classList.add('error');
            
            // Add error message if it doesn't exist
            let errorMsg = field.parentElement.querySelector('.error-message');
            if (!errorMsg) {
                errorMsg = document.createElement('p');
                errorMsg.className = 'error-message';
                errorMsg.textContent = field.id === 'email' && field.value.trim() !== '' ? 
                    'Please enter a valid email address.' : 
                    'This field is required.';
                field.parentElement.appendChild(errorMsg);
            }
        } else {
            field.classList.remove('error');
            const errorMsg = field.parentElement.querySelector('.error-message');
            if (errorMsg) errorMsg.remove();
        }
    }
    
    // Animate elements when they come into view
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .section-title');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animateElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        animateElements.forEach(element => {
            element.classList.add('animated');
        });
    }
});