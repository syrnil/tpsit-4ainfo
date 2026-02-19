const express = require('express');
const fs = require('fs');
const app = express();

// Middleware per leggere i dati del form
app.use(express.urlencoded({ extended: true }));

// Rotta GET: Renderizza la pagina col form minimale
app.get('/post', (req, res) => {
    res.send(`
        <form action="/post" method="POST">
            <input type="text" name="dato" placeholder="Inserisci dato" required>
            <button type="submit">Salva nel JSON</button>
        </form>
    `);
});

// Rotta POST: Riceve i dati e li salva su post.json
app.post('/post', (req, res) => {
    const nuovoDato = req.body;
    let datiFile = [];

    // Controlla se il file esiste già per non sovrascrivere tutto
    if (fs.existsSync('post.json')) {
        const fileContent = fs.readFileSync('post.json', 'utf8');
        // Se il file è vuoto, evita errori di parsing
        if (fileContent) datiFile = JSON.parse(fileContent); 
    }

    datiFile.push(nuovoDato);
    fs.writeFileSync('post.json', JSON.stringify(datiFile, null, 2));

    res.send('Salvato! <a href="/post">Torna al form</a>');
});

// Avvio del server
app.listen(3000, () => {
    console.log('Server avviato su http://localhost:3000/post');
});
