const mysql2 =require("mysql2");

const dbConnection =mysql2.createPool({
    user: "myDBuser",
    database: "evangadi-db",
    host: "localhost",
    password: "123456",
    connectionLimit:10
})





module.exports = dbConnection.promise()