const games = [
  {
    id: 'plague',
    title: "A Plague Tale",
    prices: "Rs 3,755.00 – Rs 5,999.00",
    discount: "-25%",
    img: "https://i.imgur.com/RfuQld1.jpg",
    description: "A Plague Tale is a story-driven adventure game with intense stealth and emotional narrative. Set in medieval France."
  },
  {
    id: 'assassins',
    title: "Assassin’s Creed",
    prices: "Rs 4,999.00",
    tag: "NEW",
    img: "https://i.imgur.com/gV6NpWL.jpg",
    description: "Assassin’s Creed Mirage takes you back to the roots of the franchise with stealth and parkour."
  },
  {
    id: 'asterigos',
    title: "Asterigos: Curse of",
    prices: "Rs 2,425.00 – Rs 3,999.00",
    img: "https://i.imgur.com/QEwwjOK.jpg",
    description: "Asterigos is an action RPG with dynamic combat and rich story elements."
  },
  {
    id: 'bokura',
    title: "BOKURA for PC",
    prices: "Rs 999.00",
    img: "https://i.imgur.com/27kzKjd.png",
    description: "BOKURA is a peaceful and artistic RPG with pixel art style and deep story."
  },
  {
    id: 'borderlands3',
    title: "Borderlands 3",
    prices: "Rs 5,999.00 – Rs 6,999.00",
    img: "https://i.imgur.com/3OwsJMb.jpg",
    description: "Borderlands 3 is a fast-paced shooter with wild humor and looting."
  },
  {
    id: 'codmw',
    title: "Call of Duty: Modern",
    prices: "Rs 6,999.00 – Rs 9,999.00",
    tag: "HOT",
    img: "https://i.imgur.com/Xd93j1V.jpg",
    description: "Call of Duty: Modern Warfare offers intense multiplayer and story campaigns."
  },
  {
    id: 'carx',
    title: "CarX Drift Racing",
    prices: "Rs 1,899.00 – Rs 2,099.00",
    discount: "-13%",
    img: "https://i.imgur.com/KvEzm1A.jpg",
    description: "CarX Drift Racing is a realistic and exciting car drifting simulator."
  },
  {
    id: 'clash',
    title: "Clash: Artifacts of",
    prices: "Rs 2,999.00 – Rs 3,999.00",
    img: "https://i.imgur.com/r6B43wE.jpg",
    description: "Clash is a fantasy game featuring unique characters and strategy."
  },
  {
    id: 'crab',
    title: "CRAB Champions",
    prices: "",
    img: "https://i.imgur.com/NOHwXHu.jpg",
    description: "CRAB Champions is a fun and fast-paced multiplayer shooter with a crab hero."
  },
  {
    id: 'crimeboss',
    title: "CRIME BOSS",
    prices: "",
    tag: "NEW",
    img: "https://i.imgur.com/0Ow9Psp.jpg",
    description: "CRIME BOSS is an action-packed crime simulator with multiplayer."
  },
  {
    id: 'cyberpunk',
    title: "Cyberpunk 2077",
    prices: "",
    img: "https://i.imgur.com/o69Q7Mi.jpg",
    description: "Cyberpunk 2077 offers an expansive open-world RPG experience."
  },
  {
    id: 'tropical',
    title: "Tropical Island",
    prices: "",
    tag: "HOT NEW",
    img: "https://i.imgur.com/t8QzJqt.jpg",
    description: "Tropical Island is a relaxing simulation game set on a paradise island."
  }
];

// Render grid
const grid = document.getElementById('game-grid');

function createCard(game) {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.id = game.id;

  // Discount or Tag
  if (game.discount) {
    const discount = document.createElement('div');
    discount.className = 'discount';
    discount.textContent = game.discount;
    card.appendChild(discount);
  }
  if (game.tag) {
    const tag = document.createElement('div');
    tag.className = 'tag';
    tag.textContent = game.tag;
    card.appendChild(tag);
  }

  // Image
  const img = document.createElement('img');
  img.src = game.img;
  img.alt = game.title;
  card.appendChild(img);

  // Content
  const content = document.createElement('div');
  content.className = 'content';

  const title = document.createElement('div');
  title.className = 'title';
  title.textContent = game.title;
  content.appendChild(title);

  if (game.prices) {
    const price = document.createElement('div');
    price.className = 'price';
    price.textContent = game.prices;
    content.appendChild(price);
  }

  const options = document.createElement('div');
  options.className = 'options';
  options.textContent = 'Select Options';
  content.appendChild(options);

  card.appendChild(content);

  // Click to show description
  card.addEventListener('click', () => {
    showDescription(game);
  });

  return card;
}

function renderGrid() {
  grid.innerHTML = '';
  for (const game of games) {
    grid.appendChild(createCard(game));
  }
}
renderGrid();

// Description modal
const modal = document.getElementById('desc-modal');
const descContainer = document.getElementById('desc-container');
const closeBtn = document.getElementById('close-desc');

function showDescription(game) {
  descContainer.innerHTML = `
    <h2>${game.title}</h2>
    <img src="${game.img}" alt="${game.title}" style="max-width:100%; border-radius: 8px; margin-bottom: 10px;" />
    <p>${game.description}</p>
    <p><strong>Price: </strong> ${game.prices || "Check options"}</p>
  `;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
}

closeBtn.addEventListener('click', () => {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
});

modal.addEventListener('click', e => {
  if (e.target === modal) {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
  }
});
