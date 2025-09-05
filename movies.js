const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3200;

app.use(cors());
app.use(express.json());

let movies = [
  { id: 1, title: 'Parasite', director: 'Bong Joon-ho', year: 2019 },
  { id: 2, title: 'The Dark Knight', director: 'Christopher Nolan', year: 2008 },
  { id: 3, title: 'Rampage', director: 'Brad Peyton', year: 2018 },
  { id: 4, title: 'Menjelang Magrib', director: 'Helfi Kardit', year: 2022 },
  { id: 5, title: 'The Conjuring', director: 'James Wan', year: 2013 },
  { id: 6, title: 'Annabelle', director: 'John R. Leonetti', year: 2014 },
  { id: 7, title: 'Cukki', director: 'Don Mancini', year: 2023 }
];
let idSeq = 8;

app.get('/status', (req, res) => {
  res.json({
    ok: true,
    service: 'film-api',
    time: new Date().toISOString()
  });
});

app.get('/movies', (req, res) => {
  res.json(movies);
});

app.get('/movies/:id', (req, res) => {
  const id = Number(req.params.id);
  const movie = movies.find(m => m.id === id);
  if (!movie) return res.status(404).json({ error: 'Movie tidak ditemukan' });
  res.json(movie);
});

app.get('/movies/search', (req, res) => {
  const title = (req.query.title || '').toLowerCase();
  const result = movies.filter(m => m.title.toLowerCase().includes(title));
  if (result.length === 0) {
    return res.status(404).json({ error: 'Movie tidak ditemukan' });
  }
  res.json(result);
});

app.post('/movies', (req, res) => {
  const { title, director, year } = req.body || {};
  if (!title || !director || !year) {
    return res.status(400).json({ error: 'title, director, year wajib diisi' });
  }
  const newMovie = { id: idSeq++, title, director, year };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

app.put('/movies/:id', (req, res) => {
  const id = Number(req.params.id);
  const movieIndex = movies.findIndex(m => m.id === id);
  if (movieIndex === -1) {
    return res.status(404).json({ error: 'Movie tidak ditemukan' });
  }
  const { title, director, year } = req.body || {};
  if (!title || !director || !year) {
    return res.status(400).json({ error: 'title, director, year wajib diisi' });
  }
  const updatedMovie = { id, title, director, year };
  movies[movieIndex] = updatedMovie;
  res.json(updatedMovie);
});

app.delete('/movies/:id', (req, res) => {
  const id = Number(req.params.id);
  const movieIndex = movies.findIndex(m => m.id === id);
  if (movieIndex === -1) {
    return res.status(404).json({ error: 'Movie tidak ditemukan' });
  }
  movies.splice(movieIndex, 1);
  res.status(204).send();
});

app.use((req, res) => {
  res.status(404).json({ error: 'Rute tidak ditemukan' });
});

app.use((err, req, res, _next) => {
  console.error('[ERROR]', err);
  res.status(500).json({ error: 'Terjadi kesalahan pada server' });
});

app.listen(PORT, () => {
  console.log(`Server aktif di http://localhost:${PORT}`);
});
