import React, { useEffect, useState } from "react";
import { Button, InputGroup, FormControl, Alert, Form } from "react-bootstrap";
import Loading from "./Loading";
import axios from "axios";
import "./index.css";
import "./lists.css"

const Lists = ({checkLogin}) => {
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
  const [listNum, setListNum] = useState(0);
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  // Design of filterItem
  // Should never be null, should always be string length 0+
  // Therefore listing items that have substring of filterItem
  // Should list all items, not no items
  const [filterItem, setFilterItem] = useState("");

  const handleSelector = (e) => {
    setListNum(e.target.value);
  }

  const handleChange = (e) => {
    //console.log(e.target.value + "" + typeof(e.target.value));
    const currTime = new Date(); // Garbage collected
    // console.log(currTime.toDateString());
    const [hour, minutes, seconds] = [currTime.getHours(), currTime.getMinutes(), currTime.getSeconds()];
    const newItemWithDate = e.target.value + " (Time/Date: " + hour + ":" + minutes + " / " + currTime.toDateString() + ")";
    if (e.target.value != "") {
      setNewItem(newItemWithDate);
    } else {
      setNewItem("");
    }
  };

  const handleFilterChange = (e) => {
    setFilterItem(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (listNum == 0 && newItem) {
      axios({
        method: "post",
        url: `http://localhost:5000/additem`,
        data: {
          item: (newItem),
        },
        withCredentials: true,
      })
        .then((res) => {
          const newItems = items;
          // console.log(currTime.toDateString());
          newItems[listNum].push(newItem);
          setItems(newItems);
	  setNewItem(""); 
        })
        .catch((err) => {
	  // console.log("error");
          setShowError(true);
        });
    }
    e.target.reset();
  };

  // Filter versus search function,
  // filter means no need to press enter
  // const handleFilterSubmit = (e) => {
    // setFilterItem("");
  // };

  // const removeItem = (index) => {};

  const logout = () => {
    axios({
      method: "post",
      url: `http://localhost:5000/logout`,
      withCredentials: true,
    })
    .then((res) => {
      checkLogin();
    })
    .catch((err) => {
      console.log(err);
    }); 
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>To-do List</p>
        <Button variant="danger" size="sm" onClick={logout}>
          Logout
        </Button>
      </header>
      <div className="App-body">
        <div className="export">
          {/* NEED TO CHANGE THE FUNCTION INSIDE */}
          <form onSubmit = { handleSubmit }>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Enter the username to share with"
                  aria-label="new-item"
                  // ALSO NEED TO BE CHANGED MAYBE
                  onChange = { handleChange } 
                />
                <Button variant="primary" type="submit">share</Button>
              </InputGroup>
            </form>
        </div>
        <div className="list-selector">
          <div className="selector-label">Select a List:</div>
          {
            loading ? (<Loading /> ) : (
            <Form.Select aria-label="Select a list" onChange={handleSelector}>
            {
              usernames.map((username, index) => {
                return (
                  <option value={index}>
                    {username}
                  </option>
                );
              })
            }
            </Form.Select>
            )
          }
        </div>

	<div>
          <InputGroup className="mb-3">
            <textarea
	      name="Search Filter"
              placeholder="Search your list by text or date here"
              onChange={handleFilterChange}
            >
	    </textarea>
          </InputGroup>
	</div>

        <div className="list">
          {
            loading ? ( <Loading /> ) : (
              <div className="list-items">
                {items[listNum].map((item, index) => {
                  if (item.toLowerCase().includes(filterItem.toLowerCase())) {
		    return (
                      <div key={index}>
                        <p>{item}</p>
                      </div>
                    );
		  }
                })}
              </div>  
            )
          }

          {
            listNum == 0 &&
            (<form onSubmit={handleSubmit}>
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
            )
          }
          {showError && <Alert variant="danger">Error Adding Item</Alert>}
        </div>
      </div>
      
    </div>
  );
};
export default Lists;
