const express = require('express');
const app = express();
const port = 3000;

// Dummy data (contoh data film dengan director)
const movies = [
    { id: 1, title: 'Inception', director: 'Christopher Nolan', year: 2010 },
    { id: 2, title: 'Interstellar', director: 'Christopher Nolan', year: 2014 },
    { id: 3, title: 'The Dark Knight', director: 'Christopher Nolan', year: 2008 }
];

// Route untuk menampilkan semua movie
app.get('/movies', (req, res) => {
    res.json(movies);
});

// Route untuk mencari movie berdasarkan ID
app.get('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (movie) {
        res.json(movie);
    } else {
        res.status(404).send('Movie not found');
    }
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
