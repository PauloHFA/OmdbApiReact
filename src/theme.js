import { extendTheme } from '@chakra-ui/react'

// Configuração do tema com modo escuro forçado
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

// Cores do tema
const colors = {
  brand: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#2196F3',
    600: '#1E88E5',
    700: '#1976D2',
    800: '#1565C0',
    900: '#0D47A1',
  },
}

// Estilos globais
const styles = {
  global: (props) => ({
    body: {
      bg: props.colorMode === 'dark' ? 'gray.900' : 'white',
      color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      transition: 'all 0.2s ease-in-out',
    },
    '*': {
      borderColor: props.colorMode === 'dark' ? 'gray.700' : 'gray.200',
      transition: 'all 0.2s ease-in-out',
    },
  }),
}

// Componentes
const components = {
  Button: {
    baseStyle: {
      fontWeight: 'bold',
      borderRadius: 'md',
    },
    variants: {
      solid: (props) => ({
        bg: props.colorMode === 'dark' ? 'brand.500' : 'brand.600',
        color: 'white',
        _hover: {
          bg: props.colorMode === 'dark' ? 'brand.600' : 'brand.700',
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        },
      }),
      outline: (props) => ({
        color: props.colorMode === 'dark' ? 'blue.400' : 'blue.600',
        borderColor: props.colorMode === 'dark' ? 'blue.400' : 'blue.600',
        _hover: {
          bg: props.colorMode === 'dark' ? 'whiteAlpha.200' : 'blackAlpha.100',
          transform: 'translateY(-2px)',
          boxShadow: 'md',
        },
      }),
    },
  },
  Card: {
    baseStyle: (props) => ({
      bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
      borderRadius: 'lg',
      boxShadow: 'lg',
      transition: 'all 0.2s ease-in-out',
      _hover: {
        transform: 'translateY(-4px)',
        boxShadow: 'xl',
      },
    }),
  },
  Input: {
    variants: {
      outline: (props) => ({
        field: {
          bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
          borderColor: props.colorMode === 'dark' ? 'gray.600' : 'gray.300',
          color: props.colorMode === 'dark' ? 'white' : 'gray.800',
          _hover: {
            borderColor: props.colorMode === 'dark' ? 'blue.400' : 'blue.500',
          },
          _focus: {
            borderColor: props.colorMode === 'dark' ? 'blue.400' : 'blue.500',
            boxShadow: `0 0 0 1px ${props.colorMode === 'dark' ? 'blue.400' : 'blue.500'}`,
          },
        },
      }),
      filled: (props) => ({
        field: {
          bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.50',
          borderColor: props.colorMode === 'dark' ? 'gray.600' : 'gray.300',
          color: props.colorMode === 'dark' ? 'white' : 'gray.800',
          _hover: {
            bg: props.colorMode === 'dark' ? 'gray.700' : 'gray.100',
          },
          _focus: {
            bg: props.colorMode === 'dark' ? 'gray.700' : 'gray.100',
            borderColor: props.colorMode === 'dark' ? 'blue.400' : 'blue.500',
          },
        },
      }),
    },
  },
  Select: {
    variants: {
      outline: (props) => ({
        field: {
          bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
          borderColor: props.colorMode === 'dark' ? 'gray.600' : 'gray.300',
          color: props.colorMode === 'dark' ? 'white' : 'gray.800',
          _hover: {
            borderColor: props.colorMode === 'dark' ? 'blue.400' : 'blue.500',
          },
          _focus: {
            borderColor: props.colorMode === 'dark' ? 'blue.400' : 'blue.500',
            boxShadow: `0 0 0 1px ${props.colorMode === 'dark' ? 'blue.400' : 'blue.500'}`,
          },
        },
      }),
      filled: (props) => ({
        field: {
          bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.50',
          borderColor: props.colorMode === 'dark' ? 'gray.600' : 'gray.300',
          color: props.colorMode === 'dark' ? 'white' : 'gray.800',
          _hover: {
            bg: props.colorMode === 'dark' ? 'gray.700' : 'gray.100',
          },
          _focus: {
            bg: props.colorMode === 'dark' ? 'gray.700' : 'gray.100',
            borderColor: props.colorMode === 'dark' ? 'blue.400' : 'blue.500',
          },
        },
      }),
    },
  },
  Container: {
    baseStyle: (props) => ({
      bg: props.colorMode === 'dark' ? 'gray.900' : 'white',
    }),
  },
  Box: {
    baseStyle: (props) => ({
      bg: props.colorMode === 'dark' ? 'gray.900' : 'white',
    }),
  },
}

// Exporta o tema
export const theme = extendTheme({
  config,
  colors,
  styles,
  components,
}) 