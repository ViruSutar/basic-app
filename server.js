const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDb = require("./Config/db");
dotenv.config({ path: "./.env" });

const mongoUrl = process.env.MONGO_URL;


app.use(express.json());

// database
connectDb(mongoUrl);

// Routes
app.use('/user',require('./Routes/UsersRoute'))


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
