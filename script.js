// Mobile navigation toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// FAQ accordion
document.querySelectorAll('.faq button').forEach(btn => {
  const answer = btn.nextElementSibling;
  btn.setAttribute('aria-expanded', 'false');

  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    // close all others
    document.querySelectorAll('.faq button').forEach(other => {
      other.setAttribute('aria-expanded', 'false');
      other.nextElementSibling.style.maxHeight = null;
    });

    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// Contact form — sends via mailto to karlo@skrimsystems.com
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(contactForm);
    const name = (data.get('name') || '').toString().trim();
    const clinic = (data.get('clinic') || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const phone = (data.get('phone') || '').toString().trim();
    const message = (data.get('message') || '').toString().trim();

    const subject = encodeURIComponent(`Upit za DentalFlow — ${clinic || name}`);
    const body = encodeURIComponent(
      `Ime i prezime: ${name}\n` +
      `Ordinacija: ${clinic}\n` +
      `Email: ${email}\n` +
      `Telefon: ${phone}\n\n` +
      `Poruka:\n${message}`
    );

    window.location.href = `mailto:karlo@skrimsystems.com?subject=${subject}&body=${body}`;

    if (formStatus) {
      formStatus.textContent = 'Otvara se vaš mail klijent s pripremljenom porukom.';
    }
  });
}
