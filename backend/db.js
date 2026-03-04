const mysql = require('mysql2/promise');
const {SecretsManagerClient, GetSecretValueCommand} = require('@aws-sdk/client-secrets-manager');
require('dotenv').config();

const secret_name = process.env.SECRET_NAME;
const client = new SecretsManagerClient({
    region:process.env.region,
});

let response;
let pool;

async function getDB(){
try {
    if(pool) return pool;
    response = await client.send(
        new GetSecretValueCommand({
            SecretId : secret_name,
            VersionStage: "AWSCURRENT",
        })
    );
    const secret = JSON.parse(response.SecretString);

pool = mysql.createPool({
    host:secret.host,
    user:secret.username,
    password : secret.password,
    database : secret.database,
    port : secret.port,
    waitForConnections : true,
    connectionLimit : 10,
});
console.log("Conneted to rds via secret Manager");

return pool;
} catch(err){
    console.log(err);
}
}

module.exports = getDB;

