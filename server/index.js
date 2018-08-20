require("dotenv").config();
const 
  express = require("express"),
  path = require("path"),
  { json } = require("body-parser"),
  session = require("express-session"),
  massive = require("massive"),
  cors = require("cors"),
  passport = require("passport");

const
  { strat, logout, getUser } = require(`${__dirname}/controllers/authCtrl`),
  { getOnePixelFullInfo,addPixel } = require(`${__dirname}/controllers/pixelCtrl`);
const app = express();
// const {
//   addEvent,
//   updateEvent,
//   getAllEvents,
//   deleteEvent
// } = require(`${__dirname}/controllers/eventCtrl`);
// const { addColor, updateColor } = require(`${__dirname}/controllers/colorCtrl`);
// const {
//   getQuote,
//   addQuote,
//   getAllQuotes,
//   getQuoteById,
//   deleteQuote
// } = require(`${__dirname}/controllers/quoteCtrl`);
// const { searchPhoto } = require(`${__dirname}/controllers/unsplashCtrl`);

massive(process.env.CONNECTION_STRING)
  .then(db => app.set("db", db))
  .catch(err => console.log(err));
app.use(json());
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
// app.get("/api/pixels", getAllPixels);
// app.post("/api/pixel/:id", updatePixel);

// color endpoints

// app.post("/api/color/:id", updateColor);
/////quote
// app.get("/api/getRandom", getQuote);
// app.get("/api/quote/:id", getQuoteById);
// app.post("/api/quote", addQuote);
// app.get("/api/quotes", getAllQuotes);
// app.delete("/api/quote/:id", deleteQuote);

// app.get("/api/photos/:id", searchPhoto);

///event endpoints
// app.post("/api/event", addEvent);
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
