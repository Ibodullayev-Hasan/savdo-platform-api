let { Pool } = require(`pg`);
require(`dotenv`).config();
const url = process.env.URL;

const pool = new Pool({
  connectionString: url,
  max: 10, // Maksimal bir vaqtda ochiq turadigan ulanishlar
  idleTimeoutMillis: 30000, // 30 sekunddan so‘ng bo‘sh ulanishlar yopiladi
  connectionTimeoutMillis: 2000, // 2 soniya ichida ulana olmasa, xato qaytaradi
});

// fetch_data logic
const fetch_data = async (query, ...params) => {
  let client;
  try {
    client = await pool.connect();
    let { rows } = await client.query(query, params);
    return rows;
  } catch (error) {
    console.error("Fetch_Data Error: ", error);
    throw new Error("Database query failed"); // Xatoni tashlash
  } finally {
    if (client) client.release();
  }
};

// export
module.exports = fetch_data;
