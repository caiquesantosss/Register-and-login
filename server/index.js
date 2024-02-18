const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");

const salt = 10;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true
}));

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({Error: "Unauthorized"}); // Alteração: Mudança do status para 401
    } else {
        jwt.verify(token, "HGBSDFHJKZXNMASDFNJLK", (err, decoded) => {
            if (err) {
                return res.status(401).json({Error: "Unauthorized"}); // Alteração: Mudança do status para 401
            } else {
                req.name = decoded.name;
                next();
            }
        });
    }
};

app.get('/', verifyUser, (req, res) => {
    return res.json({Status: "Success", name: req.name});
});

app.post('/register', (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `passw`) VALUES (?)";
    bcrypt.hash(req.body.passw.toString(), salt, (err, hash) => {
        if (err) return res.status(500).json({Error: "Internal Server Error"}); 
        const values = [
            req.body.name,
            req.body.email,
            hash
        ];
        db.query(sql, [values], (err, result) => {
            if (err) return res.status(500).json({Error: "Internal Server Error"}); 
            return res.json({Status: "Success"});
        });
    });
});

app.post("/login", (req, res) => {
    const sql = "SELECT * FROM login WHERE email = ?";
    db.query(sql, [req.body.email], (err, data) => {
        if (err) return res.status(500).json({Error: "Internal Server Error"}); 
        if (data.length > 0) {
            bcrypt.compare(req.body.passw.toString(), data[0].passw, (err, result) => {
                if (err) return res.status(500).json({Error: "Internal Server Error"}); 
                if (result) {
                    const name = data[0].name;
                    const token = jwt.sign({name}, "HGBSDFHJKZXNMASDFNJLK", {expiresIn: '1d'});
                    res.cookie('token', token);
                    return res.json({Status: "Success"});
                } else {
                    return res.status(401).json({Error: "Unauthorized"});
                }
            });
        } else {
            return res.status(404).json({Error: "Email not found"}); 
        }
    });
});

app.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: "Sucess"})
})


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ming"
});

app.listen(3301, () => {
    console.log("Rodando!");
});
