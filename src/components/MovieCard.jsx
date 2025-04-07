import { Box, Image, Text, VStack, Badge, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const bgColor = useColorModeValue('gray.800', 'gray.700');
  const textColor = useColorModeValue('white', 'gray.200');

  return (
    <Link to={`/movie/${movie.imdbID}`}>
      <Box
        h="100%"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg={bgColor}
        _hover={{ transform: 'scale(1.02)', transition: 'transform 0.2s', boxShadow: '0 0 20px rgba(66, 153, 225, 0.5)' }}
      >
        <Image
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}
          alt={movie.Title}
          objectFit="cover"
          height="400px"
          width="100%"
          fallbackSrc="https://via.placeholder.com/300x450"
        />

        <VStack p={4} align="start" spacing={2}>
          <Text fontWeight="bold" fontSize="lg" noOfLines={1} color={textColor}>
            {movie.Title}
          </Text>
          <Text color="blue.400" fontSize="sm">
            {movie.Year}
          </Text>
          <Badge colorScheme="blue" variant="subtle">
            {movie.Type}
          </Badge>
        </VStack>
      </Box>
    </Link>
  );
};

export default MovieCard; 