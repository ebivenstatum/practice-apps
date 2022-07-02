const mysql = require("mysql2");
const Promise = require("bluebird");

// Configure process.env variables in ../.env
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'checkout',
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
  .then(() => console.log(`Connected to MySQL as id: ${db.threadId}`))
  .then(() =>
    // Expand this table definition as needed:
    db.queryAsync(
      "CREATE TABLE IF NOT EXISTS responses (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY)"
    )
  )
  .catch((err) => console.log(err));

db.add = function (data, callback) {
  db
    .queryAsync(`INSERT INTO responses (session_id, user_name, user_email, user_password, address_one, address_two, city, state, address_zip, phone_number, expiry_date, cvv, billing_zip, credit_card_number) VALUES (${data.session_cookie}, ${data.name}, ${data.email}, ${data.password}, ${data.address_one}, ${data.address_two}, ${data.city}, ${data.state}, ${data.address_zip}, ${data.phone_number}, ${data.expiry_date}, ${data.cvv}, ${data.billing_zip}, ${data.credit_card_number})`)
    .then((response) => {
      callback(null, response);
    })
    .catch(err => {
      callback(err);
    });
}

module.exports = db;
