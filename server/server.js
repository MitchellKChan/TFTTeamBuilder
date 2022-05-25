const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const HttpError = require("./models/http-error");
const championsRoutes = require("./routes/champions-routes");
const itemsRoutes = require("./routes/items-routes");
const traitsRoutes = require("./routes/traits-routes");
const teamCompsRoutes = require("./routes/teamComps-routes");
const usersRoutes = require("./routes/users-routes");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Allow-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/champions", championsRoutes); // => /api/champions'...
app.use("/api/items", itemsRoutes); // => /api/champions'...
app.use("/api/traits", traitsRoutes); // => /api/traits'...
app.use("/api/teamComps", teamCompsRoutes); // => /api/teamComps'...
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
})

app.use((error, req, res, next) => { // error handling middleware
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({message: error.message || "An unknown error occurred."});
});

mongoose
  .connect("mongodb+srv://mitchellkchan:WU1aSbPJUSayBnYe@cluster0.smgpb.mongodb.net/teamcompositions?retryWrites=true&w=majority")
  .then(app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  }))
  .catch(err => {
    console.log(err);
  });

