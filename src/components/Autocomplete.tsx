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
    searchHistory,
    addToSearchHistory,
    removeFromSearchHistory,
  } = useSearchContext();
  const [localQuery, setLocalQuery] = useState(query);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch(localQuery);
    }
  };

  const handleSuggestionClick = (suggestion: SearchResult) => {
    addToSearchHistory(suggestion.id);
    handleSearch(suggestion.title);
    setLocalQuery(suggestion.title);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minWidth: "400px",
        maxWidth: "500px",
        position: "relative",
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
          position: "absolute",
          top: 50,
          left: 0,
          zIndex: showSuggestions ? 1000 : -10,
          opacity: showSuggestions ? 1 : 0,
          pointerEvents: showSuggestions ? "all" : "none",
          backgroundColor: "#333",
          borderRadius: "5px",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
        }}
      >
        {suggestions.length > 0 &&
          suggestions.map((suggestion, idx) => (
            <div
              key={`suggestion-${idx}`}
              className={`suggestion-item ${
                searchHistory.has(suggestion.id) ? "searched" : ""
              }`}
              style={{
                padding: "5px",
                color: "#fff",
                borderBottom:
                  idx !== suggestions.length - 1 ? "1px solid grey" : "none",
                cursor: "pointer",
                pointerEvents: "all",
                position: "relative",
              }}
            >
              <div
                onClick={() => handleSuggestionClick(suggestion)}
                style={{ display: "flex", alignItems: "center" }}
              >
                <span>{suggestion.title.slice(0, localQuery.length)}</span>
                <strong>{suggestion.title.slice(localQuery.length)}</strong>
              </div>
              {searchHistory.has(suggestion.id) && (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the suggestion click
                    removeFromSearchHistory(suggestion.id);
                  }}
                  className="remove-button"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "#fff",
                    cursor: "pointer",
                    position: "absolute",
                    right: "5px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10000,
                  }}
                >
                  x
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
