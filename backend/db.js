console.log("🔥 db.js loaded");
require("dotenv").config();
const mysql = require("mysql2/promise");
const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");


const secret_name = process.env.SECRET_NAME;

const client = new SecretsManagerClient({
  region: process.env.REGION,
});

let pool;

async function getDB() {
  try {
    console.log("🔥 getDB called");
    // reuse pool
    if (pool) return pool;

    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: "AWSCURRENT",
      })
    );

    const secret = JSON.parse(response.SecretString);

    pool = mysql.createPool({
      host: secret.host,
      user: secret.username,
      password: secret.password,
      database: secret.database,
      port: secret.port,
      waitForConnections: true,
      connectionLimit: 10,
    });

    console.log("✅ Connected to RDS using Secrets Manager");

    return pool;
  } catch (err) {
    console.error("❌ DB CONNECTION ERROR:", err);
    throw err; // VERY IMPORTANT
  }
}

module.exports = getDB;