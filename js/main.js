document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 50
    });

    // Page loader
    const pageLoader = document.getElementById('page-loader');
    if (pageLoader) {
        window.addEventListener('load', () => {
            pageLoader.classList.add('fade-out');
            setTimeout(() => {
                pageLoader.style.display = 'none';
            }, 600);
        });
    }

    // Mobile menu toggle
    const toggleMenu = document.getElementById('toggle-menu');
    const menu = document.getElementById('menu');
    if (toggleMenu && menu) {
        toggleMenu.addEventListener('click', () => {
            menu.classList.toggle('active');
            toggleMenu.classList.toggle('active');
            
            // Change icon based on menu state
            const icon = toggleMenu.querySelector('i');
            if (icon) {
                if (menu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && !toggleMenu.contains(e.target) && menu.classList.contains('active')) {
                menu.classList.remove('active');
                toggleMenu.classList.remove('active');
                const icon = toggleMenu.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // Theme toggle
    const themeSwitch = document.getElementById('theme-switch');
    if (themeSwitch) {
        // Check for saved theme preference or respect OS preference
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const storedTheme = localStorage.getItem('theme');
        
        if (storedTheme === 'dark' || (!storedTheme && prefersDarkScheme.matches)) {
            document.body.classList.add('dark-theme');
            themeSwitch.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        themeSwitch.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            
            // Update button icon
            if (document.body.classList.contains('dark-theme')) {
                themeSwitch.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            } else {
                themeSwitch.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    if (skillBars.length && 'IntersectionObserver' in window) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('data-width') + '%';
                    entry.target.style.width = width;
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => {
            bar.style.width = "0";
            skillObserver.observe(bar);
        });
    }

    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // FAQ accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                
                // Toggle active class on the current item
                faqItem.classList.toggle('active');
                
                // Close other FAQ items
                const otherItems = document.querySelectorAll('.faq-item.active');
                otherItems.forEach(item => {
                    if (item !== faqItem) {
                        item.classList.remove('active');
                    }
                });
            });
        });
    }

    // Project modals
    const viewProjectButtons = document.querySelectorAll('.view-project');
    const projectModal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    const modalClose = document.getElementById('modalClose');
    
    if (viewProjectButtons.length && projectModal && modalContent && modalClose) {
        // Project data - replace with your actual project details
        const projectData = {
            project1: {
                title: "Student Management System",
                description: "A web-based application for managing student information, courses, and grades.",
                technologies: ["C#", "ASP.NET", "SQL Server", "Bootstrap", "JavaScript"],
                features: [
                    "Student enrollment and profile management",
                    "Course registration and scheduling",
                    "Grade tracking and report generation",
                    "Admin dashboard for data visualization"
                ],
                image: "../images/projects/project1.jpg",
                github: "https://github.com/HoangNhism/student-management"
            },
            project2: {
                title: "E-commerce Website",
                description: "A responsive online store with product catalog, cart functionality, and payment processing.",
                technologies: ["JavaScript", "Node.js", "MongoDB", "Express", "HTML/CSS"],
                features: [
                    "Product catalog with search and filtering",
                    "User account management and order history",
                    "Shopping cart and checkout process",
                    "Responsive design for mobile and desktop"
                ],
                image: "../images/projects/project2.jpg",
                github: "https://github.com/HoangNhism/ecommerce-site"
            },
            project3: {
                title: "Task Management App",
                description: "A Java-based application for organizing tasks, setting deadlines, and tracking progress.",
                technologies: ["Java", "MySQL", "Spring Boot", "Thymeleaf", "Bootstrap"],
                features: [
                    "Task creation and assignment",
                    "Deadline tracking with notifications",
                    "Progress monitoring and reporting",
                    "User authentication and role-based access"
                ],
                image: "../images/projects/project3.jpg",
                github: "https://github.com/HoangNhism/task-manager"
            }
        };
        
        viewProjectButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = button.getAttribute('data-project');
                const project = projectData[projectId];
                
                if (project) {
                    let technologiesList = '';
                    project.technologies.forEach(tech => {
                        technologiesList += `<span class="tag">${tech}</span>`;
                    });
                    
                    let featuresList = '';
                    project.features.forEach(feature => {
                        featuresList += `<li>${feature}</li>`;
                    });
                    
                    modalContent.innerHTML = `
                        <div class="project-modal-header">
                            <h2>${project.title}</h2>
                        </div>
                        <div class="project-modal-body">
                            <div class="project-modal-image">
                                <img src="${project.image}" alt="${project.title}">
                            </div>
                            <div class="project-modal-details">
                                <div class="project-modal-description">
                                    <h3>Project Overview</h3>
                                    <p>${project.description}</p>
                                </div>
                                <div class="project-modal-technologies">
                                    <h3>Technologies Used</h3>
                                    <div class="project-tags">
                                        ${technologiesList}
                                    </div>
                                </div>
                                <div class="project-modal-features">
                                    <h3>Key Features</h3>
                                    <ul>
                                        ${featuresList}
                                    </ul>
                                </div>
                                <div class="project-modal-links">
                                    <a href="${project.github}" target="_blank" class="btn btn-primary">View on GitHub</a>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    projectModal.style.display = 'block';
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                }
            });
        });
        
        // Close modal
        modalClose.addEventListener('click', () => {
            projectModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                projectModal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            }
        });
        
        // Close modal with ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && projectModal.style.display === 'block') {
                projectModal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            }
        });
    }

    // Form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            let isValid = true;
            
            // Reset previous error messages
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(error => error.remove());
            
            // Name validation
            if (!nameInput.value.trim()) {
                displayError(nameInput, 'Name is required');
                isValid = false;
            }
            
            // Email validation
            if (!emailInput.value.trim()) {
                displayError(emailInput, 'Email is required');
                isValid = false;
            } else if (!validateEmail(emailInput.value.trim())) {
                displayError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Message validation
            if (!messageInput.value.trim()) {
                displayError(messageInput, 'Message is required');
                isValid = false;
            }
            
            // If form is valid, show success animation
            if (isValid) {
                // In a real application, you would send the form data to a server here
                
                // Show success animation
                const formContent = document.querySelector('.form-content');
                const formHeight = formContent.offsetHeight;
                formContent.style.height = formHeight + 'px';
                
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h3>Thank you for your message!</h3>
                    <p>I'll get back to you as soon as possible.</p>
                    <button class="btn btn-secondary reset-form">Send Another Message</button>
                `;
                
                formContent.innerHTML = '';
                formContent.appendChild(successMessage);
                
                // Add event listener to the reset button
                const resetButton = successMessage.querySelector('.reset-form');
                if (resetButton) {
                    resetButton.addEventListener('click', () => {
                        location.reload();
                    });
                }
            }
        });
        
        function displayError(input, message) {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = message;
            
            const parent = input.parentElement;
            parent.appendChild(errorMessage);
            input.classList.add('error');
            
            input.addEventListener('input', function() {
                errorMessage.remove();
                input.classList.remove('error');
            });
        }
    }
    
    // Email validation helper function
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Current year for footer copyright
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Typed.js integration for hero section
    const typedElement = document.getElementById('typed-text');
    if (typedElement && typeof Typed !== 'undefined') {
        new Typed(typedElement, {
            strings: [
                'Web Developer', 
                'C# Programmer', 
                'Java Developer',
                'Database Manager',
                'Student'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            smartBackspace: true
        });
    }

    // Add active class to current page in navigation
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPage.endsWith(linkPath)) {
            link.classList.add('active');
        }
    });
});