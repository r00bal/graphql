const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const { user, pass } = require("./credentils.js");

const app = express();

// allow corss-origin request
app.use(cors());

// connect to mlab database
mongoose.connect(
  `mongodb://${user}:${pass}@ds249623.mlab.com:49623/gql-r00bal`
);
mongoose.connection.once("open", () => {
  console.log("connected to database");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("now listening for request on port 4000");
});
