const { defineConfig } = require("cypress");
const oracledb = require("oracledb");
require("dotenv").config();

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  env: {
    baseUrl: 'https://api.techglobal-training.com/students',
    oracleDB: {
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      connectionString: process.env.DB_HOST,
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      on("task", {
        async runQuery(query) {
          let connection;

          try {
          // Establish the connection to our Oracle Database
          connection = await oracledb.getConnection(config.env.oracleDB);

          // This is where we execute the query and return the result of it
          const result = await connection.execute(query);
          return result.rows;
          } catch (err) {
            throw new Error(err)
          } finally {
            // It's a good practice to make sure the connection is killed after the exection.
            if(connection) {
              await connection.close()
            }
          }
        },
      });
    },
    baseUrl: process.env.BASE_URL
  },
});