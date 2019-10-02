require("dotenv").config();
const express = require("express"),
  bodyParser = require("body-parser"),
  session = require("express-session"),
  massive = require("massive"),
  path = require("path"),
  cors = require("cors"),
  Auth0Strategy = require("passport-auth0"),
  passport = require("passport");

const { logout, getUser } = require(`${__dirname}/controllers/authCtrl`),
  {
    FRONT_END_URL,
    CONNECTION_STRING,
    SESSION_SECRET,
    AUTH_CLIENT_ID,
    AUTH_CALLBACK,
    AUTH_DOMAIN,
    AUTH_CLIENT_SECRET
  } = process.env,
  {
    getOnePixelFullInfo,
    addPixel,
    getPixels,
    getFullPixels,
    countPixels,
    updatePixel,
    deletePixel
  } = require(`${__dirname}/controllers/pixelCtrl`),
  {
    searchPhoto,
    getRandomPhoto
  } = require(`${__dirname}/controllers/unsplashCtrl`),
  {
    addEvent,
    getEvent,
    getAllEvents,
    updateEvent,
    deleteEvent,
    getImportantEvents,
    getEventsByMonth
  } = require(`${__dirname}/controllers/eventCtrl`),
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

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(
  session({
    secret: SESSION_SECRET,
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
massive(CONNECTION_STRING)
  .then(db => app.set("db", db))
  .catch(err => console.log(err));

passport.use(
  new Auth0Strategy(
    {
      clientID: AUTH_CLIENT_ID,
      clientSecret: AUTH_CLIENT_SECRET,
      domain: AUTH_DOMAIN,
      scope: "openid profile",
      callbackURL: AUTH_CALLBACK
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      const db = app.get("db");
      db.getUserByAuthid([profile.user_id]).then(user => {
        if (user[0]) {
          return done(null, { id: user[0].id });
        } else {
          db.addUserByAuthid([
            profile.user_id,
            profile.displayName,
            profile.picture,
            profile.nickname
          ]).then(user => {
            return done(null, { id: user[0].id });
          });
        }
      });
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  const db = app.get("db");
  db.getUserById([user.id]).then(user => {
    return done(null, user[0]);
  });
});

//AUTH
app.get(
  "/auth",
  passport.authenticate("auth0", {
    successRedirect: `${FRONT_END_URL}#/home`,
    failureRedirect: `${FRONT_END_URL}#/`
  })
);
app.get("/auth/logout", logout);
app.get("/auth/me", getUser);

// PIXEL
app.get("/api/pixel/:date", getOnePixelFullInfo);
app.post("/api/pixel", addPixel);
app.get("/api/pixels/byYear/:year", getPixels);
app.get("/api/pixels/feed", getFullPixels);
app.get("/api/count/pixels", countPixels);
app.put("/api/pixel/:id", updatePixel);
app.delete("/api/pixel/:id", deletePixel);

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
app.put("/api/quote/:id", updateQuote);
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
app.get("/api/events/important", getImportantEvents);
app.get("/api/events/byMonth/:month", getEventsByMonth);
app.put("/api/event/:id", updateEvent);
app.get("/api/events", getAllEvents);
app.delete("/api/event/:id", deleteEvent);

// app.get("*", (req, res, next) => {
//   res.sendFile(path.join(__dirname, "/../build/index.html"));
// });

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
