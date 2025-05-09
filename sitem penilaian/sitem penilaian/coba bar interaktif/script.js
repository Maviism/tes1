document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-items li');
    const pages = document.querySelectorAll('.page');
    const menuToggle = document.querySelector('.menu-toggle');
    const menuList = document.querySelector('.menu-items');

    // Fungsi untuk mengubah halaman aktif
    function setActivePage(pageId) {
        // Hapus class active dari semua menu dan halaman
        menuItems.forEach(item => item.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active-page'));
        
        // Tambahkan class active ke menu dan halaman yang dipilih
        const selectedMenuItem = document.querySelector(`.menu-items li a[href="#${pageId}"]`).parentElement;
        selectedMenuItem.classList.add('active');
        
        const selectedPage = document.getElementById(pageId);
        selectedPage.classList.add('active-page');
    }

    // Event listener untuk setiap menu item
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.querySelector('a').getAttribute('href').substring(1);
            setActivePage(pageId);
            
            // Tutup menu mobile setelah memilih
            if (menuList.classList.contains('active')) {
                menuList.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // Event listener untuk menu toggle (mobile)
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        menuList.classList.toggle('active');
    });

    // Set halaman awal
    setActivePage('home');
});