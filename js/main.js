// 1. Dropdown
document.querySelectorAll('.nav-item.dropdown').forEach(function (dropdown) {
    let timeout;
    dropdown.addEventListener('mouseenter', function () {
        clearTimeout(timeout);
        const menu = this.querySelector('.dropdown-menu');
        menu.classList.add('show');
    });
    dropdown.addEventListener('mouseleave', function () {
        const menu = this.querySelector('.dropdown-menu');
        timeout = setTimeout(function () {
            menu.classList.remove('show');
        }, 100);
    });
});

// 2. Hamburger
const toggler = document.querySelector('.navbar-toggler');
const navCollapse = document.querySelector('#navbarMain');

navCollapse.addEventListener('show.bs.collapse', function () {
    toggler.innerHTML = '<span style="font-size: 24px; color: #E6BBAB;">✕</span>';
});
navCollapse.addEventListener('hide.bs.collapse', function () {
    toggler.innerHTML = '<span class="navbar-toggler-icon"></span>';
});

// 3. Swiper
var swiper = new Swiper(".testimonial-swiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
});

// 4. FancyBox
Fancybox.bind("[data-fancybox]");

// 5. Counter
const counters = document.querySelectorAll('.counter');
let counted = false;

const runCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 1500;
        const step = target / (duration / 16);
        let current = 0;

        const update = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(update);
            } else {
                counter.textContent = target;
            }
        };
        update();
    });
};

const statsSection = document.querySelector('#stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !counted) {
            counted = true;
            runCounters();
        }
    }, { threshold: 0.3 });

    observer.observe(statsSection);
}