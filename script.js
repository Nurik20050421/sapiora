/* script.js - small JS for MVP interactivity and demo chart */

/* Demo Chart (sales forecast + historical) */
const ctx = document.getElementById('salesChart');
if (ctx) {
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Actual sales',
        data: [420, 460, 480, 500, 520, 540, 560, 580],
        tension: 0.25,
        borderWidth: 2,
        borderColor: '#007bff',
        pointRadius: 3,
        fill: false
      },
      {
        label: 'Model forecast',
        data: [null, null, null, 505, 525, 555, 585, 610],
        tension: 0.25,
        borderDash: [6,6],
        borderColor: '#1a52a1',
        pointRadius: 3,
        fill: false
      }
    ]
  };

  new Chart(ctx, {
    type: 'line',
    data,
    options: {
      responsive: true,
      plugins: {
        legend: { display: true, position: 'bottom' },
        tooltip: { mode: 'index', intersect: false }
      },
      scales: {
        x: { display: true },
        y: { display: true, beginAtZero: false }
      }
    }
  });
}

/* Contact form: friendly local confirmation + optional CSV upload dialog (demo only) */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    // Prevent default so the page doesn't try to open mail client during demo
    // For actual email sending via mailto, remove the preventDefault line.
    e.preventDefault();

    // Simple validation
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    if (!name || !email) {
      alert('Please fill name and email.');
      return;
    }

    // Show a friendly message (for MVP demonstration)
    alert(`Thanks ${name}! Your message was recorded for MVP demo.\nWe will respond at ${email} within 48 hours.`);

    // Reset form (optional)
    contactForm.reset();
  });

  // Upload demo button: opens file picker (no server: only to preview file selection)
  const demoUploadBtn = document.getElementById('demoUploadBtn');
  if (demoUploadBtn) {
    demoUploadBtn.addEventListener('click', function () {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.csv,text/csv';
      input.onchange = () => {
        if (input.files.length) {
          const file = input.files[0];
          alert(`Selected file: ${file.name}. In a production app we'd upload and parse this to build a demo dashboard.`);
        }
      };
      input.click();
    });
  }
}

/* Small helper: highlight current nav link */
(function highlightNav(){
  const links = document.querySelectorAll('.nav-link');
  const path = location.pathname.split('/').pop();
  links.forEach(a=>{
    if(a.getAttribute('href') === path || (path === '' && a.getAttribute('href') === 'index.html')){
      a.classList.add('active');
      a.style.fontWeight = 700;
    }
  });
})();
