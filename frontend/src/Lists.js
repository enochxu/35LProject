import React, { useEffect, useState } from "react";
import { Button, InputGroup, FormControl, Alert, Form } from "react-bootstrap";
import Loading from "./Loading";
import axios from "axios";
import "./index.css";
import "./lists.css";

const Lists = ({ checkLogin, loggedInUser }) => {
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
  const [rmItem, setRmItem] = useState("");
  const [newItem, setNewItem] = useState("");
  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [shareUsername, setShareUsername] = useState("");
  const [doClear, setDoClear] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Design of filterItem
  // Should never be null, should always be string length 0+
  // Therefore listing items that have substring of filterItem
  // Should list all items, not no items
  const [filterItem, setFilterItem] = useState("");

  const handleSelector = (e) => {
    setListNum(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterItem(e.target.value);
  };

  const handleChange = (e) => {
    //console.log(e.target.value + "" + typeof(e.target.value));
    const currTime = new Date(); // Garbage collected
    // console.log(currTime.toDateString());
    const [hour, minutes, seconds] = [
      currTime.getHours(),
      currTime.getMinutes(),
      currTime.getSeconds(),
    ];
    const newItemWithDate =
      e.target.value +
      " (Time/Date: " +
      hour +
      ":" +
      minutes +
      " / " +
      currTime.toDateString() +
      ")";
    if (e.target.value != "") {
      setNewItem(newItemWithDate);
    } else {
      setNewItem("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usernames[listNum] === loggedInUser && newItem) {
      axios({
        method: "post",
        url: `http://localhost:5000/additem`,
        data: {
          item: newItem,
        },
        withCredentials: true,
      })
        .then((res) => {
          const newItems = items;
          // console.log(currTime.toDateString());
          newItems[listNum].push(newItem);
          setItems(newItems);
          setNewItem("");
          setShowError(false);
        })
        .catch((err) => {
          // console.log("error");
          setShowError(true);
        });
    }
    e.target.reset();
  };

  const submitShare = (e) => {
    e.preventDefault();
    axios({
      method: "put",
      url: `http://localhost:5000/sharelist`,
      data: {
        shareUsername,
      },
      withCredentials: true,
    })
      // NEED TO UPDATE
      .then((res) => {
        setShareUsername("");
        setShowError(false);
        e.target.reset();
      })
      //  NEED TO UPDATE
      .catch((err) => {
        setShowError(true);
        setErrorMessage("The user you are trying to share to does not exist.");
      });
  };

  // Filter versus search function,
  // filter means no need to press enter
  // const handleFilterSubmit = (e) => {
  // setFilterItem("");
  // };

  const setRemoveItem = (e) => {
    //console.log(e.target.value);
    setRmItem(e.target.value);
  };

  // NOTE: DOES NOT WORK ON INTERNET EXPLORER
  // DUE TO IE IMPLEMENTATION OF BUTTON.VALUE
  // Currently causes minor bug where user
  // cannot add same element to list on repeat
  const handleRemove = (e) => {
    e.preventDefault();
    if (usernames[listNum] === loggedInUser && rmItem) {
      axios({
        method: "post",
        url: `http://localhost:5000/removeitem`,
        data: { item: rmItem },
        withCredentials: true,
      })
        .then((response) => {
          //console.log(response);

          const newItems = items;
          newItems[listNum] = items[listNum].filter((word) => word !== rmItem);
          setItems(newItems);

          setRmItem("");
        })
        .catch((error) => {
          // Probably want to make a
          // "setShowRemoveError"
          // console.log(error.response);
          setShowError(true);
        });
    }
    //e.target.reset();
  };

  const handleClear = (e) => {
    e.preventDefault();
    //console.log("handleClear");
    if (doClear) {
      //console.log("doClear");
      axios({
        method: "post",
        url: `http://localhost:5000/clearitems`,
        withCredentials: true,
      })
        .then((response) => {
          //console.log(response);

	  // Filter out everything
          const newItems = items;
          newItems[listNum] = items[listNum].filter((word) => 1 === 0);
          setItems(newItems);
          // No-op command to cause update to state
	  setDoClear(false);
        })
        .catch((error) => {
          // Probably want to make a
          // "setShowClearError"
          // console.log(error.response);
          setShowError(true);
        });
    }
    setDoClear(true);
  };

  const handleCancelClear = (e) => {
    e.preventDefault();
    //console.log("cancelClear");
    setDoClear(false);
  }

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
  };

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
          <form onSubmit={submitShare}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Enter the username to share with"
                aria-label="new-item"
                onChange={(e) => setShareUsername(e.target.value)}
              />
              <Button variant="primary" type="submit">
                share
              </Button>
            </InputGroup>
          </form>
        </div>
        <div className="list-selector">
          <div className="selector-label">Select a List:</div>
          {loading ? (
            <Loading />
          ) : (
            <Form.Select aria-label="Select a list" onChange={handleSelector}>
              {usernames.map((username, index) => {
                return <option value={index}>{username}</option>;
              })}
            </Form.Select>
          )}
        </div>

        <div>
          <InputGroup className="mb-3">
            <textarea
              className="filter-text-area"
              name="Search Filter"
              placeholder="Search your list by text or date here"
              onChange={handleFilterChange}
            ></textarea>
          </InputGroup>
        </div>

        <div className="list">
          {loading ? (
            <Loading />
          ) : (
            <div className="list-items">
              {items[listNum].map((item, index) => {
                if (item.toLowerCase().includes(filterItem.toLowerCase())) {
                  return (
                    <div key={index}>
                      <p className="list-item">{item}</p>
                      {usernames[listNum] === loggedInUser && (
                        <Button
                          className="list-button"
                          value={item}
                          onMouseEnter={(e) => setRemoveItem(e)}
                          onClick={(e) => handleRemove(e)}
                        >
                          Done
                        </Button>
                      )}
                    </div>
                  );
                }
                return <div></div>;
              })}
            </div>
          )}

          {usernames[listNum] === loggedInUser && (
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
          )}

	  {usernames[listNum] === loggedInUser && (
            <Button
              className="list-button"
              onMouseOut={(e) => handleCancelClear(e)}
	      onClick={(e) => handleClear(e)}
 	    >
 	      Clear list
            </Button>
          )}
          
          {showError && <Alert variant="danger">{errorMessage}</Alert>}
        </div>
      </div>
    </div>
  );
};
export default Lists;
