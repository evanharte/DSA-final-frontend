import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import photo from "./media/santa.webp";

function App() {
  const [numbers, setNumbers] = useState("");
  const [tree, setTree] = useState(null);
  const [error, setError] = useState("");

  const fetchData = () => {
    const numbersArray = numbers
      .split(",")
      .map((num) => parseInt(num.trim(), 10));

    axios
      .post("http://localhost:8080/api/create-tree", numbersArray)
      .then((response) => {
        const treeData = response.data;
        setTree(treeData);
        setError("");
      })
      .catch((error) => {
        setError("There was an error fetching the data.");
        console.error("There was an error!", error);
      });
  };

  return (
    <div className="App">
      <div className="nav">
        <div>
          <img src={photo} />
        </div>
        <div>
          <h1>DSA Final Project</h1>
          <h2>Binary Search (Christmas) Tree</h2>
          <input
            type="text"
            value={numbers}
            onChange={(e) => setNumbers(e.target.value)}
            placeholder="Enter numbers separated by commas"
          />
          <button onClick={fetchData}>Submit</button>
          {error && <p>{error}</p>}
          <div>
            <h3>Tree Structure:</h3>
          </div>
        </div>
        <div>
          <img src={photo} />
        </div>
      </div>
      <pre className="body">
        {tree ? JSON.stringify(tree, null, 4) : "No data to display"}
      </pre>
    </div>
  );
}

export default App;
