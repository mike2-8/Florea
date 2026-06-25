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

// 6. Navbar scroll
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const logo = document.querySelector('.navbar-brand img');
    if (window.scrollY > 50) {
        header.classList.add('navbar-scrolled');
        logo.src = 'images/logo.png';
    } else {
        header.classList.remove('navbar-scrolled');
        logo.src = 'images/logo-white.png';
    }
});


// 7. ---- LEAFLET MAP ----
const mapEl = document.getElementById('map');
if (mapEl) {
    const map = L.map('map', {
        scrollWheelZoom: false,
        maxZoom: 19
    }).setView([10.0480652, 105.7600721], 16);

    mapEl.addEventListener('wheel', function (e) {
        if (e.ctrlKey) {
            e.preventDefault();
            map.scrollWheelZoom.enable();
        } else {
            map.scrollWheelZoom.disable();
            mapEl.classList.add('show-scroll-hint');
            clearTimeout(mapEl._hintTimeout);
            mapEl._hintTimeout = setTimeout(() => {
                mapEl.classList.remove('show-scroll-hint');
            }, 1500);
        }
    }, { passive: false });

    const streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19
    });

    const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; Esri',
        maxZoom: 19
    });

    streetLayer.addTo(map);

    L.control.layers({
        'Street': streetLayer,
        'Satellite': satelliteLayer
    }).addTo(map);

    const marker = L.marker([10.0480652, 105.7600721]).addTo(map);

    const infoControl = L.control({ position: 'topleft' });

    infoControl.onAdd = function () {
        const div = L.DomUtil.create('div', 'map-info-card');
        div.innerHTML = `
            <div class="map-popup-header">
                <div class="map-popup-info">
                    <h4>202 Đường Nguyễn Đệ</h4>
                    <p>202 Đường Nguyễn Đệ,<br>Bình Thủy, Cần Thơ</p>
                </div>
                <div class="map-popup-actions">
                    <a href="https://www.google.com/maps/search/?api=1&query=10.0480652,105.7600721" target="_blank" title="Xem trên Google Maps">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=10.0480652,105.7600721" target="_blank" title="Chỉ đường">
                        <i class="fa-solid fa-diamond-turn-right"></i>
                    </a>
                </div>
            </div>
        `;
        return div;
    };

    infoControl.addTo(map);
}

// 8. Swiper thumpnail

        var swiperThumb = new Swiper(".mySwiper", {
            loop: true,
            spaceBetween: 10,
            slidesPerView: 4,
            freeMode: true,
            watchSlidesProgress: true,
        });

        var swiperMain = new Swiper(".mySwiper2", {
            loop: true,
            spaceBetween: 10,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            thumbs: {
                swiper: swiperThumb,
            },
        });

        Fancybox.bind('[data-fancybox="product-gallery"]', {});

// 9. Swiper slide 
        var swiperRelated = new Swiper(".related-swiper", {
            slidesPerView: 3,
            spaceBetween: 30,
            pagination: {
                el: ".related-swiper .swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                0: { slidesPerView: 1 },
                576: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
            }
        });