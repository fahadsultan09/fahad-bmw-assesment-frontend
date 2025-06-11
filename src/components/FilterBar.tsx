import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

const FilterBar: React.FC<FilterBarProps> = ({ value, onChange }) => {
    return (
        <FormControl sx={{ minWidth: 160 }}>
            <InputLabel id="demo-simple-select-helper-label">Filter By</InputLabel>
            <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={value}
                label="Filter By"
                onChange={onChange}
            >
                {/* <MenuItem value="">
                            <em>Any</em>
                        </MenuItem> */}
                <MenuItem value={"Brand"}>Brand</MenuItem>
                <MenuItem value={"Model"}>Model</MenuItem>
                <MenuItem value={"Seats"}>Seats</MenuItem>
                <MenuItem value={"Date"}>Date</MenuItem>
            </Select>
        </FormControl>

    );
};

interface FilterBarProps {
    value: string;
    onChange: (event: SelectChangeEvent) => void;
}

export default FilterBar;
