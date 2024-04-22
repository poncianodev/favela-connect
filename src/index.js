const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.static("assets"));
app.use(express.static("src"));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/home", (req, res) => {
    res.render("home");
});

app.get("/user", (req, res) => {
    res.render("user");
});

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.email,
        password: req.body.password,
    };

    // Check if the username already exists in the database
    const existingUser = await collection.findOne({ name: data.name });

    if (existingUser) {
        res.send("User already exists. Please choose a different username.");
    } else {
        // Hash the password using bcrypt
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword; // Replace the original password with the hashed one

        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }
});

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.email });
        if (!check) {
            res.send("O usuário não foi encontrado.");
        }
        // Compare the hashed password from the database with the plaintext password
        const isPasswordMatch = await bcrypt.compare(
            req.body.password,
            check.password,
        );
        if (!isPasswordMatch) {
            res.send("Senha incorreta!");
        } else {
            res.render("home");
        }
    } catch {
        res.send("wrong Details");
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on: ${port}`);
});
