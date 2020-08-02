const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");

//require routes
const indexRouter = require("./routes/index");
const gamebookRouter = require("./routes/gamebook");
// const usabilityRouter = require("./routes/usability");
const helpRouter = require("./routes/help");

//configure middleware
app.set("view engine", "ejs"); //configure template engine
app.set("views", __dirname + "/views"); //set express to look in folder to render view
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public")); //public static css folder
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //parse form data client

app.use("/", indexRouter);
app.use("/gamebook", gamebookRouter);
// app.use('/usability', usabilityRouter)
app.use("/help", helpRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening at ${process.env.PORT || 3000}`);
});
