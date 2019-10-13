require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || "3000";
// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Imported ROUTES
app.use("/api/", require("./src/routes/contact"));
app.use("/api/", require("./src/routes/group"));
app.use("/api/", require("./src/routes/contact-list"));

// ROUTES
app.get("/", (req, res) => {
  res.json({
    message: "api's are working"
  });
});
// DB Connection
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("connected to database...!");
  })
  .catch(err => {
    console.log("connection failed " + err);
  });

// Listening port
app.listen(port, () => {
  console.log("server is listening at port: " + port);
});
