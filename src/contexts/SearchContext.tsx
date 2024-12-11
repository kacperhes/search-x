import { createContext, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SearchResult } from "../types";
import localDatabase from "../data/results.json";

interface SearchContextType {
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult[];
  setResults: (results: SearchResult[]) => void;
  suggestions: SearchResult[];
  setSuggestions: (suggestions: SearchResult[]) => void;
  handleAutocomplete: (query: string) => void;
  handleSearch: (query: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearchContext = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};

export const SearchProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);

  const handleAutocomplete = useCallback((input: string) => {
    const inputParsed = input.toLowerCase();

    if (inputParsed === "") {
      setSuggestions([]);
      return;
    }

    const filteredResults = localDatabase
      .filter(
        (item) =>
          item.title.toLowerCase().startsWith(inputParsed) ||
          item.description.toLowerCase().startsWith(inputParsed)
      )
      .slice(0, 10);

    setSuggestions(filteredResults);
  }, []);

  const handleSearch = (query: string) => {
    const queryParsed = query.toLowerCase();
    const filteredResults = localDatabase.filter(
      (item) =>
        item.title.toLowerCase().includes(queryParsed) ||
        item.description.toLowerCase().includes(queryParsed)
    );
    setQuery(query);
    setResults(filteredResults);
    navigate(`/search?query=${queryParsed}`);
  }

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        results,
        setResults,
        suggestions,
        setSuggestions,
        handleAutocomplete,
        handleSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
