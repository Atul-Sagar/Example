const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db1',
    authPlugin: 'mysql_native_password',
});

connection.connect((error) =>{
    if(error){
        console.error('Error connecting to MySQL Server: ', error);
        return
    }
    console.log('Connected to MySQL Server!');
});

connection.query('SELECT * FROM customers', (error, results) => {
    if(error){
        console.error('Error executing query: ', error);
        return;
    }
    console.log('Query results: ', results);
});

connection.end((error) => {
    if(error){
        console.log('Error closing connection: ', error);
        return;
    }
    console.log('Connection closed!');
})