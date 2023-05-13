const mysql = require('mysql2')

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


// Connection closing

connection.end((error) => {
    if(error){
        console.log('Error closing connection: ', error);
        return;
    }
    console.log('Connection closed!');
})