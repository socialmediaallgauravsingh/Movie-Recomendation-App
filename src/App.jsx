import React, { useState, useEffect } from 'react';
import './App.css';

const movieData = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    poster: "/images/movie1.jpg",
    genre: ["Drama"],
    year: 1994,
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    actors: ["Tim Robbins", "Morgan Freeman"]
  },
  {
    id: 2,
    title: "The Godfather",
    poster: "/images/movie2.jpg",
    genre: ["Crime", "Drama"],
    year: 1972,
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    actors: ["Marlon Brando", "Al Pacino"]
  },
  {
    id: 3,
    title: "The Dark Knight",
    poster: "/images/movie3.jpg",
    genre: ["Action", "Crime", "Drama"],
    year: 2008,
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    actors: ["Christian Bale", "Heath Ledger"]
  },
  {
    id: 4,
    title: "Pulp Fiction",
    poster: "/images/movie4.jpg",
    genre: ["Crime", "Drama"],
    year: 1994,
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    actors: ["John Travolta", "Uma Thurman"]
  },
  {
    id: 5,
    title: "Inception",
    poster: "/images/movie5.jpg",
    genre: ["Action", "Adventure", "Sci-Fi"],
    year: 2010,
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"]
  }
];

function App() {
  const [movies, setMovies] = useState(movieData);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showMovieModal, setShowMovieModal] = useState(false);

 
  const allGenres = ["All", ...new Set(movieData.flatMap(movie => movie.genre))];

  
  useEffect(() => {
    let filtered = movieData;
    
    if (searchTerm) {
      filtered = filtered.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase())))
    }
    
    if (selectedGenre !== "All") {
      filtered = filtered.filter(movie => movie.genre.includes(selectedGenre));
    }
    
    setMovies(filtered);
  }, [searchTerm, selectedGenre]);

  
  const toggleFavorite = (movieId) => {
    if (favorites.includes(movieId)) {
      setFavorites(favorites.filter(id => id !== movieId));
    } else {
      setFavorites([...favorites, movieId]);
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <img src="/images/logomovie.jpg" alt="Movie Logo" />
          <h1>Movies App</h1>
        </div>
        
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button">🔍</button>
        </div>
        
        <button 
          className="favorites-button"
          onClick={() => setShowFavoritesModal(true)}
        >
          ❤️ Favorites ({favorites.length})
        </button>
      </header>

      {/* Genre Filter */}
      <div className="genre-filter">
        {allGenres.map(genre => (
          <button
            key={genre}
            className={`genre-button ${selectedGenre === genre ? 'active' : ''}`}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      
      <main className="movie-grid">
        {movies.map(movie => (
          <div 
            key={movie.id} 
            className="movie-card"
            onClick={() => {
              setSelectedMovie(movie);
              setShowMovieModal(true);
            }}
          >
            <div className="movie-poster-container">
              <img 
                src={movie.poster} 
                alt={movie.title} 
                className="movie-poster"
              />
              <button 
                className={`favorite-heart ${favorites.includes(movie.id) ? 'favorited' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(movie.id);
                }}
              >
                ❤️
              </button>
            </div>
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>{movie.actors.join(", ")}</p>
            </div>
          </div>
        ))}
      </main>

     
      {showFavoritesModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Your Favorites</h2>
              <button 
                className="close-button"
                onClick={() => setShowFavoritesModal(false)}
              >
                ×
              </button>
            </div>
            <div className="favorites-grid">
              {favorites.length > 0 ? (
                movieData
                  .filter(movie => favorites.includes(movie.id))
                  .map(movie => (
                    <div 
                      key={movie.id} 
                      className="favorite-card"
                      onClick={() => {
                        setSelectedMovie(movie);
                        setShowMovieModal(true);
                      }}
                    >
                      <img 
                        src={movie.poster} 
                        alt={movie.title} 
                        className="favorite-poster"
                      />
                      <h4>{movie.title}</h4>
                    </div>
                  ))
              ) : (
                <p>No favorites yet. Click the heart on movies to add them!</p>
              )}
            </div>
          </div>
        </div>
      )}

     
      {showMovieModal && selectedMovie && (
        <div className="modal-overlay">
          <div className="modal movie-details-modal">
            <div className="modal-header">
              <h2>{selectedMovie.title}</h2>
              <button 
                className="close-button"
                onClick={() => setShowMovieModal(false)}
              >
                ×
              </button>
            </div>
            <div className="movie-details-content">
              <img 
                src={selectedMovie.poster} 
                alt={selectedMovie.title} 
                className="details-poster"
              />
              <div className="movie-details-info">
                <p><strong>Year:</strong> {selectedMovie.year}</p>
                <p><strong>Genre:</strong> {selectedMovie.genre.join(", ")}</p>
                <p><strong>Actors:</strong> {selectedMovie.actors.join(", ")}</p>
                <p><strong>Description:</strong> {selectedMovie.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

    
      <footer className="footer">
        <p>© 2025 Movies App. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
}

export default App;