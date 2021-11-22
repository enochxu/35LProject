import React, { useEffect, useState } from 'react';
import { Button, InputGroup, FormControl } from "react-bootstrap";
import './index.css';

const Lists = () => {
    useEffect(() => {
        document.title = 'Lists';
    });
    const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  const handleChange = (e) => {
    setNewItem(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItem) {
      setItems([...items, newItem]);
      setNewItem("");
    }
    e.target.reset();
  }

  const removeItem = (index) => {

  }


    return(   
        <div className="App">
      <header className="App-header">
        <p>To-do List</p>
      </header>
      <div className="list">
        <div className='list-items'>
        {/* add remove itme button */}
          {
            items.map((item, index) => {
              return (
                <div key={index}>
                  <p>{item}</p>
                </div>
              )
            })
          }
        </div>

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
    
}
export default Lists;

