/* =============================================
   SI UNAIR PORTAL - MAIN JAVASCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── NAVBAR ─── */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const bars = navToggle.querySelectorAll('span');
      const isOpen = navLinks.classList.contains('open');
      if (isOpen) {
        bars[0].style.transform = 'rotate(45deg) translate(5px,5px)';
        bars[1].style.opacity   = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
      } else {
        bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
      }
    });

    // Close menu on outside click
    document.addEventListener('click', e => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.querySelectorAll('span').forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
      }
    });
  }

  // Mark active link
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });


  /* ─── TABS (Informasi Akademik) ─── */
  const tabBtns   = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add('active');
    });
  });


  /* ─── MK TOGGLE (Mata Kuliah) ─── */
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const desc  = btn.previousElementSibling;
      const arrow = btn.querySelector('.arrow');
      const isOpen = desc.classList.contains('open');

      desc.classList.toggle('open', !isOpen);
      btn.classList.toggle('open', !isOpen);
      btn.querySelector('.btn-label').textContent = isOpen ? 'Lihat Detail' : 'Sembunyikan';
    });
  });

  // Expand All / Collapse All
  const expandAll   = document.getElementById('expandAll');
  const collapseAll = document.getElementById('collapseAll');

  if (expandAll) {
    expandAll.addEventListener('click', () => {
      document.querySelectorAll('.mk-desc-toggle').forEach(d => d.classList.add('open'));
      document.querySelectorAll('.toggle-btn').forEach(b => {
        b.classList.add('open');
        b.querySelector('.btn-label').textContent = 'Sembunyikan';
      });
    });
  }
  if (collapseAll) {
    collapseAll.addEventListener('click', () => {
      document.querySelectorAll('.mk-desc-toggle').forEach(d => d.classList.remove('open'));
      document.querySelectorAll('.toggle-btn').forEach(b => {
        b.classList.remove('open');
        b.querySelector('.btn-label').textContent = 'Lihat Detail';
      });
    });
  }


  /* ─── FORM VALIDATION (Form Pengaduan) ─── */
  const form        = document.getElementById('pengaduanForm');
  const successBox  = document.getElementById('successBox');

  if (form) {
    const inputs = {
      nama:  { el: document.getElementById('nama'),  err: document.getElementById('namaErr') },
      email: { el: document.getElementById('email'), err: document.getElementById('emailErr') },
      pesan: { el: document.getElementById('pesan'), err: document.getElementById('pesanErr') },
    };

    function showError(key, msg) {
      inputs[key].el.classList.add('error');
      inputs[key].err.textContent = msg;
      inputs[key].err.classList.add('show');
    }
    function clearError(key) {
      inputs[key].el.classList.remove('error');
      inputs[key].err.classList.remove('show');
    }

    // Real-time clearing
    Object.keys(inputs).forEach(key => {
      inputs[key].el.addEventListener('input', () => clearError(key));
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      const nama  = inputs.nama.el.value.trim();
      const email = inputs.email.el.value.trim();
      const pesan = inputs.pesan.el.value.trim();

      // Nama
      if (!nama) {
        showError('nama', 'Nama lengkap tidak boleh kosong.');
        valid = false;
      } else { clearError('nama'); }

      // Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        showError('email', 'Email tidak boleh kosong.');
        valid = false;
      } else if (!emailRegex.test(email)) {
        showError('email', 'Format email tidak valid. Contoh: nama@domain.com');
        valid = false;
      } else { clearError('email'); }

      // Pesan
      if (!pesan) {
        showError('pesan', 'Pesan tidak boleh kosong.');
        valid = false;
      } else { clearError('pesan'); }

      if (valid) {
        form.style.display = 'none';
        successBox.classList.add('show');
        successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }


  /* ─── SCROLL REVEAL ─── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('revealed'));
  }

});