import React from 'react';

const Search = ({setSearch}) => {
  return (
    <div>
      <input type="text" placeholder={'Search...'} onChange={event => setSearch(event.target.value)}/>
    </div>
  )
}

export default Search;