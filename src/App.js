import { useState } from "react";
import { useMovies } from "./Hooks/useMovies";
import { useLocalStorageState } from "./Hooks/useLocalStorageState";
import Box from "./Components/Box";
import ErrorMessage from "./Components/ErrorMessage";
import Loader from "./Components/Loader";
import Main from "./Components/Main";
import MovieDetails from "./Components/MovieDetails";
import MovieList from "./Components/MovieList";
import NavBar from "./Components/NavBar";
import NumResults from "./Components/NumResults";
import Search from "./Components/Search";
import WatchedMoviesList from "./Components/WatchedMoviesList";
import WatchedMoviesSummary from "./Components/WatchedMoviesSummary";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  /* customHook {useMovies} */
  const { movies, isLoading, error } = useMovies(query);

  /* customHook {useLocalStorageState}*/
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(movieId) {
    setSelectedId((selectedId) => (movieId === selectedId ? null : movieId));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(movieId) {
    setWatched((watched) =>
      watched.filter((movie) => movie.imdbID !== movieId)
    );
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {/* 1- if data loadig then show Loader */}
          {isLoading && <Loader />}
          {/* 2- if data loaded & no error happen then show MovieList */}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {/* 3- if error happen then show ErrorMessage */}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedID={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedMoviesSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
