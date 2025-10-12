import { useState } from "react";

export default function Search({ onSearch = () => {} }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery.trim());
    setSearchQuery("");
  };

  return (
    <form className="navbar-search" onSubmit={handleSubmit}>
      <div className = "search-input">
      <input
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit">Search</button>
      </div>
    </form>
  );
}
