const fetchJuicerFeed = () => {
  const url = new URL('/api/feeds/haggisrugby', 'https://www.juicer.io');
  url.searchParams.set('per', 5);
  url.searchParams.set('page', 1);

  return fetch(url)
    .then(res => res.json())
    .then(data => data.posts.items);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);

  return date.toDateString();
};

const createArticle = (item) => {
  const section = document.createElement('section');
  section.innerHTML = `
    <a class="image" href="${item.full_url}" target="_blank">
      <img 
        alt="${item.feed}" 
        data-position="center center" 
        src="${item.image ? item.image : 'images/dead-goat.svg'}" 
      />
    </a>
    <div class="content">
      <div class="inner">
        <h3 class="title">
          <span class="fab fa-${item.source.source.toLowerCase()}"></span> 
          ${item.source.term}
        </h3>
        <h4 class="caption">
          <span class="far fa-clock"></span>
          ${formatDate(item.external_created_at)}
        </h4>
        ${item.message}
      </div>
    </div>
  `;

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
