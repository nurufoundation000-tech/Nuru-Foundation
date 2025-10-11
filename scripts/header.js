
function initHeader() {
    
    const header = document.querySelector('.main-header');
    if (!header) return; 

    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');

    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Toggle mobile menu
    function toggleMobileMenu() {
        if (!mobileMenu) return; 
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        
     
        if (navToggle) {
            const spans = navToggle.querySelectorAll('span');
            if (spans.length >= 3) {
                if (mobileMenu.classList.contains('active')) {
                    spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
                } else {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        }
    }

    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }
    
    if (closeMenu) {
        closeMenu.addEventListener('click', toggleMobileMenu);
    }

   
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });

 
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

   
    function updateActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        
        allNavLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            link.classList.remove('active');
            
            if (linkHref === currentPage) {
                link.classList.add('active');
            }
            if (currentPage === '' && linkHref === 'index.html') {
                link.classList.add('active');
            }
        });
    }

    updateActiveNavLink();


    document.addEventListener('click', (event) => {
        if (mobileMenu && navToggle && mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(event.target) && 
            !navToggle.contains(event.target)) {
            toggleMobileMenu();
        }
    });


    if (mobileMenu) {
        mobileMenu.addEventListener('touchmove', (event) => {
            if (mobileMenu.classList.contains('active')) {
                event.preventDefault();
            }
        }, { passive: false });
    }
}
