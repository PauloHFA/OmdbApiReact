import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ColorModeScript } from '@chakra-ui/react';
import { theme } from './theme.js';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </React.StrictMode>
);
