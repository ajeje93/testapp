import React, { useRef, useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import logo from './logo.svg';
import Mylist from './components/MyList';
// import Spacer from './components/Spacer';
import './App.css';

function App() {
  const [listItems, setListItems] = useState([]);
  const [itemText, setItemText] = useState();
  const [currentJoke, setCurrentJoke] = useState('no-joke-only-work :(');
  const jokeRef = useRef();

  // useEffect(() => {
  //   fetch('https://icanhazdadjoke.com/', {
  //     headers: {
  //       Accept: 'application/json',
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then(({ joke }) => setCurrentJoke(joke));
  // }, []);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('https://icanhazdadjoke.com/', {
        headers: {
          Accept: 'application/json',
        },
      });
      const obj = await response.json();
      setCurrentJoke(obj.joke);
    };

    getData();

    if (jokeRef.current) {
      jokeRef.current.style.fontSize = '50px';
    }
  }, [listItems]);

  const handleOnChange = (e) => setItemText(e.target.value);

  const handleAddItem = () => {
    const nextItem = {
      id: nanoid(),
      text: itemText,
    };
    const nextListItems = [...listItems, nextItem];
    setListItems(nextListItems);
    setItemText('');
  };

  const removeItem = (id) => {
    const nextListItems = listItems.filter((i) => i.id !== id);
    setListItems(nextListItems);
  };

  const updateItem = (id, done) => {
    const currentItem = listItems.find((i) => i.id === id);
    let nextListItems = listItems.filter((i) => i.id !== id);
    nextListItems = [...nextListItems, { ...currentItem, done: !done }];
    setListItems(nextListItems);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={logo}
          style={{ height: 100, borderRadius: 4 }}
          className="App-logo"
          alt="logo"
        />
        <p ref={jokeRef}>{currentJoke}</p>
        <Mylist
          items={listItems}
          removeItem={removeItem}
          updateItem={updateItem}
        />
        <input value={itemText} onChange={handleOnChange} />
        <button onClick={handleAddItem}>add</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
