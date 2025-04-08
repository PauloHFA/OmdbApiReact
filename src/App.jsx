import { ChakraProvider, Container, Grid, Heading, VStack, Box, Button, Input, InputGroup, InputRightElement, useColorMode, Spinner, Center, useDisclosure, Text, Select, HStack, Flex } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import { SunIcon, MoonIcon, SearchIcon } from '@chakra-ui/icons';
import MovieCard from './components/MovieCard';
import MovieDetails from './components/MovieDetails';
import GenreMenu from './components/GenreMenu';
import ThemeToggleButton from './components/ThemeToggleButton';
import { searchMovies } from './services/api';
import { theme } from './theme';

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen } = useDisclosure({ defaultIsOpen: true });
  const observer = useRef();
  const currentQuery = useRef('movie');

  // Array de anos de 1900 até o ano atual
  const years = Array.from(
    { length: new Date().getFullYear() - 1900 + 1 },
    (_, i) => String(new Date().getFullYear() - i)
  );

  const lastMovieElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !selectedYear) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, selectedYear]);

  useEffect(() => {
    loadPopularMovies();
  }, []);

  useEffect(() => {
    if (page > 1) {
      loadMoreMovies();
    }
  }, [page]);

  useEffect(() => {
    if (selectedGenre) {
      setPage(1);
      currentQuery.current = selectedGenre;
      handleSearch(selectedGenre, true);
    }
  }, [selectedGenre]);

  useEffect(() => {
    if (selectedYear) {
      setFilteredMovies(movies.filter(movie => movie.Year === selectedYear));
    } else {
      setFilteredMovies(movies);
    }
  }, [selectedYear, movies]);

  const loadPopularMovies = async () => {
    setLoading(true);
    currentQuery.current = 'movie';
    try {
      const data = await searchMovies('movie', 1);
      if (data.Response === 'True') {
        setMovies(data.Search);
        setFilteredMovies(data.Search);
        setHasMore(data.totalResults > data.Search.length);
      }
    } catch (error) {
      console.error('Error loading movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreMovies = async () => {
    if (!hasMore || loading || selectedYear) return;
    setLoading(true);
    try {
      const data = await searchMovies(currentQuery.current, page);
      if (data.Response === 'True') {
        const newMovies = data.Search.filter(newMovie => 
          !movies.some(existingMovie => existingMovie.imdbID === newMovie.imdbID)
        );
        
        setMovies(prevMovies => [...prevMovies, ...newMovies]);
        
        // Atualiza os filmes filtrados mantendo o filtro de ano
        if (selectedYear) {
          const newFilteredMovies = newMovies.filter(movie => movie.Year === selectedYear);
          setFilteredMovies(prev => [...prev, ...newFilteredMovies]);
        } else {
          setFilteredMovies(prev => [...prev, ...newMovies]);
        }
        
        setHasMore(data.totalResults > (movies.length + newMovies.length));
      }
    } catch (error) {
      console.error('Error loading more movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoviesByYear = async (year) => {
    setLoading(true);
    try {
      // Lista expandida de termos de busca
      const searchTerms = [
        'the', 'a', 'movie', 'film', 'star', 'love',
        'war', 'life', 'world', 'man', 'day', 'time',
        'night', 'girl', 'house', 'year', 'story', 'king'
      ];
      let allMovies = [];
      let totalPages = 3; // Número de páginas a buscar por termo
      
      // Tenta cada termo de busca
      for (const term of searchTerms) {
        // Busca múltiplas páginas para cada termo
        for (let page = 1; page <= totalPages; page++) {
          const data = await searchMovies(term, page);
          if (data.Response === 'True') {
            // Filtra por ano e remove duplicatas
            const newMovies = data.Search.filter(movie => 
              movie.Year === year && 
              !allMovies.some(m => m.imdbID === movie.imdbID)
            );
            allMovies = [...allMovies, ...newMovies];
            
            // Se não há mais resultados para este termo, passe para o próximo
            if (data.Search.length < 10) break;
          } else {
            break; // Se não há resultados, passa para o próximo termo
          }
        }
        
        // Atualiza os resultados a cada termo para mostrar progresso
        if (allMovies.length > 0) {
          setMovies(allMovies);
          setFilteredMovies(allMovies);
        }
      }

      if (allMovies.length > 0) {
        setMovies(allMovies);
        setFilteredMovies(allMovies);
        setHasMore(false); // Desativa paginação quando filtrando por ano
      } else {
        setMovies([]);
        setFilteredMovies([]);
      }
    } catch (error) {
      console.error('Error loading movies by year:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleYearChange = (event) => {
    const year = event.target.value;
    setSelectedYear(year);
    if (year) {
      loadMoviesByYear(year);
    } else {
      setFilteredMovies(movies);
      if (searchQuery.trim()) {
        handleSearch(searchQuery);
      } else {
        loadPopularMovies();
      }
    }
  };

  const handleSearch = async (query, isGenreSearch = false) => {
    if (!query && !selectedYear && !isGenreSearch) {
      loadPopularMovies();
      return;
    }

    setLoading(true);
    setIsSearching(true);
    setPage(1);

    try {
      const data = await searchMovies(query, 1);
      if (data.Response === 'True') {
        const newMovies = data.Search;
        if (selectedYear) {
          // Se temos um ano selecionado, filtra os resultados
          const filteredByYear = newMovies.filter(movie => movie.Year === selectedYear);
          setMovies(newMovies);
          setFilteredMovies(filteredByYear);
          setHasMore(false); // Desativa paginação quando filtrando por ano
        } else {
          setMovies(newMovies);
          setFilteredMovies(newMovies);
          setHasMore(data.totalResults > newMovies.length);
        }
      } else {
        setMovies([]);
        setFilteredMovies([]);
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error searching movies:', error);
    } finally {
      setLoading(false);
    }

    if (!isGenreSearch) {
      setSelectedGenre(null);
    }
  };

  const handleGenreSelect = (genre) => {
    if (genre === selectedGenre) {
      setSelectedGenre(null);
      setSelectedYear('');
      loadPopularMovies();
    } else {
      setSelectedGenre(genre);
      setSearchQuery('');
      handleSearch(genre, true);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchTerm = searchQuery.trim();
    if (!searchTerm && !selectedYear) {
      loadPopularMovies();
    } else {
      handleSearch(searchTerm);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box minH="100vh" position="relative">
          <GenreMenu selectedGenre={selectedGenre} onSelectGenre={handleGenreSelect} />
          <Box pl={{ base: "60px", md: "250px" }} pt={4}>
            <Container maxW="100%" px={4} py={4}>
              <VStack spacing={4} align="stretch">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Heading as="h1" size="xl">
                    Filmes IMDB API
                  </Heading>
                  <ThemeToggleButton />
                </Box>

                <Box px={4}>
                  <HStack spacing={4}>
                    <Box flex="1">
                      <form onSubmit={handleSearchSubmit}>
                        <InputGroup size="lg">
                          <Input
                            id="movie-search"
                            name="movie-search"
                            placeholder="Buscar filmes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            variant="outline"
                          />
                          <InputRightElement width="4.5rem">
                            <Button
                              type="submit"
                              h="1.75rem"
                              size="sm"
                              colorScheme="blue"
                              isLoading={loading}
                            >
                              <SearchIcon />
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      </form>
                    </Box>
                    <Select
                      id="year-filter"
                      name="year-filter"
                      placeholder="Filtrar por ano"
                      value={selectedYear}
                      onChange={handleYearChange}
                      variant="outline"
                      w="200px"
                      size="lg"
                    >
                      {years.map(year => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </Select>
                  </HStack>
                </Box>

                <Routes>
                  <Route
                    path="/"
                    element={
                      <>
                        <Grid
                          templateColumns={{
                            base: '1fr',
                            md: 'repeat(2, 1fr)',
                            lg: 'repeat(3, 1fr)',
                            xl: 'repeat(4, 1fr)',
                          }}
                          gap={4}
                          px={4}
                        >
                          {filteredMovies.map((movie, index) => (
                            <div
                              key={movie.imdbID}
                              ref={index === filteredMovies.length - 1 ? lastMovieElementRef : null}
                            >
                              <MovieCard movie={movie} />
                            </div>
                          ))}
                        </Grid>
                        {loading && (
                          <Center py={8}>
                            <Spinner size="xl" color="blue.400" />
                          </Center>
                        )}
                        {!loading && filteredMovies.length === 0 && (
                          <Center py={8}>
                            <Text color="gray.500">Nenhum filme encontrado</Text>
                          </Center>
                        )}
                      </>
                    }
                  />
                  <Route path="/movie/:id" element={<MovieDetails />} />
                </Routes>
              </VStack>
            </Container>
          </Box>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
