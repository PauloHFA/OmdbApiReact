import { Box, Image, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const yearColor = useColorModeValue('blue.600', 'blue.400');
  const shadowColor = useColorModeValue('rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.4)');

  return (
    <Link to={`/movie/${movie.imdbID}`}>
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg={bgColor}
        transition="all 0.3s"
        _hover={{
          transform: 'translateY(-4px)',
          shadow: `0 12px 24px ${shadowColor}`,
          bg: hoverBg,
        }}
        color={textColor}
      >
        <Image
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}
          alt={movie.Title}
          width="100%"
          height="400px"
          objectFit="cover"
          fallbackSrc="https://via.placeholder.com/300x450"
        />

        <VStack p={4} align="start" spacing={2}>
          <Text
            fontSize="xl"
            fontWeight="semibold"
            lineHeight="tight"
            noOfLines={2}
          >
            {movie.Title}
          </Text>
          <Text color={yearColor} fontSize="md">
            {movie.Year}
          </Text>
        </VStack>
      </Box>
    </Link>
  );
};

export default MovieCard; 