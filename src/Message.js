import { Card, CardContent, Typography } from "@material-ui/core";
import React, { forwardRef } from "react";
import "./Message.css";

const Message = forwardRef(({ username, message }, ref) => {
  const isUser = username === message.username;
  return (
    <div ref={ref} className={`message ${isUser && "message__user"} `}>
      <Card className={isUser ? "message__userCard" : "message__guestCard"}>
        <CardContent>
          <Typography color="inherit" variant="body2" component="p">
            {!isUser && `${message.username || "Unknown"}:`} {message.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;
