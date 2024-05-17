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

    const existingUser = await collection.findOne({ name: data.name });

    if (existingUser) {
        res.render("signup", { error: "Usuário já existente!" });
    } else {
        // Hash the password using bcrypt
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword; // Replace the original password with the hashed one

        const userdata = await collection.insertMany(data);
        console.log(userdata);
        res.render("signup", { success: "Usuário cadastrado com sucesso!" });
    }
});

app.post("/login", async (req, res) => {
    try {
        const user = await collection.findOne({ name: req.body.email });
        if (!user) {
            res.render("login", { error: "Usuário não encontrado!" });
        } else {
            const isPasswordMatch = await bcrypt.compare(
                req.body.password,
                user.password,
            );
            if (!isPasswordMatch) {
                res.render("login", { error: "Senha incorreta!" });
            } else {
                res.render("login", { success: "Login bem-sucedido!" });
            }
        }
    } catch (err) {
        res.render("login", { error: "Detalhes incorretos!" });
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on: ${port}`);
});
