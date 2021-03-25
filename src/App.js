import "./App.css";
import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
        setMessages(
          snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    setUsername(prompt("Please Enter Your Name"));
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
    <div className="app">
      <div className="app_header">
        <h1>Facebook Messenger Clone App</h1>
        <h2>Welcome {username}</h2>
      </div>

      <FlipMove>
        {messages.map(({ message, id }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
      <form className="app_form">
        <FormControl className="app_formcontrol">
          <Input
            autoFocus
            className="app_input"
            placeholder="Enter a Message"
            value={input}
            onChange={e => setInput(e.target.value)}
          ></Input>

          <IconButton
            className="app_iconbutton"
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
