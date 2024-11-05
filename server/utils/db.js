import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

con.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("connected");
  }
});

export default con;
