import React from 'react'
import ReactSearchField from "react-search-field";

export default function SearchBar() {
  return (
    <ReactSearchField
      placeholder="Search..."
      onSearch={(value) => console.log(value)}
      classNames="search-bar"
    />
  );
}
