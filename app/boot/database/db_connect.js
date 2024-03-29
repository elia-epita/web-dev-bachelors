const pg = require("pg");
const logger = require("../../middleware/winston");

const db_config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST || "127.0.0.1",
  database: process.env.DB_NAME || "netflix-clone",
  password: process.env.DB_PASSWORD,
  port: 5432,
  max: 10,
};

let db_connection;

function startConnection() {
  // type parsers here
  pg.types.setTypeParser(1082, function (stringValue) {
    return stringValue; // 1082 is for date type
  });

  db_connection = new pg.Pool(db_config);

  db_connection.connect((err, client) => {
    if (!err) {
      logger.info("PostgreSQL Connected");
    } else {
      logger.error("PostgreSQL Connection Failed");
      startConnection();
    }
  });

  db_connection.on("error", (err, client) => {
    logger.error("Unexpected error on idle client");
    startConnection();
  });
}

startConnection();

// testing a select every 3 seconds
// to try the code you can stop postgresql service => select will fail
// if you start it back => select will succeed
setInterval(function () {
  db_connection.query("SELECT $1", [1], (err, res) => {
    if (err) logger.error("SELECT 1", err.message);
  });
}, 3000);

module.exports = db_connection;
