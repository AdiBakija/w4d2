const knex = require('knex');
const settings = require("./settings"); // settings.json

const db = knex({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
}});

let arg = process.argv[2];

let query = db.select("*").from("famous_people").where("first_name", 'ilike', '%' + arg + '%');
//This log is to test what is being sent to SQL
console.log(query.toSQL().sql);

//Promises can be used here or asCallback which only work if something is returned from the query variable
query.asCallback(function(err, results) {
  if (err) throw err
   console.log(results);
   db.destroy();
});

// knex('users').where('columnName', 'like', '%rowlikeme%')
// Outputs:
// select * from `users` where `columnName` like '%rowlikeme%'



