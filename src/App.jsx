import { ChakraProvider, Container, Grid, Heading, VStack, Box, extendTheme, Button, Input, InputGroup, InputRightElement, useColorMode, Spinner, Center, useDisclosure, Text } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import MovieCard from './components/MovieCard';
import MovieDetails from './components/MovieDetails';
import GenreMenu from './components/GenreMenu';
import { searchMovies } from './services/api';
import { SearchIcon } from '@chakra-ui/icons';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'white',
        minHeight: '100vh',
        margin: 0,
        padding: 0,
      },
    },
  },
});

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen } = useDisclosure({ defaultIsOpen: true });
  const observer = useRef();
  const currentQuery = useRef('2024');

  const lastMovieElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

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

  const loadPopularMovies = async () => {
    setLoading(true);
    currentQuery.current = '2024';
    try {
      const data = await searchMovies('2024', 1);
      if (data.Response === 'True') {
        setMovies(data.Search);
        setHasMore(data.totalResults > data.Search.length);
      }
    } catch (error) {
      console.error('Error loading movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreMovies = async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      const data = await searchMovies(currentQuery.current, page);
      if (data.Response === 'True') {
        setMovies(prevMovies => {
          // Filter out duplicates based on imdbID
          const newMovies = data.Search.filter(newMovie => 
            !prevMovies.some(existingMovie => existingMovie.imdbID === newMovie.imdbID)
          );
          return [...prevMovies, ...newMovies];
        });
        setHasMore(data.totalResults > movies.length + data.Search.length);
      }
    } catch (error) {
      console.error('Error loading more movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query, isGenreSearch = false) => {
    setLoading(true);
    setIsSearching(true);
    setPage(1);
    setHasMore(true);
    currentQuery.current = query;

    try {
      const data = await searchMovies(query, 1);
      if (data.Response === 'True') {
        setMovies(data.Search);
        setHasMore(data.totalResults > data.Search.length);
      } else {
        setMovies([]);
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
      loadPopularMovies();
    } else {
      setSelectedGenre(genre);
      setSearchQuery('');
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      handleSearch(searchQuery);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box minH="100vh" bg="gray.900">
          <GenreMenu selectedGenre={selectedGenre} onSelectGenre={handleGenreSelect} />
          <Box
            ml={isOpen ? "250px" : "60px"}
            transition="margin-left 0.3s ease"
            minH="100vh"
            bg="gray.900"
          >
            <Container maxW="100%" px={4} py={4}>
              <VStack spacing={4} align="stretch">
                <Box display="flex" justifyContent="space-between" alignItems="center" px={4}>
                  <Heading as="h1" size="xl" color="blue.400">
                    Filmes IMDB API
                  </Heading>
                  <Button onClick={toggleColorMode} colorScheme="blue" variant="outline">
                    {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
                  </Button>
                </Box>

                <Box px={4}>
                  <form onSubmit={handleSearchSubmit}>
                    <InputGroup size="lg">
                      <Input
                        placeholder="Buscar filmes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        bg="gray.800"
                        borderColor="blue.500"
                        _hover={{ borderColor: 'blue.400' }}
                        _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px blue.400' }}
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
                          {movies.map((movie, index) => (
                            <div
                              key={movie.imdbID}
                              ref={index === movies.length - 1 ? lastMovieElementRef : null}
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
                        {!loading && movies.length === 0 && (
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
