import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import { FormControl, IconButton, Input } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Message from "./Message";
import db from "./config";
import firebase from "firebase";
import FlipMove from "react-flip-move";

function App() {
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const chatScroll = useRef(0);

  useEffect(() => {
    const scroll =
     chatScroll.current.scrollHeight - chatScroll.current.clientHeight;
    
     chatScroll.current.scrollTo({
      top: scroll,
      left: 0,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot(snapshot => {
        setMessages(
          snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    let user = prompt("Please Enter Your Name");
    if (user) {
      setUsername(user);
    } else {
      setUsername("Unknown");
    }
  }, []);

  const sendMessage = e => {
    e.preventDefault();
    db.collection("messages").add({
      username: username,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };
  return (
    <div ref={chatScroll} className="app">
      <div className="app__header">
        <img
          className="app__logo"
          src="https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=399&h=399"
          alt=""
        />
        <h2>
          Welcome: <span>{username}</span>
        </h2>
      </div>

      <div ref={chatScroll} className="app__flipMove">
        <FlipMove>
          {messages.map(({ message, id }) => (
            <Message key={id} username={username} message={message} />
          ))}
        </FlipMove>
      </div>

      <form className="app__form">
        <FormControl className="app__formcontrol">
          <Input
            autoFocus
            className="app__input"
            placeholder="Enter a Message"
            value={input}
            onChange={e => setInput(e.target.value)}
          ></Input>

          <IconButton
            className="app__iconbutton"
            disabled={!input}
            variant="contained"
            color="primary"
            onClick={sendMessage}
            type="submit"
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
    </div>
  );
}

export default App;
