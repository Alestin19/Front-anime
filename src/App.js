import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [animes, setAnimes] = useState([]);
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [rating, setRating] = useState('');

  // Obtener todos los animes
  useEffect(() => {
    async function fetchAnimes() {
      try {
        const response = await axios.get('http://localhost:3000/animes');
        setAnimes(response.data);
      } catch (error) {
        console.error('Error fetching animes', error);
      }
    }
    fetchAnimes();
  }, []);

  // Agregar un nuevo anime
  const addAnime = async () => {
    if (title && releaseYear) {
      try {
        await axios.post('http://localhost:3000/animes', { title, genre, release_year: releaseYear, rating });
        setTitle('');
        setGenre('');
        setReleaseYear('');
        setRating('');
        const response = await axios.get('http://localhost:3000/animes');
        setAnimes(response.data);
      } catch (error) {
        console.error('Error adding anime', error);
      }
    }
  };

  // Eliminar un anime
  const deleteAnime = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/animes/${id}`);
      setAnimes(animes.filter(anime => anime.id !== id));
    } catch (error) {
      console.error('Error deleting anime', error);
    }
  };

  return (
    <div className="App">
      <h1>Catálogo de Animes</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
      />
      <input
        type="text"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        placeholder="Género"
      />
      <input
        type="number"
        value={releaseYear}
        onChange={(e) => setReleaseYear(e.target.value)}
        placeholder="Año de estreno"
      />
      <input
        type="number"
        step="0.1"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        placeholder="Calificación"
      />
      <button onClick={addAnime}>Agregar</button>
      <ul>
        {animes.map(anime => (
          <li key={anime.id}>
            <strong>{anime.title}</strong> - {anime.genre} ({anime.release_year}) - {anime.rating}
            <button onClick={() => deleteAnime(anime.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
