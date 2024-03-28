const express = require('express');
const app = express();

let secret_key = "s0@&o%#h2ix7j7byqa+x*m6rvphm7!n4=5k7s%@sj+#+*lct41";

const cookieParser = require('cookie-parser');
app.use(cookieParser(secret_key));

app.get('/greet', (req, res) => {
    const { name = 'No-name' } = req.cookies;
    console.log(req.cookies);
    res.send(`Hey there, ${name}`)
})

app.get('/setname', (req, res) => {
    res.cookie('name', 'henrietta');
    res.cookie('animal', 'harlequin shrimp')
    res.send('OK SENT YOU A COOKIE!!!')
})

app.get('/getsignedcookie', (req, res) => {
    res.cookie('fruit', 'grape', { signed: true })
    res.send('OK SIGNED YOUR FRUIT COOKIE!')
})

app.get('/verifyfruit', (req, res) => {
    console.log(req.cookies)
    console.log(req.signedCookies)
    res.send(req.signedCookies)
})

app.listen(3000, () => {
    console.log("SERVING!")
})