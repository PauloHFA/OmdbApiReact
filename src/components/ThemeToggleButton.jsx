import { Button, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const ThemeToggleButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  
  return (
    <Button
      onClick={toggleColorMode}
      leftIcon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      bg={colorMode === 'light' ? 'white' : 'gray.800'}
      color={colorMode === 'light' ? 'blue.600' : 'blue.400'}
      _hover={{
        bg: colorMode === 'light' ? 'gray.100' : 'gray.700',
        transform: 'scale(1.05)',
      }}
      _active={{
        transform: 'scale(0.95)',
      }}
      transition="all 0.2s"
      shadow="md"
      size="md"
    >
      {colorMode === 'light' ? 'Modo Escuro' : 'Modo Claro'}
    </Button>
  );
};

export default ThemeToggleButton; 