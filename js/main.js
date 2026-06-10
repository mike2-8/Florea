// 1. Dropdown hiện khi hover chuột vào (không cần click)

document.querySelectorAll('.nav-item.dropdown').forEach(function(dropdown) {
    let timeout;

    dropdown.addEventListener('mouseenter', function() {
        clearTimeout(timeout);
        const menu = this.querySelector('.dropdown-menu');
        menu.classList.add('show');
    });

    dropdown.addEventListener('mouseleave', function() {
        const menu = this.querySelector('.dropdown-menu');
        timeout = setTimeout(function() {
            menu.classList.remove('show');
        }, 100);
    });
});