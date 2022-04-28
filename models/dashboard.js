var pool = require('./connection');

module.exports.getUsersCount = async function(){

    try {
        
        let sql = 'select * from utilizador';

        let result = await pool.query(sql);

        let users = result.rows;

        return{

            status: 200, result: users
        };

    } catch (error) {
        
        return {

            status: 500, result: error
        };

    }
}