const Pool = require('pg').Pool;

const pool = new Pool({
    connectionString: 'postgres://epjwpdso:7qcIuwiIJcmkLGoC3sQ8cRHaNJ50FWoe@balarama.db.elephantsql.com:5432/epjwpdso'})

module.exports = {
    query(text, params){
        return new Promise((resolve, reject) => {
            pool.query(text, params)
                .then((res) => resolve(res))
                .catch((err) => reject(err))
        })
    }
}