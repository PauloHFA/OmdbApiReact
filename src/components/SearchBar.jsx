import { Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup size="lg" maxW="600px" mx="auto">
        <Input
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          borderRadius="full"
          bg="white"
          boxShadow="md"
        />
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            size="sm"
            type="submit"
            colorScheme="blue"
            borderRadius="full"
          >
            <SearchIcon />
          </Button>
        </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default SearchBar; 