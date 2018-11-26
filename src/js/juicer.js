const fetchJuicerFeed = () => {
  const url = new URL('/api/feeds/haggisrugby', 'https://www.juicer.io');
  url.searchParams.set('per', 5);
  url.searchParams.set('page', 1);

  return fetch(url)
    .then(res => res.json())
    .then(data => data.posts.items);
};

const createArticle = (item) => {
  const section = document.createElement('section');
  // section.innerHTML = `

  // `;

  const link = document.createElement('a');
  link.setAttribute('href', item.full_url);
  link.classList.add('image');

  link.innerHTML = !item.image
    ? '<img src="images/dead-goat.svg" alt="" data-position="center center"/>'
    : `<img alt="${item.id}" src="${item.image}" data-position="center center" />`;

  const content = document.createElement('div');
  content.classList.add('content');

  content.innerHTML = `
    <div class="inner">
      <h4><span class="fab fa-${item.source.source.toLowerCase()}"></span> ${item.source.term}</h4>
    
      ${item.message}
    </div>
  `;

  section.appendChild(link);
  section.appendChild(content);

  return section;
};

const initializeScroll = () => {
  $('.spotlights > section').scrollex({
    mode: 'middle',
    top: '-10vh',
    bottom: '-10vh',
    initialize() {
      // Deactivate section.
      $(this).addClass('inactive');
    },
    enter() {
      // Activate section.
      $(this).removeClass('inactive');
    },
  });
};

module.exports = async () => {
  const items = await fetchJuicerFeed();

  const articles = items.map(createArticle);
  const container = document.querySelector('#juicer .spotlights');
  articles.forEach(el => container.appendChild(el));
  initializeScroll();
};
