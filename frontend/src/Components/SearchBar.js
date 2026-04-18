import React from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <InputGroup className="search-input-group mb-4">
      <InputGroup.Text>
        <FaSearch />
      </InputGroup.Text>
      <Form.Control
        type="text"
        placeholder="Search menu items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <Button variant="link" onClick={() => setSearchTerm('')}>
          Clear
        </Button>
      )}
    </InputGroup>
  );
};

export default SearchBar;