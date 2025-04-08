import { Box, Image, Text, VStack, HStack, Badge, Divider, Grid, useColorModeValue, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../services/api';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const bgColor = useColorModeValue('gray.800', 'gray.700');
  const textColor = useColorModeValue('white', 'gray.200');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <Text color={textColor}>Loading...</Text>;
  }

  if (!movie) {
    return <Text color={textColor}>Movie not found</Text>;
  }

  return (
    <Box maxW="1200px" mx="auto" p={6}>
      <Button 
        mb={4} 
        colorScheme="blue" 
        variant="outline" 
        onClick={() => navigate(-1)}
        _hover={{ bg: 'blue.500', color: 'white' }}
      >
        Voltar
      </Button>
      <Grid templateColumns={{ base: '1fr', md: '300px 1fr' }} gap={6}>
        <Box>
          <Image
            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}
            alt={movie.Title}
            borderRadius="lg"
            fallbackSrc="https://via.placeholder.com/300x450"
          />
        </Box>
        <VStack align="start" spacing={4} color={textColor}>
          <Text fontSize="3xl" fontWeight="bold" color="blue.400">
            {movie.Title}
          </Text>
          <HStack spacing={2}>
            <Badge colorScheme="blue" variant="subtle">{movie.Year}</Badge>
            <Badge colorScheme="green" variant="subtle">{movie.Rated}</Badge>
            <Badge colorScheme="purple" variant="subtle">{movie.Runtime}</Badge>
          </HStack>
          <Text color="gray.400">{movie.Plot}</Text>
          <Divider borderColor="gray.600" />
          <VStack align="start" spacing={2}>
            <Text><strong>Director:</strong> {movie.Director}</Text>
            <Text><strong>Writer:</strong> {movie.Writer}</Text>
            <Text><strong>Actors:</strong> {movie.Actors}</Text>
            <Text><strong>Genre:</strong> {movie.Genre}</Text>
            <Text><strong>Language:</strong> {movie.Language}</Text>
            <Text><strong>Country:</strong> {movie.Country}</Text>
            <Text><strong>Awards:</strong> {movie.Awards}</Text>
          </VStack>
          <Divider borderColor="gray.600" />
          <HStack spacing={4}>
            {movie.Ratings.map((rating, index) => (
              <Box key={index} textAlign="center" bg={bgColor} p={4} borderRadius="md">
                <Text fontWeight="bold" color="blue.400">{rating.Source}</Text>
                <Text>{rating.Value}</Text>
              </Box>
            ))}
          </HStack>
        </VStack>
      </Grid>
    </Box>
  );
};

export default MovieDetails; 