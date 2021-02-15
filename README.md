# Chat App

## Description
It is a interacting platform, where users can join different rooms, and interact with each other.  
It has following features:  
- User can share its current location  
- Bad words filtering is provided, an alert will be generated in case 
someone uses bad words

## Live demo
[Click here to open the live demo](https://chat-app--socket.herokuapp.com/)

## Key features
- **Joining page:** Here users have to write their name and the room in which they want to join

![joiningPage](https://github.com/rajnish1999/chat-app/blob/master/public/img/joiningP.jpeg)
<br><br>

- **Chat room:** This is the chat room. On the left side we have list of users who are active in this
chat room while on the right side we have message box

![chatRoom](https://github.com/rajnish1999/chat-app/blob/master/public/img/firstLogin.jpeg)
<br><br>

- **Multi user in room:** Here two users are interacting in the same room

![convo](https://github.com/rajnish1999/chat-app/blob/master/public/img/convo.jpeg)
<br><br>

- **What happens when a user leaves room?:** Here we can see that when a user leaves,
his name get removed from the side bar, and also other users of respective room 
get notified

![leave](https://github.com/rajnish1999/chat-app/blob/master/public/img/left.jpeg)
<br><br>

## Libraries used
- Node.js
- Express.js
- Socket.IO (for real-time, bidirectional and event-based communication)
- Mustache.js (for creating dynamic templates)
- Moment.js (for parsing, validating, manipulating, and formatting dates)
- qs (for querystring parsing)
- bad-words (for filtering badwords)

## Bonus points
- Mobile responsive

## Project setup
```
npm install
npm run start
```





