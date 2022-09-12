import { useState } from 'react';
import './Search.css';
import searchImg from '../assets/search.png'

const Search = (props) => {
    const [search, setSearch] = useState("");
    return (
        <div className='search'>
            <label>이름 검색: 
            <input
            className='searchBox'
            type='text'
            id='search'
            placeholder='검색어 입력'>
            </input>
            </label>
            <img className='searchImg' src={searchImg} />
        </div>
    );
};

export default Search;