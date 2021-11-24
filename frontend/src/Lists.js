import React, { useEffect, useState } from 'react';
import { Button, InputGroup, FormControl } from "react-bootstrap";
import './index.css';

var TodoLine = function(date, info) {
  this.date = date;
  this.info = info;
}

TodoLine.prototype.getString = function() {
  return (this.date + " " + this.info);
}

const Lists = () => {
    useEffect(() => {
        document.title = 'Lists';
    });
    const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState(new TodoLine(Date(), ""));

  const handleChange = (e) => {
    setNewItem(new TodoLine(Date(), e.target.value));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItem) {
      setItems([...items, newItem]);
      setNewItem(new TodoLine(Date(), ""));
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
                  <p>
		    {item.info}
                    <small><details>{item.date}</details></small>
                  </p>
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

