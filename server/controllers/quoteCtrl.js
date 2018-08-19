const axios = require("axios");
const addQuote = (req, res) => {
  console.log("Hit the post => /api/quote");
  /////add quote to the database
  const { text, author, tags, ilgi_id } = req.body;
  req.app
    .get("db")
    .addQuote([text, author, tags, ilgi_id])
    .then(quote => {
      res.status(200).json(quote);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};
const getQuoteById = (req, res) => {
  const { id } = req.params;
  req.app
    .get("db")
    .getQuoteByid(id)
    .then(quote => {
      res.status(200).send(quote);
    })
    .catch(() => {
      res.status(500).send();
    });
};
const getAllQuotes = (req, res) => {
  //////get all quotes from your database
  console.log("Hit the get => /api/quotes");
  req.app
    .get("db")
    .getAllQuotes(req.session.ilgi.id)
    .then(quotes => {
      res.status(200).send(quotes);
    })
    .catch(() => {
      res.status(500).send();
    });
};

const deleteQuote = (req, res) => {
  console.log("Hit the delete =>/api/quote");
  const { id } = req.params;
  req.app
    .get("db")
    .deleteQuote([id])
    .then(quote => {
      res.status(200).send(quote);
    })
    .catch(() => {
      res.status(500).send();
    });
};
const getQuote = (req, res) => {
  axios
    .get("https://talaikis.com/api/quotes/random/")
    .then(quote => {
      res.status(200).json(quote.data);
    })
    .catch(res => res.status(500).json(res));
};

module.exports = {
  addQuote,
  getAllQuotes,
  deleteQuote,
  getQuote,
  getQuoteById
};
