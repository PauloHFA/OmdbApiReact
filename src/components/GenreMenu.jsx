import { Box, VStack, Button, Text, IconButton, Collapse, useDisclosure, Flex, useColorModeValue } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const genres = [
  'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 
  'Documentary', 'Drama', 'Family', 'Fantasy', 'Film-Noir', 'History', 
  'Horror', 'Music', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 
  'Sport', 'Thriller', 'War', 'Western'
];

const GenreMenu = ({ selectedGenre, onSelectGenre }) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');
  const accentColor = useColorModeValue('blue.600', 'blue.400');
  const selectedBg = useColorModeValue('blue.500', 'blue.600');
  const selectedHoverBg = useColorModeValue('blue.600', 'blue.700');

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
        boxShadow="lg"
        borderRight="1px"
        borderColor={borderColor}
      >
        <Flex direction="column" h="100%">
          <Flex 
            justify="space-between"
            align="center" 
            p={4} 
            borderBottom="1px" 
            borderColor={borderColor}
            bg={bgColor}
          >
            {isOpen && (
              <Text fontSize="xl" fontWeight="bold" color={accentColor}>
                Gêneros
              </Text>
            )}
            <IconButton
              icon={isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              onClick={onToggle}
              variant="ghost"
              color={accentColor}
              _hover={{ bg: hoverBg }}
              aria-label={isOpen ? "Collapse menu" : "Expand menu"}
              size="sm"
            />
          </Flex>

          <Box overflowY="auto" flex="1" bg={bgColor} pt={2}>
            <Collapse in={isOpen} animateOpacity>
              <VStack spacing={2} align="stretch" px={4}>
                {genres.map((genre) => (
                  <Button
                    key={genre}
                    variant="ghost"
                    justifyContent="flex-start"
                    color={selectedGenre === genre ? 'white' : accentColor}
                    bg={selectedGenre === genre ? selectedBg : 'transparent'}
                    _hover={{ 
                      bg: selectedGenre === genre ? selectedHoverBg : hoverBg,
                      color: selectedGenre === genre ? 'white' : accentColor,
                      transform: 'translateX(5px)',
                    }}
                    transition="all 0.2s"
                    leftIcon={
                      <Box
                        w="2px"
                        h="20px"
                        bg={selectedGenre === genre ? 'white' : accentColor}
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
        bg="blackAlpha.600"
        zIndex={900}
        display={{ base: isOpen ? "block" : "none", md: "none" }}
        onClick={onToggle}
      />
    </>
  );
};

export default GenreMenu; 