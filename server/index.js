require("dotenv").config();
const express = require("express"),
  path = require("path"),
  bodyParser = require("body-parser"),
  session = require("express-session"),
  massive = require("massive"),
  cors = require("cors"),
  passport = require("passport");

const { strat, logout, getUser } = require(`${__dirname}/controllers/authCtrl`),
  {
    getOnePixelFullInfo,
    addPixel,
    getPixels,
    getFullPixels,
    countPixels
  } = require(`${__dirname}/controllers/pixelCtrl`),
  {
    searchPhoto,
    getRandomPhoto
  } = require(`${__dirname}/controllers/unsplashCtrl`),
  { addEvent, getEvent } = require(`${__dirname}/controllers/eventCtrl`),
  {
    addTodo,
    getTodos,
    updateTodo,
    deleteTodo
  } = require(`${__dirname}/controllers/todoCtrl`),
  {
    getRandomQuote,
    addQuote,
    getQuote,
    deleteQuote,
    updateQuote
  } = require(`${__dirname}/controllers/quoteCtrl`),
  {
    getPixelsByColor,
    getPixelsByDate,
    getPixelsForGraph,
    getColorRatio,
    getColorRatioByMonth,
    getPixelsForGraphByMonth
  } = require(`${__dirname}/controllers/filteredPixelCtrl`);
const app = express();

massive(process.env.CONNECTION_STRING)
  .then(db => app.set("db", db))
  .catch(err => console.log(err));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000000
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());
// app.use(express.static(path.join(__dirname, "../build")));
passport.use(strat);
passport.serializeUser((user, done) => {
  app
    .get("db")
    .getUserByAuthid(user.id)
    .then(response => {
      if (!response[0]) {
        app
          .get("db")
          .addUserByAuthid([
            user.id,
            user.displayName,
            user.picture,
            `${user.nickname}'s ilgi`
          ])
          .then(res => {
            return done(null, res[0]);
          })
          .catch(err => console.log(err));
      } else {
        return done(null, response[0]);
      }
    })
    .catch(err => console.log(err));
});
passport.deserializeUser((user, done) => {
  return done(null, user);
});

//AUTH
app.get(
  "/auth",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/#/home",
    failureRedirect: "http://localhost:3000/#/"
  })
);
app.get("/auth/logout", logout);
app.get("/auth/me", getUser);

// PIXEL
app.get("/api/pixel/:date", getOnePixelFullInfo);
app.post("/api/pixel", addPixel);
app.get("/api/pixels", getPixels);
app.get("/api/pixels/feed", getFullPixels);
app.get('/api/count/pixels',countPixels);
// app.put("/api/pixel/:id", updatePixel);

//FILTERED PIXELS
app.get("/api/forGraph/pixels", getPixelsForGraph);
app.get("/api/forGraph/:month", getPixelsForGraphByMonth);
app.get("/api/colorRatio", getColorRatio);
app.get("/api/colorRatio/byMonth/:month", getColorRatioByMonth);
app.get("/api/byDate/pixels/:date", getPixelsByDate);
app.get("/api/byColor/pixels/:color", getPixelsByColor);

///quote
app.get("/api/quote/random", getRandomQuote);
app.get("/api/quote", getQuote);
app.post("/api/quote", addQuote);
app.put("/api/quote", updateQuote);
app.delete("/api/quote/:id", deleteQuote);

//UNSPLASH
app.get("/api/photos/:keyword/:page", searchPhoto);
app.get("/api/photo/random", getRandomPhoto);
//TODO
app.get("/api/todo/:date", getTodos);
app.post("/api/todo", addTodo);
app.put("/api/todo/:id", updateTodo);
app.delete("/api/todo/:id/:date", deleteTodo);
//EVENT
app.post("/api/event", addEvent);
app.get("/api/event/:date", getEvent);
// app.put("/api/event/:id", updateEvent);
// app.get("/api/events", getAllEvents);
// app.delete("/api/event/:id", deleteEvent);

// app.get("*", (req, res, next) => {
//   res.sendFile(path.join(__dirname, "/../build/index.html"));
// });

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
