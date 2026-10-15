const thoughts = [
  'people.',
  'clarity.',
  'connection.',
];
const typedQuote = document.querySelector('#typed-quote');
const quoteAnnouncement = document.querySelector('#quote-announcement');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (typedQuote && quoteAnnouncement) {
  if (reducedMotion) {
    typedQuote.textContent = thoughts[0];
    quoteAnnouncement.textContent = thoughts[0];
  } else {
    let line = 0;
    let character = 0;
    let deleting = false;

    const typeNextCharacter = () => {
      const current = thoughts[line];
      if (!deleting) {
        character += 1;
        typedQuote.textContent = current.slice(0, character);
        if (character === current.length) {
          quoteAnnouncement.textContent = current;
          window.setTimeout(() => { deleting = true; typeNextCharacter(); }, 1850);
          return;
        }
        window.setTimeout(typeNextCharacter, 48);
        return;
      }

      character -= 1;
      typedQuote.textContent = current.slice(0, character);
      if (character === 0) {
        deleting = false;
        line = (line + 1) % thoughts.length;
        window.setTimeout(typeNextCharacter, 320);
        return;
      }
      window.setTimeout(typeNextCharacter, 28);
    };

    window.setTimeout(typeNextCharacter, 420);
  }
}

const nav = document.querySelector('.main-nav');
const menuButton = document.querySelector('.menu-toggle');
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  nav.classList.toggle('is-open', !isOpen);
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}));

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...nav.querySelectorAll('a')];
const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  navLinks.forEach((link) => {
    const current = link.getAttribute('href') === `#${visible.target.id}`;
    link.classList.toggle('active', current);
    if (current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}, { rootMargin: '-28% 0px -58% 0px', threshold: [0, .2, .5, .8] });
sections.forEach((section) => sectionObserver.observe(section));

const filterButtons = [...document.querySelectorAll('.filter-chip')];
const projectCards = [...document.querySelectorAll('.project-card')];
const countLabel = document.querySelector('#project-count');
filterButtons.forEach((button) => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filterButtons.forEach((item) => {
    const selected = item === button;
    item.classList.toggle('selected', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
  let visibleCount = 0;
  projectCards.forEach((card) => {
    const show = filter === 'all' || card.dataset.category === filter;
    card.hidden = !show;
    if (show) {
      visibleCount += 1;
      card.style.animation = 'none';
      requestAnimationFrame(() => { card.style.animation = ''; });
    }
  });
  countLabel.textContent = String(visibleCount).padStart(2, '0');
}));

const copyButton = document.querySelector('#copy-email');
const toast = document.querySelector('.toast-message');
let toastTimer;
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('krishsharma1505@gmail.com');
    copyButton.querySelector('span:last-child').textContent = 'Email copied';
    toast.textContent = 'Email copied to clipboard.';
    window.clearTimeout(toastTimer);
    toast.classList.add('show');
    toastTimer = window.setTimeout(() => {
      toast.classList.remove('show');
      copyButton.querySelector('span:last-child').textContent = 'Copy email';
    }, 2000);
  } catch {
    window.location.href = 'mailto:krishsharma1505@gmail.com';
  }
});
