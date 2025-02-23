/** @format */

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chats.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
	.then(() => {
		console.log("Connection successful");
	})
	.catch((err) => console.log(err));

async function main() {
	await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// index route
app.get("/chats", async (req, res) => {
	let chats = await Chat.find();
	// console.log(chats);
	res.render("index.ejs", { chats });
});

//new route
app.get("/chats/new", (req, res) => {
	res.render("new.ejs");
});

app.post("/chats", (req, res) => {
	let { from, to, message } = req.body;
	let newChat = new Chat({
		from: from,
		message: message,
		to: to,
		created_at: new Date(),
	});
	newChat
		.save()
		.then((res) => console.log("chat was saved"))
		.catch((err) => console.log(err));
	res.redirect("/chats");
});

//edit route
app.get("/chats/:id/edit", async (req, res) => {
	let { id } = req.params;
	let chat = await Chat.findById(id);
	res.render("edit.ejs", { chat });
});

//update route
app.put("/chats/:id", async (req, res) => {
	let { id } = req.params;
	let { message: newMessage } = req.body;
	let updatedChat = await Chat.findByIdAndUpdate(
		id,
		{ message: newMessage },
		{ runValidators: true },
		{ new: true }
	);
	console.log(updatedChat);
	res.redirect("/chats");
});

//destroy route
app.delete("/chats/:id", async (req, res) => {
	let { id } = req.params;
	let deletedChat = await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
});

//root route
app.get("/", (req, res) => {
	res.send("Root is working");
});

app.listen(8080, () => {
	console.log("listening on port 8080");
});
