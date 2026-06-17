// 1. Dropdown hiện khi hover chuột vào (không cần click)

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

// 2. Hamburger toggle → đổi icon thành X khi mở
const toggler = document.querySelector('.navbar-toggler');
const navCollapse = document.querySelector('#navbarMain');

navCollapse.addEventListener('show.bs.collapse', function () {
    toggler.innerHTML = '<span style="font-size: 24px; color: #E6BBAB;">✕</span>';
});

navCollapse.addEventListener('hide.bs.collapse', function () {
    toggler.innerHTML = '<span class="navbar-toggler-icon"></span>';
});

// 3. testimonial
var swiper = new Swiper(".testimonial-swiper", {
    spaceBetween: 30,
    centeredSlides: true,
    //autoplay: {
    //    delay: 2500,
    //    disableOnInteraction: false,
    //},
});