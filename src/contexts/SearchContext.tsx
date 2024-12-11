import { createContext, useCallback, useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { SearchResult } from "../types";
import localDatabase from "../data/results.json";

interface SearchContextType {
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult[];
  setResults: (results: SearchResult[]) => void;
  suggestions: SearchResult[];
  showSuggestions: boolean;
  searchHistory: Set<number>;
  setShowSuggestions: (showSuggestions: boolean) => void;
  setSuggestions: (suggestions: SearchResult[]) => void;
  handleAutocomplete: (query: string) => void;
  handleSearch: (query: string) => void;
  addToSearchHistory: (id: number) => void;
  removeFromSearchHistory: (id: number) => void;
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
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState<Set<number>>(new Set());

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
    setShowSuggestions(true);
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
  };

  const addToSearchHistory = (id: number) => {
    setSearchHistory((prevHistory) => new Set(prevHistory).add(id));
  };

  const removeFromSearchHistory = (id: number) => {
    setSearchHistory((prevHistory) => {
      const newHistory = new Set(prevHistory);
      newHistory.delete(id);
      return newHistory;
    });
  };

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
        showSuggestions,
        setShowSuggestions,
        searchHistory,
        addToSearchHistory,
        removeFromSearchHistory,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
