import { useState } from "react";

import "./App.css";
import { SearchResult } from "./types";

const localDatabase = [
  {
    id: 1,
    title: "React Basics",
    description: "Learn the basics of React.",
    link: "https://reactjs.org/docs/getting-started.html",
  },
  {
    id: 2,
    title: "JavaScript Fundamentals",
    description: "Understand core JavaScript concepts.",
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
  },
  {
    id: 3,
    title: "Frontend Optimization",
    description: "Techniques to optimize frontend applications.",
    link: "https://web.dev/learn-performance/",
  },
  {
    id: 4,
    title: "State Management",
    description: "Introduction to managing state in React apps.",
    link: "https://redux.js.org/introduction/getting-started",
  },
  {
    id: 5,
    title: "Search Functionality",
    description: "How to implement search in React.",
    link: "https://www.digitalocean.com/community/tutorials/react-search-bar",
  },
  {
    id: 6,
    title: "CSS Grid Layout",
    description: "Learn to design with CSS Grid.",
    link: "https://css-tricks.com/snippets/css/complete-guide-grid/",
  },
  {
    id: 7,
    title: "Responsive Design",
    description: "Principles of responsive web design.",
    link: "https://www.smashingmagazine.com/2011/01/guidelines-for-responsive-web-design/",
  },
  {
    id: 8,
    title: "TypeScript Basics",
    description: "Getting started with TypeScript.",
    link: "https://www.typescriptlang.org/docs/",
  },
  {
    id: 9,
    title: "Accessibility in Web",
    description: "Best practices for accessible websites.",
    link: "https://www.w3.org/WAI/fundamentals/accessibility-intro/",
  },
  {
    id: 10,
    title: "React Hooks",
    description: "Learn about React Hooks.",
    link: "https://reactjs.org/docs/hooks-intro.html",
  },
  {
    id: 11,
    title: "Webpack Basics",
    description: "Getting started with Webpack.",
    link: "https://webpack.js.org/concepts/",
  },
  {
    id: 12,
    title: "Debugging JavaScript",
    description: "Tips for debugging JavaScript effectively.",
    link: "https://developers.google.com/web/tools/chrome-devtools/javascript",
  },
  {
    id: 13,
    title: "GraphQL Introduction",
    description: "Learn about GraphQL and its benefits.",
    link: "https://graphql.org/learn/",
  },
  {
    id: 14,
    title: "Testing React Apps",
    description: "How to test React applications.",
    link: "https://reactjs.org/docs/testing.html",
  },
  {
    id: 15,
    title: "Node.js Basics",
    description: "Introduction to Node.js.",
    link: "https://nodejs.dev/learn",
  },
  {
    id: 16,
    title: "RESTful API Design",
    description: "Best practices for designing REST APIs.",
    link: "https://restfulapi.net/",
  },
  {
    id: 17,
    title: "Async Programming",
    description: "Understanding asynchronous programming in JavaScript.",
    link: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous",
  },
  {
    id: 18,
    title: "Modern CSS",
    description: "New features in modern CSS.",
    link: "https://web.dev/learn-css/",
  },
  {
    id: 19,
    title: "React Context API",
    description: "Learn about React's Context API.",
    link: "https://reactjs.org/docs/context.html",
  },
  {
    id: 20,
    title: "Version Control with Git",
    description: "Basics of version control using Git.",
    link: "https://git-scm.com/doc",
  },
];

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);

  const handleSearch = () => {
    const lowercasedQuery = query.toLowerCase();
    const filteredResults = localDatabase.filter(
      (item) =>
        item.title.toLowerCase().includes(lowercasedQuery) ||
        item.description.toLowerCase().includes(lowercasedQuery)
    );
    setResults(filteredResults);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleAutocomplete = (input: string) => {
    if (input === "") {
      setSuggestions([]);
      return;
    }

    const lowercasedQuery = input.toLowerCase();
    const filteredResults = localDatabase.filter(
      (item) =>
        item.title.toLowerCase().startsWith(lowercasedQuery) ||
        item.description.toLowerCase().startsWith(lowercasedQuery)
    );

    setSuggestions(filteredResults);
  };

  const handleSuggestionClick = (suggestion: SearchResult) => {
    setQuery(suggestion.title);
    handleSearch();
  };

  return (
    <>
      <h1>Search X</h1>
      {/** autocomplete */}
      <div
        style={{ display: "flex", flexDirection: "column", minWidth: "400px" }}
      >
        <input
          autoFocus // autofocus on mount
          type="text"
          value={query}
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);
            handleAutocomplete(value);
          }}
          onKeyDown={handleKeyDown}
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
            height: "250px",
            overflowY: "scroll",
            width: "100%",
            marginTop: "10px",
            textAlign: "left",
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
                }}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <span>{suggestion.title.slice(0, query.length)}</span>
                <strong>{suggestion.title.slice(query.length)}</strong>
              </div>
            ))}
        </div>
      </div>
      {/** results */}
    </>
  );
}

export default App;
