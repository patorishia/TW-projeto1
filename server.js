const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Garantir que o arquivo JSON exista
const dataFile = path.join(__dirname, 'data', 'data.json');
if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify({ news: [] }, null, 2));
}

// Configurar o Express para aceitar JSON no corpo das requisições
app.use(express.json());

// Servir arquivos da pasta 'data'
app.use('/data',express.static(path.join(__dirname, 'data')));

// Defina o diretório para arquivos estáticos (CSS, JS, etc.)
app.use('/public',express.static(path.join(__dirname, 'public')));
app.use('/assets',express.static(path.join(__dirname, 'assets')));
app.use('/includes',express.static(path.join(__dirname, 'includes')));
app.use('/crud',express.static(path.join(__dirname, 'crud')));

// Função para ler o arquivo JSON
function readJSONFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) reject(err);
            resolve(JSON.parse(data));
        });
    });
}

// Função para escrever no arquivo JSON
function writeJSONFile(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
            if (err) reject(err);
            resolve();
        });
    });
}

// Rota para pegar todas as notícias
app.get('/api/news', async (req, res) => {
    try {
        const data = await readJSONFile(dataFile);
        res.json(data.news);  // Acessando as notícias dentro de 'data.json'
    } catch (err) {
        res.status(500).json({ error: 'Failed to read news data' });
    }
});

// Rota para adicionar uma nova notícia
app.post('/api/news', async (req, res) => {
    try {
        const { title, content, author_id } = req.body;
        if (!title || !content || !author_id) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const data = await readJSONFile(dataFile);

        const newNews = {
            id: data.news.length + 1,
            title,
            content,
            author_id,
            created_at: new Date().toISOString()
        };

        data.news.push(newNews);
        await writeJSONFile(dataFile, data);  // Escrevendo no mesmo arquivo data.json
        res.status(201).json(newNews);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add news' });
    }
});

// Rota para servir o arquivo index.html (exemplo)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'includes', 'layout.html'));
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
