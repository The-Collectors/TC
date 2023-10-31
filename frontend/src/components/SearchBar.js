//Search Bar is a tool for creating right design that holds input text for searching.

//import styled from 'styled-components'
import { CenteredInput } from './CommonStyling';

const SearchBar = ({keyword, onChange}) => {
    return (
        <CenteredInput
			placeholder='Type something to search!'
            value = {keyword}
            onChange = {(e) => onChange(e.target.value)}
        />
    );
}

export default SearchBar;

// >>styles are written here<<

