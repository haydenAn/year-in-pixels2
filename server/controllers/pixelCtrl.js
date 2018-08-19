const getOnePixelFullInfo = (req, res) => {
  console.log("Hit the get =>/api/pixel/:date ");
  const { date } = req.params;
  req.app
    .get("db")
    .getPixel([date])
    .then(pixel => {
      res.status(200).send(pixel);
    })
    .catch(() => {
      res.status(500).send();
    });
};
const addPixel = (req, res) => {
    console.log("Hit the post => /api/pixel", req.body);
    const { pixel_unique } = req.body;
    req.app
      .get("db")
      .addPixel([req.session.ilgi.id, Number(pixel_unique)])
      .then(pixel => {
        console.log(pixel);
        res.status(200).json(pixel);
      })
      .catch(err => {
        // res.status(500).send(err);
        console.log(err);
      });
  };
  
  const getAllPixelsSimpleInfo = (req, res) => {
    console.log("Hit the get => /api/pixels");
    req.app
      .get("db")
      .getAllPixels(req.session.ilgi.id)
      .then(pixels => {
        console.log(pixels);
        res.status(200).send(pixels);
      })
      .catch(() => {
        res.status(500).send();
      });
  };
  
  
  const updatePixel = (req, res) => {
    console.log("Hit the post =>/api/pixel");
    console.log(req.params);
    console.log(req.body);
    const { id } = req.params;
    const { text, img, quote_id } = req.body;
  
    req.app
      .get("db")
      .updatePixel([Number(id), text, img, req.session.ilgi.id, quote_id])
      .then(pixels => {
        res.status(200).send(pixels);
      })
      .catch(err => {
        console.log(err);
      });
  };
  module.exports = {
    addPixel,
    getAllPixelsSimpleInfo,
    getOnePixelFullInfo,
    updatePixel
  };
  