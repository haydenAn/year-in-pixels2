const axios = require("axios");
const addQuote = (req, res) => {
  console.log("Hit the post => /api/quote");
  const { text, author } = req.body;
  req.app
    .get("db")
    .addQuote([text, author,req.user.id])
    .then(quote => {
      res.status(200).json(quote);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};
const getQuote = (req, res) => {
  req.app
    .get("db")
    .getQuote(req.user.id)
    .then(quote => {
      res.status(200).send(quote);
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
const getRandomQuote = (req, res) => {
  axios
    .get("https://talaikis.com/api/quotes/random/")
    .then(quote => {
      res.status(200).json(quote.data);
    })
    .catch(res => res.status(500).json(res));
};
const updateQuote = (req,res) =>{
  
}
module.exports = {
  addQuote,
  deleteQuote,
  getRandomQuote,
  getQuote,
  updateQuote
};
