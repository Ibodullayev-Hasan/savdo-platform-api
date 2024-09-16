let { Pool } = require(`pg`);
require(`dotenv`).config();
const url = process.env.URL;

let pool = new Pool({
  connectionString: url,
});

// fetch_data logic
const fetch_data = async (query, ...params) => {
  let client = await pool.connect();
// console.log('query' + query);
// console.log('params'+ params);

  try {
    // Bu yerda params to'g'ridan-to'g'ri argument sifatida beriladi
    let { rows } = await client.query(query, params);
    return rows;
  } catch (error) {
    console.error("Fetch_Data: ", error);
  } finally {
    client.release();
  }
};

// export
module.exports = fetch_data;
