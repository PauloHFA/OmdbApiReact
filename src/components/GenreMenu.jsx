import { Box, VStack, Button, Text, useColorModeValue, IconButton, Collapse, useDisclosure, Flex } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const genres = [
  'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 
  'Documentary', 'Drama', 'Family', 'Fantasy', 'Film-Noir', 'History', 
  'Horror', 'Music', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 
  'Sport', 'Thriller', 'War', 'Western'
];

const GenreMenu = ({ selectedGenre, onSelectGenre }) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
  const bgColor = useColorModeValue('gray.800', 'gray.700');
  const hoverBg = useColorModeValue('gray.700', 'gray.600');
  const activeBg = useColorModeValue('blue.600', 'blue.500');

  return (
    <>
      <Box
        position="fixed"
        left={0}
        top={0}
        h="100vh"
        w={isOpen ? "250px" : "60px"}
        bg={bgColor}
        transition="width 0.3s ease"
        zIndex={1000}
        boxShadow="2xl"
      >
        <Flex direction="column" h="100%">
          <Flex justify={isOpen ? "space-between" : "center"} align="center" p={4} borderBottom="1px" borderColor="gray.600">
            {isOpen && (
              <Text fontSize="xl" fontWeight="bold" color="blue.400">
                Gêneros
              </Text>
            )}
            <IconButton
              icon={isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              onClick={onToggle}
              variant="ghost"
              color="blue.400"
              _hover={{ bg: hoverBg }}
              aria-label={isOpen ? "Collapse menu" : "Expand menu"}
              size="sm"
            />
          </Flex>

          <Box overflowY="auto" flex="1">
            <Collapse in={isOpen} animateOpacity>
              <VStack spacing={2} align="stretch" p={4}>
                {genres.map((genre) => (
                  <Button
                    key={genre}
                    variant="ghost"
                    justifyContent="flex-start"
                    color={selectedGenre === genre ? 'white' : 'blue.400'}
                    colorScheme="blue"
                    bg={selectedGenre === genre ? activeBg : 'transparent'}
                    _hover={{ 
                      bg: selectedGenre === genre ? activeBg : hoverBg,
                      color: 'white',
                      transform: 'translateX(5px)',
                    }}
                    transition="all 0.2s"
                    leftIcon={
                      <Box
                        w="2px"
                        h="20px"
                        bg={selectedGenre === genre ? 'white' : 'blue.400'}
                        mr={2}
                      />
                    }
                    onClick={() => onSelectGenre(genre)}
                  >
                    {genre}
                  </Button>
                ))}
              </VStack>
            </Collapse>
          </Box>
        </Flex>
      </Box>
      <Box
        position="fixed"
        left={0}
        top={0}
        w="100%"
        h="100vh"
        bg="blackAlpha.400"
        zIndex={900}
        display={{ base: isOpen ? "block" : "none", md: "none" }}
        onClick={onToggle}
      />
    </>
  );
};

export default GenreMenu; 