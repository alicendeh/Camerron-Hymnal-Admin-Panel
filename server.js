const express = require("express");
const config = require("config");
const TodoDB = require("./config/database");

const app = express();

TodoDB();
app.use(express.json());
app.use("/api/CH/AdminAuth", require("./routes/user"));

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server started on PORT ${PORT}`);
});
