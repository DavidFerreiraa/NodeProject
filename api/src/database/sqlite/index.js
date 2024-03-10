const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const path = require("path");

async function sqliteConnection() {
    const database = await sqlite.open({
        filename: path.resolve(__dirname, "..", "database.db"), //Change directory even if user uses a different SO
        driver: sqlite3.Database
    });
    
    return database;
}

module.exports = sqliteConnection;
