let { Pool } = require(`pg`);
require(`dotenv`).config();
const url = process.env.URL;

const pool = new Pool({
  connectionString: url,
  max: 10,
  idleTimeoutMillis: 30000, 
  connectionTimeoutMillis: 5000, 
});

// fetch_data logic
const fetch_data = async (query, ...params) => {
  let client;
  try {
    client = await pool.connect();
    let { rows } = await client.query(query, params);
    return rows;
  } catch (error) {
    throw new Error("Database query failed"); 
  } finally {
    if (client) client.release();
  }
};

// export
module.exports = fetch_data;
