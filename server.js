const mysql = require('mysql2')
const express = require('express')

const app = express()
const port = 3000

app.get('/', (req, res) =>{
    res.send('Hello from express')
});

app.listen(port, () =>{
    console.log('Server is running on port ${port}');
})

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db1',
    authPlugin: 'mysql_native_password',
});

// Database Connection

connection.connect((error) =>{
    if(error){
        console.error('Error connecting to MySQL Server: ', error);
        return
    }
    console.log('Connected to MySQL Server!');
});

// Select 

connection.query('SELECT * FROM customers', (error, results) => {
    if(error){
        console.error('Error executing query: ', error);
        return;
    }
    console.log('Query results: ', results);
});



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

connection.query(createTableQuery, (error, results) => {
    if(error)
        console.error('Error creating table: ', error);
    else
        console.log('Table created successfully!');
});


// insert

const insertQuery = `
    INSERT INTO users (name, email, age) VALUES ('Atul', 'atul@sbilife.co.in', 25)
`;

connection.query(insertQuery, (error, results) =>{
    if(error)
        console.error('Error inserting data: ', error);
    else    
        console.log('Data inserted successfully!');
});


// Update

const updateQuery = `
    UPDATE users SET age = 26 WHERE id = 1
`;

connection.query(updateQuery, (error, results) => {
    if(error)
        console.error('Error updating data: ', error);
    else
        console.log('Data updated successfully!');
})


// Connection closing

connection.end((error) => {
    if(error){
        console.log('Error closing connection: ', error);
        return;
    }
    console.log('Connection closed!');
})