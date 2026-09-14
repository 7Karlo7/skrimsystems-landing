// ── Mobilna navigacija ─────────────────────────────────────────────────────
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ── FAQ ────────────────────────────────────────────────────────────────────
document.querySelectorAll('.faq button').forEach(btn => {
  const answer = btn.nextElementSibling;
  btn.setAttribute('aria-expanded', 'false');

  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

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

// ── Živi demo chat ─────────────────────────────────────────────────────────
const CHAT_API = 'https://app.skrimsystems.com/widget-chat';

const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');

// Povijest razgovora živi u pregledniku i šalje se uz svaku poruku,
// jer je endpoint na serveru bez session-a.
let chatHistory = [];
let chatBusy = false;
let chatDone = false;

function addBubble(kind, text) {
  const el = document.createElement('p');
  el.className = 'bubble ' + kind;
  el.textContent = text;
  chatBody.appendChild(el);
  chatBody.scrollTop = chatBody.scrollHeight;
  return el;
}

function addTyping() {
  const el = document.createElement('p');
  el.className = 'bubble typing';
  el.id = 'chatTyping';
  el.innerHTML = '<i></i><i></i><i></i>';
  chatBody.appendChild(el);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function removeTyping() {
  const el = document.getElementById('chatTyping');
  if (el) el.remove();
}

function setBusy(state) {
  chatBusy = state;
  if (chatSend) chatSend.disabled = state;
  if (chatInput) chatInput.disabled = state;
}

async function sendChatMessage() {
  if (chatBusy || chatDone || !chatInput) return;

  const text = chatInput.value.trim();
  if (!text) return;

  addBubble('in', text);
  chatHistory.push({ role: 'user', text: text });
  chatInput.value = '';

  setBusy(true);
  addTyping();

  try {
    const res = await fetch(CHAT_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: chatHistory.slice(-10) })
    });

    const data = await res.json();
    removeTyping();

    const reply = (data && data.reply) || 'Oprostite, nešto je pošlo po zlu. Pokušajte ponovno.';

    if (data && data.lead_done) {
      addBubble('done', reply);
      addBubble('out', 'U pravoj ordinaciji ovaj bi upit sada bio u CRM dashboardu i stigao bi im na email.');
      chatDone = true;
      setBusy(false);
      chatInput.disabled = true;
      chatSend.disabled = true;
      chatInput.placeholder = 'Demo razgovor je završen.';
      return;
    }

    addBubble('out', reply);
    chatHistory.push({ role: 'ai', text: reply });

  } catch (err) {
    removeTyping();
    addBubble('out', 'Trenutno ne mogu doći do servera. Pokušajte ponovno za koji trenutak.');
    console.error(err);
  }

  setBusy(false);
  chatInput.focus();
}

if (chatSend && chatInput) {
  chatSend.addEventListener('click', sendChatMessage);
  chatInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') sendChatMessage();
  });
}

// ── Kontakt forma (mailto) ─────────────────────────────────────────────────
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
