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

let firstName = process.argv[2];
let lastName = process.argv[3];
let birthdate = process.argv[4];

let insertData = {first_name: firstName, last_name: lastName, birthdate: birthdate};

function addPerson (data) {

  db.insert(data).into("famous_people").then(function(results) {
    console.log(results.rows);
    db.destroy();
  });

};

addPerson(insertData);








// //Note the use of "ilike" which is not case sensitive compared to the "like".
// let query = db.select("*").from("famous_people").where("first_name", 'ilike', '%' + arg + '%');
// //This log is to test what is being sent to SQL
// console.log(query.toSQL().sql);

// //Promises can be used here or asCallback which only work if something is returned from the query variable
// query.asCallback(function(err, results) {
//   if (err) throw err
//    console.log(results);
//    db.destroy();
// });



