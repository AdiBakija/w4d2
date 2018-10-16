const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

var arg = process.argv[2];

function personByName( first_name ) {

  client.query( `select * from famous_people where first_name=$1::text` , [ arg ] , function ( err , results ) {
    if(err) {
      return console.error("error running query", err);
    }
    console.log(results.rows);
    client.end();
  });

}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  personByName(arg);

});