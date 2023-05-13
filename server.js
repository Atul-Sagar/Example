const mysql = require('mysql2')
const express = require('express')
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express()
const port = 3000

app.use(cors({ origin: 'http://127.0.0.1:5500' }));
// app.use(cors());

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db1',
    // authPlugin: 'mysql_native_password',
});

// Database Connection

connection.connect((error) =>{
    if(error){
        console.error('Error connecting to MySQL Server: ', error);
        return
    }
    console.log('Connected to MySQL Server!');
});

app.get('/', (req, res, next) =>{
    res.send('Hello from express')
    next()
});

async function getCustomerFromDB(){
    debugger
    return new Promise((resolve, reject) => {
        const selectQuery = 'SELECT * FROM customers';
        connection.query(selectQuery, (error, results) => {
            if(error){
                // console.error('Error executing query: ', error);
                reject('Error executing query: ', error)
                return;
            }
            console.log('Query results: ', results);
            resolve(results)
    
        })
    });
}

// Define a route handler
app.get('/data', (req, res) => {
    // Execute the SQL query
    connection.query('SELECT * FROM customers', (error, results) => {
      if (error) {
        console.error('Error executing the query: ', error);
        res.status(500).send('Error retrieving data');
        return;
      }
      // Send the query results as the response
      res.json(results);
    });
});

app.get('/customers', (req, res, next) =>{
    debugger

    res.set('Content-Type', 'application/json');
    res.sendStatus(200);
    res.send()

    const selectQuery = 'SELECT * FROM customers';
    connection.query(selectQuery, (error, results) => {
        if(error){
            console.error('Error executing query: ', error);
            // reject('Error executing query: ', error)
            return;
        }
        console.log('Query results: ', results);
        // resolve(results)
        res.send(results)

    })

    // getCustomerFromDB((result) => {
    //     console.log(result);
    //     res.json(result);
    // });
   
    next()
});


// Login endpoint
app.post('/login', (req, res) => {
    // const { username, password } = req.body;
    debugger
    let username = req.body.username 
    let password = req.body.password
    console.log(req.body);
    // console.log("username : ", username);
    // console.log("password : ", password);
  
    // Check if the username exists in the database
    // connection.query('SELECT * FROM auth WHERE username = "?"', [username], (error, results) => {
    connection.query('SELECT * FROM auth WHERE username = ?', [username], (error, results) => {
        if (error) {
            console.error('Error executing the query: ', error);
            res.status(500).json({ message: 'Error retrieving user data' });
            return;
        }
    
        if (results.length === 0) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        // comparing passwords
        if(password == results[0].password){
            res.status(200).json({ message: 'Login successful' });
            return
        }else{
            res.status(401).json({ message: 'Invalid credentials' });
            return
        }   
  
        // Compare the provided password with the hashed password stored in the database
    //     bcrypt.compare(password, results[0].password, (bcryptError, bcryptResult) => {
    //         if (bcryptError) {
    //         console.error('Error comparing passwords: ', bcryptError);
    //         res.status(500).json({ message: 'Error authenticating user' });
    //         return;
    //         }
    
    //         if (!bcryptResult) {
    //         res.status(401).json({ message: 'Invalid credentials' });
    //         return;
    //         }
    
    //         res.status(200).json({ message: 'Login successful' });
    //     });
    });
});
  




// Select 

// connection.query('SELECT * FROM customers', (error, results) => {
//     if(error){
//         console.error('Error executing query: ', error);
//         return;
//     }
//     console.log('Query results: ', results);
// });



// Create

const createTableQuery = `
    CREATE TABLE users(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE,
        age INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;

// connection.query(createTableQuery, (error, results) => {
//     if(error)
//         console.error('Error creating table: ', error);
//     else
//         console.log('Table created successfully!');
// });


// insert

const insertQuery = `
    INSERT INTO users (name, email, age) VALUES ('Atul', 'atul@sbilife.co.in', 25)
`;

// connection.query(insertQuery, (error, results) =>{
//     if(error)
//         console.error('Error inserting data: ', error);
//     else    
//         console.log('Data inserted successfully!');
// });


// Update

const updateQuery = `
    UPDATE users SET age = 26 WHERE id = 1
`;

// connection.query(updateQuery, (error, results) => {
//     if(error)
//         console.error('Error updating data: ', error);
//     else
//         console.log('Data updated successfully!');
// })


// Connection closing

// connection.end((error) => {
//     if(error){
//         console.log('Error closing connection: ', error);
//         return;
//     }
//     console.log('Connection closed!');
// })

app.listen(port, () =>{
    console.log('Server is running on port ${port}');
})