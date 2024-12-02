const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'n9qCS\"9J68bE\'45',
    database: 'workout_tracker'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.get('/expenses', (req, res) => {
    db.query('SELECT * FROM expenses', (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(results);
    });
});

app.post('/expenses', (req, res) => {
    const { name, amount, category, account, youtubeURL } = req.body; 
    db.query('INSERT INTO expenses (name, amount, category, account, youtubeURL) VALUES (?, ?, ?, ?, ?)', 
    [name, amount, category, account, youtubeURL], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(201).send('Expense added');
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});