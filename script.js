const articles = [
  {
    tag: 'Algorithms',
    title: 'A map is a great place to meet a search algorithm',
    excerpt: 'A practical look at why A* and Dijkstra can take different routes—and what a visualizer helps reveal.',
    read: '4 MIN READ · NOTES BY KRISH',
    body: [
      'A pathfinding algorithm does not see a map the way a person does. It sees a graph: a collection of locations connected by possible moves. The algorithm’s job is to decide which locations to examine, and in what order, before it can be confident about a route.',
      'Dijkstra’s algorithm expands outward from the start, always choosing the next location with the lowest known travel cost. A* adds a heuristic: an estimate of how far a location is from the goal. That estimate helps it focus its search toward the destination while still accounting for the path cost already travelled.',
      'A visualizer makes that difference tangible. Watching visited nodes spread across a map can explain more than a formula alone. Comparing the final route, visited-node count, and elapsed time also reminds us that “shortest” and “fastest to compute” are different questions.',
      'In the Map Pathfinding Visualizer, these ideas can be explored with A*, Dijkstra, Best-First, Beam Search, and Bidirectional Search. The map becomes a space for experimentation: choose endpoints, watch the traversal, and compare what each strategy prioritises.',
    ],
  },
  {
    tag: 'Project notes',
    title: 'Designing event discovery around student context',
    excerpt: 'CampusConnect explores a simple idea: an event feed is more useful when it reflects who is looking at it.',
    read: '3 MIN READ · NOTES BY KRISH',
    body: [
      'A campus can have plenty of events and still make discovery difficult. Students may have to sort through opportunities that do not fit their year, degree, or course. CampusConnect approaches that problem by using academic profile attributes to personalise the event feed.',
      'The project separates two roles. Admins manage events; students browse a feed matched to their academic profile and register. That structure gives each visitor a clearer starting point and makes the purpose of each view easier to understand.',
      'The data model matters to the experience. Event-user matching depends on storing events, users, and academic attributes in a relational database. A well-defined relationship between those records helps the interface show relevant choices consistently.',
      'This project is a reminder that information architecture and database design meet in the interface. The underlying model determines which choices the product can make visible—and how clearly it can explain them.',
    ],
  },
  {
    tag: 'Cybersecurity',
    title: 'Encryption names are not the whole security story',
    excerpt: 'A short orientation to symmetric and asymmetric cryptography, hashes, and the role each plays.',
    read: '4 MIN READ · NOTES BY KRISH',
    body: [
      'Cryptography is a toolkit, not a single feature. Symmetric encryption uses the same secret key to encrypt and decrypt data. Asymmetric cryptography uses a related public and private key pair, which makes it useful for different tasks such as establishing trust or exchanging key material.',
      'Hash functions solve a different problem. A cryptographic hash maps input data to a fixed-size digest; it is designed to be one-way. A hash is not a substitute for encryption when the original data must be recovered.',
      'The names of algorithms—AES, RSA, SHA-512—are only one part of a secure system. How keys are generated, stored, rotated, and used matters too. Security depends on the whole design and its implementation, not just the label on one component.',
      'Studying these building blocks side by side makes their boundaries easier to remember: encryption protects confidentiality, asymmetric systems support public-key operations, and hashes help verify data integrity. Choosing among them starts with understanding the problem being solved.',
    ],
  },
];

const thoughts = [
  'Building with\npeople in mind.',
  'Making technology\nfeel intuitive.',
  'Turning curiosity\ninto code.',
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

const dialog = document.querySelector('#article-dialog');
const closeButtons = [...dialog.querySelectorAll('.modal-close, .modal-close-text')];
document.querySelectorAll('[data-article]').forEach((button) => button.addEventListener('click', () => {
  const article = articles[Number(button.dataset.article)];
  if (!article) return;
  document.querySelector('#article-tag').textContent = article.tag;
  document.querySelector('#article-title').textContent = article.title;
  document.querySelector('#article-excerpt').textContent = article.excerpt;
  document.querySelector('#article-reading-time').textContent = article.read;
  const prose = document.querySelector('#article-prose');
  prose.replaceChildren(...article.body.map((text) => {
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    return paragraph;
  }));
  dialog.showModal();
}));
closeButtons.forEach((button) => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });

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
