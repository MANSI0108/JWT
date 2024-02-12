const express = require("express")
const jwt = require("jsonwebtoken")

const app = express();
const secretKey = "secretKey"
const port = 5000;

// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to the my API" })
// })


app.post("/login", (req, res) => {
    const user = {
        id: 1,
        username: "Mansi",
        email: "abc123@gmail.com"
    }

    jwt.sign({ user }, secretKey, { expiresIn: "500s" }, (err, token) => {
        res.json({
            token
        })
    })
})

app.post("/profile", verifyToken, (req, res) => {
    jwt.verify(req.token, secretKey, (err, result) => {
        if (err) {
            res.send({ message: "Invalid Token" })
        }
        else {
            res.json({
                message: "Profile Accessed",
                result
            }) 
        }
    })
})



function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];

    if (typeof (bearerHeader) !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        console.log(token);
        next()
    }
    else {
        res.send({
            message: "Token is not valid."
        })
    }

    
}

app.listen(port, () => {
    console.log("server is running...");
})
