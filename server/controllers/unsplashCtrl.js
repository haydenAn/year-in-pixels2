const axios = require("axios");

const updateImg = (req, res) => {
  ////delete Quote to your data base
  console.log("Hit the post =>/api/quote");
  console.log(req.params);
  console.log(req.body);
  const { id, ilgi_id } = req.params;
  const { text, img, colorvalue } = req.body;

  req.app
    .get("db")
    .deleteQuote([id, text, img, colorvalue, ilgi_id])
    .then(quotes => {
      res.status(200).send(quotes);
    })
    .catch(() => {
      res.status(500).send();
    });
};
const searchPhoto = (req, res) => {
  const { id } = req.params;
  axios
    .get(
      `https://api.unsplash.com/search/photos?page=1&query=${id}&client_id=41ce1e2df2988ae9c6a235e14490d52039e01afc4f5ae0c92acbc62ede88a7c0`
    )
    .then(quote => {
      console.log(quote);
      res.status(200).json(quote.data);
    })
    .catch(res => res.status(500).json(res));
};

module.exports = {
  searchPhoto
};
