const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
}));
app.use(express.static(path.join(__dirname)));

// Database setup
const db = new sqlite3.Database('./management.db', (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to the SQLite database.');

        // Create the user table if not exists
        db.run(`CREATE TABLE IF NOT EXISTS user (
            username TEXT,
            email TEXT PRIMARY KEY,
            password TEXT
        )`, (err) => {
            if (err) {
                console.error('Error creating user table:', err);
            }
        });

        // Ensure the tasks table exists and has the correct columns
        db.all(`PRAGMA table_info(tasks)`, (err, rows) => {
            if (err) {
                console.error('Error checking table schema:', err);
            } else {
                const columns = rows.map(row => row.name);
                if (!columns.includes('userEmail')) {
                    // Create tasks table with userEmail column if it does not exist
                    db.run(`CREATE TABLE IF NOT EXISTS tasks (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        description TEXT,
                        startDate TEXT,
                        endDate TEXT,
                        status TEXT,
                        userEmail TEXT,
                        FOREIGN KEY (userEmail) REFERENCES user (email)
                    )`, (err) => {
                        if (err) {
                            console.error('Error creating tasks table:', err);
                        }
                    });
                } else {
                    console.log('Table "tasks" already exists.');
                }
            }
        });
    }
});

// Routes for authentication
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));
});

app.get('/lo', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Register route
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const sql = `SELECT * FROM user WHERE email = ?`;
    db.get(sql, [email], (err, row) => {
        if (err) {
            console.error('Error checking for existing user:', err);
            res.status(500).send('Server error');
        } else if (row) {
            res.redirect('/?error=Email already exists');
        } else {
            const insertSql = `INSERT INTO user (username, email, password) VALUES (?, ?, ?)`;
            db.run(insertSql, [username, email, password], (err) => {
                if (err) {
                    console.error('Error inserting user:', err);
                    res.status(500).send('Server error');
                } else {
                    res.redirect('/home');
                }
            });
        }
    });
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT * FROM user WHERE email = ?`;
    db.get(sql, [email], (err, row) => {
        if (err) {
            console.error('Error checking user login:', err);
            res.status(500).send('Server error');
        } else if (row) {
            if (row.password === password) {
                req.session.username = row.username;
                req.session.email = row.email;
                res.redirect('/home');
            } else {
                res.redirect('/lo?error=Invalid password');
            }
        } else {
            res.redirect('/lo?error=User not found');
        }
    });
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error during logout:', err);
        }
        res.redirect('/lo');
    });
});

// Task Management Home
app.get('/home', (req, res) => {
    if (req.session.username) {
        res.sendFile(path.join(__dirname, 'task.html'));
    } else {
        res.redirect('/lo');
    }
});

// Get all tasks for the logged-in user
app.get('/tasks', (req, res) => {
    if (!req.session.email) return res.status(401).send('Not authenticated');
    const sql = 'SELECT * FROM tasks WHERE userEmail = ?';
    db.all(sql, [req.session.email], (err, rows) => {
        if (err) {
            console.error('Error retrieving tasks:', err);
            res.status(500).send('Server error');
        } else {
            res.json(rows);
        }
    });
});

// Create a new task
app.post('/task', (req, res) => {
    if (!req.session.email) return res.status(401).send('Not authenticated');
    const { description, startDate, endDate, status } = req.body;

    const sql = 'INSERT INTO tasks (description, startDate, endDate, status, userEmail) VALUES (?, ?, ?, ?, ?)';
    db.run(sql, [description, startDate, endDate, status, req.session.email], function (err) {
        if (err) {
            console.error('Error adding task:', err);
            return res.status(500).json({ message: 'Failed to add task' });
        }
        // Respond with the new task ID and success message
        res.status(201).json({ id: this.lastID, message: 'Task added successfully' });
    });
});


// Route to get the username for the logged-in user
app.get('/username', (req, res) => {
    if (req.session.username) {
        res.json({ username: req.session.username });
    } else {
        res.status(401).send('Not authenticated');
    }
});


// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

