// Função para carregar o conteúdo de um arquivo HTML e injetá-lo em um elemento
function loadHTML(file, elementId) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => {
            console.error('Erro ao carregar o conteúdo:', error);
        });
}

// Carregar o header e o footer na página
document.addEventListener('DOMContentLoaded', function() {
    loadHTML('/includes/header.html', 'header');
    loadHTML('/includes/footer.html', 'footer');
});
