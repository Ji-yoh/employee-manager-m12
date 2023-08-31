const db = require('./connection')
const promptUser = require('../index') // import promptUser function from index.js

class mySqlQueries {
    viewDepartments() {
        db.query('SELECT * FROM departments', (err, results) => {
            if (err) {
                console.log(err);
            } else {
                console.table(results);
                return promptUser();
                }
            }); 
    }
}

// module.exports = mySqlQueries;