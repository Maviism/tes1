// Fungsi untuk toggle dropdown
document.querySelectorAll('.dropdown').forEach(drop => {
    const link = drop.querySelector('a');
    const menu = drop.querySelector('.dropdown-menu');
    link.addEventListener('click', e => {
      e.preventDefault();
      // tutup semua dropdown lain
      document.querySelectorAll('.dropdown-menu').forEach(m => {
        if (m !== menu) m.style.display = 'none';
      });
      // toggle ini
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });
  });
  
  // Klik di luar dropdown -> tutup
  document.addEventListener('click', e => {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown-menu')
        .forEach(m => m.style.display = 'none');
    }
  });
  
  // Redirect ke halaman bahasa sesuai data-page
  document.querySelectorAll('.dropdown-menu li').forEach(item => {
    item.addEventListener('click', () => {
      const page = item.getAttribute('data-page');
      window.location.href = page;
    });
  });
  