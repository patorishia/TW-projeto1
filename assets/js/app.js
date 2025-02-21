// Função para adicionar a classe 'active' ao item de menu clicado
function setActiveLink() {
  // Selecionar todos os links do menu
  const menuItems = document.querySelectorAll('.nav-item');

  // Remover a classe 'active' de todos os itens
  menuItems.forEach(item => {
      item.classList.remove('active');
  });

  // Adicionar a classe 'active' ao item que foi clicado
  this.classList.add('active');
}
// Função para carregar o conteúdo de um arquivo HTML e injetá-lo em um elemento
function loadHTML(file, elementId) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(elementId).innerHTML = data;

      // Adicionar evento de clique aos itens de navegação depois de carregar o conteúdo
      document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', setActiveLink);
      });
    })
    .catch(error => {
      console.error('Erro ao carregar o conteúdo:', error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  function loadHTML(url, elementId) {
      fetch(url)
          .then(response => response.text())
          .then(data => {
              document.getElementById(elementId).innerHTML = data;
          })
          .catch(error => console.error(`Erro ao carregar ${url}:`, error));
  }

  // Carregar header e footer
  loadHTML("/includes/header.html", "header");
  loadHTML("/includes/footer.html", "footer");

  // Definir a página a carregar com base na URL (?page=)
  const params = new URLSearchParams(window.location.search);
  let page = params.get("page") || "index"; // Se não houver parâmetro, carregar index.html

  // Carregar o conteúdo correto
  loadHTML(`/public/${page}.html`, "page-content");
});





// Função para carregar notícias da API
function loadNews() {
  fetch('/api/news')
    .then(response => response.json())  // Certifique-se de que o retorno é um JSON
    .then(news => {
      const newsListElement = document.getElementById('news-list');
      newsListElement.innerHTML = '';  // Limpar qualquer conteúdo existente

      news.forEach(newsItem => {
        const newsItemElement = document.createElement('div');
        newsItemElement.classList.add('news-item');
        newsItemElement.innerHTML = `
          <h3>${newsItem.title}</h3>
          <p>${newsItem.content}</p>
          <small>Author ID: ${newsItem.author_id}</small>
          <small>${new Date(newsItem.created_at).toLocaleString()}</small>
        `;
        newsListElement.appendChild(newsItemElement);
      });
    })
    .catch(error => {
      console.error('Erro ao carregar as notícias:', error);
    });
}

// Chamar a função para carregar as notícias quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
  loadNews();  // Carregar as notícias da API na página
});
