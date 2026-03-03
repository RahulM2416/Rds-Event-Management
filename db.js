const mysql = require('mysql2/promise');
const {SecretsManagerClient, GetSecretValueCommand} = require('@aws-sdk/client-secrets-manager');
require('dotenv').config();

const secret_name = process.env.SECRET_NAME;
const client = new SecretsManagerClient({
    region:process.env.region,
});

let response;

try {
    response = await client.send(
        new GetSecretValueCommand({
            SecretId : secret_name,
            VersionStage: "AWSCURRENT",
        })
    );
} catch(err){
    console.log(err);
}

const secret = response.SecretString;