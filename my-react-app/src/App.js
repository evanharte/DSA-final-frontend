import React, { useState } from "react";
import axiosInstance from "./axiosInstance";
import "./App.css";
import photo from "./media/santa.webp";

function App() {
  const [numbers, setNumbers] = useState("");
  const [tree, setTree] = useState(null);
  const [previousTrees, setPreviousTrees] = useState([]);
  const [error, setError] = useState("");

  const fetchData = () => {
    const numbersArray = numbers
      .split(",")
      .map((num) => parseInt(num.trim(), 10));

    axiosInstance
      .post("/create-tree", numbersArray)
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

  const fetchPreviousTrees = () => {
    axiosInstance
      .get("/previous-trees")
      .then((response) => {
        setPreviousTrees(response.data);
        setError("");
      })
      .catch((error) => {
        setError("There was an error fetching the previous trees.");
        console.error("There was an error!", error);
      });
  };

  return (
    <div className="App">
      <div className="nav">
        <div>
          <img src={photo} alt="Tree Photo" />
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
          <img src={photo} alt="Tree Photo" />
        </div>
      </div>
      <pre className="body">
        {tree ? JSON.stringify(tree, null, 4) : "No data to display"}
      </pre>
      <div className="previous-trees">
        <button onClick={fetchPreviousTrees}>Fetch Previous Trees</button>
        <div>
          <h3>Previous Trees:</h3>
          {previousTrees.length > 0 ? (
            previousTrees.map((tree, index) => (
              <div key={index}>
                <h4>Tree {index + 1}</h4>
                <p>Input Numbers: {tree.inputNumbers.join(", ")}</p>
                <pre>
                  {JSON.stringify(JSON.parse(tree.treeStructure), null, 4)}
                </pre>
              </div>
            ))
          ) : (
            <p>No previous trees to display</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
