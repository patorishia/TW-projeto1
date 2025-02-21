/**news-crud.js */
document.getElementById('news-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const newNews = {
        title: title,
        content: content,
        created_at: new Date().toISOString()
    };

    // Simulating saving news to the local JSON data
    fetch('data/data.json')
        .then(response => response.json())
        .then(data => {
            data.news.push(newNews);
            // Simulate saving updated data back to JSON
            alert('News created successfully!');
        });
});
