import React, {ChangeEvent, KeyboardEvent, useState} from "react";

import {IconButton, InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import {getUrlParam, updateUrlParams} from "utils/utils";

interface SearchBarProps {
    onSearch: (keyword: string) => void;
    onClear: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({onSearch, onClear}) => {
    const keywordParam = getUrlParam("keyword");
    const [keyword, setKeyword] = useState(keywordParam || "");

    const handleSearch = () => {
        onSearch(keyword);
        updateUrlParams({
                            keyword,
                            page: "1"
                        });
    };

    const handleClear = () => {
        onClear();
        setKeyword("");
        updateUrlParams({
                            keyword: null,
                            page: "1"
                        });
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch();
        } else if (event.key === "Escape") {
            handleClear();
        }

    };
    return (
            <TextField
                    value={keyword}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Search"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                        endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleSearch} aria-label="Search">
                                        <SearchIcon/>
                                    </IconButton>
                                    {keyword && (
                                            <IconButton onClick={handleClear} aria-label="Clear">
                                                <ClearIcon/>
                                            </IconButton>
                                    )}
                                </InputAdornment>
                        ),
                    }}
            />
    );
};

export default SearchBar;
