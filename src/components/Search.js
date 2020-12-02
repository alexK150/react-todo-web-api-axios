import React from 'react';

export const Search = ({setSearch}) => {
  return (
    <div>
      <input type="text" placeholder={'Search...'} onChange={event => setSearch(event.target.value)}/>
    </div>
  )
}
