import { useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { SearchResult } from "../types";

export default function Autocomplete() {
  const {
    query,
    suggestions,
    handleSearch,
    handleAutocomplete,
    setShowSuggestions,
    showSuggestions,
  } = useSearchContext();
  const [localQuery, setLocalQuery] = useState(query);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch(localQuery);
    }
  };

  const handleSuggestionClick = (suggestion: SearchResult) => {
    handleSearch(suggestion.title);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minWidth: "400px",
      }}
    >
      <input
        autoFocus // autofocus on mount
        type="text"
        value={localQuery}
        onChange={(e) => {
          const value = e.target.value;
          setLocalQuery(value);
          handleAutocomplete(value);
        }}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setShowSuggestions(false)}
        style={{
          width: "100%",
          height: "30px",
          borderRadius: "15px",
          padding: "5px",
        }}
        placeholder="Search..."
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "250px",
          overflowY: "scroll",
          width: "100%",
          marginTop: "10px",
          textAlign: "left",
          zIndex: 1000,
        }}
      >
        {suggestions.length > 0 &&
          suggestions.map((suggestion, idx) => (
            <div
              key={`suggestion-${idx}`}
              className="suggestion-item"
              style={{
                padding: "5px",
                color: "#fff",
                borderBottom: "1px solid grey",
                cursor: "pointer",
                zIndex: 10000,
                opacity: showSuggestions ? 1 : 0,
              }}
              onClick={(e) => {
                console.log(e);
                handleSuggestionClick(suggestion);
              }}
            >
              <span>{suggestion.title.slice(0, localQuery.length)}</span>
              <strong>{suggestion.title.slice(localQuery.length)}</strong>
            </div>
          ))}
      </div>
    </div>
  );
}
