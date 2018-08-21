const axios = require("axios");

const searchPhoto = (req, res) => {
  const { keyword,page } = req.params;
  axios
    .get(
      `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=41ce1e2df2988ae9c6a235e14490d52039e01afc4f5ae0c92acbc62ede88a7c0`
    )
    .then(imges => {
      res.status(200).json(imges.data);
    })
    .catch(err =>console.log(err));
};

const getRandomPhoto = (req,res)=>{
  axios.get(
    `https://api.unsplash.com/photos/random?client_id=41ce1e2df2988ae9c6a235e14490d52039e01afc4f5ae0c92acbc62ede88a7c0`
  )
  .then(img => {
    res.status(200).json(img.data);
  })
  .catch(err =>console.log(err));
}
module.exports = {
  searchPhoto,
  getRandomPhoto
};
