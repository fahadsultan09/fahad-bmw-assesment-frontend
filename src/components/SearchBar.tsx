import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch }) => {
    return (
        <TextField
            fullWidth
            label="Search"
            variant="outlined"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search by filter..."
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={onSearch}>
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onSearch: () => void;
}

export default SearchBar;
