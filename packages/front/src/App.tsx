import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { salut, Person, trucInutile } from "@paralogs/shared";

const App: React.FC = () => {
  const person: Person = {
    firstName: "John",
    age: 25,
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React 123
        </a>
        <p>THIS MESSAGE MESSAGE : {salut(person.firstName)}</p>
      </header>
    </div>
  );
};

export default App;
