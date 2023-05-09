const mysql = require('mysql');
var connection
connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'chat',
    port: '8889',
});



connection.connect(function(err) {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log(`Connected to database on port ${connection.config.port}!`);

});

// connection.connect(function(error){
// 	if(error) throw error;
// 	else console.log('database connected');
// });

module.exports = connection