const mongoose = require("mongoose");
const Chat = require("./models/chats.js");


main()
    .then(() => {
        console.log("Connection successful");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
    {   from: "Rahul",
        to: "Rohan",
        message: "Hello",
        created_at: new Date(),
    },
    {   from: "Kiran",
        to: "Mohit",
        message: "Hello how are you",
        created_at: new Date(),
    },
    {   from: "Tej",
        to: "Roshan",
        message: "Hello what are you doing",
        created_at: new Date(),
    },
    {   from: "Rahul",
        to: "Mohit",
        message: "Hello where are you going",
        created_at: new Date(),
    },
];

Chat.insertMany(allChats);