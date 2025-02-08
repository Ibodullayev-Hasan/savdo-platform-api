const express = require(`express`);
require(`dotenv`).config();
const app = express();
const cors = require(`cors`);
const router = require("./src/routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);

// run server
const port = process.env.SERVER_PORT || 5000;
app.listen(port, () => {
  console.log(`Server run: http://localhost:${port}`);
});
