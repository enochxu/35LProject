import React, { useEffect, useState } from "react";
import { Button, InputGroup, FormControl, ButtonGroup } from "react-bootstrap";
import Loading from "./Loading";
import axios from "axios";
import "./index.css";

const Lists = () => {
  useEffect(() => {
    document.title = "Lists";
    axios({
      method: "get",
      url: `http://localhost:5000/getlist`,
      withCredentials: true,
    })
      .then((res) => {
        // allLists = res.data;
        setUsernames(res.data.map((user) => user.username));
        setItems(res.data.map((user) => user.list));
        setLoading(false);
      })
      .catch((err) => {
        setShowError(true);
      });
  }, []);

  const [usernames, setUsernames] = useState([]);
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    setNewItem(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItem) {
      setItems([...items, newItem]);
      setNewItem("");
    }
    e.target.reset();
  };

  const removeItem = (index) => {};

  return (
    <div className="App">
      <header className="App-header">
        <p>To-do List</p>
      </header>
      <div className="list-selector">
        {/* {usernames.map((username, index) => (
          <div key={index}>
            <btn>{username}</btn>
          </div>
        ))} */}
      </div>
      <div className="list">
        {
          loading ? ( <Loading /> ) : (
            <div className="list-items">
              {items[0].map((item, index) => {
                return (
                  <div key={index}>
                    <p>{item}</p>
                  </div>
                );
              })}
            </div>  
          )
        }


        <form onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Type here"
              aria-label="new-item"
              onChange={handleChange}
            />
            <Button variant="primary" type="submit">
              Add to list
            </Button>
          </InputGroup>
        </form>
      </div>
    </div>
  );
};
export default Lists;
