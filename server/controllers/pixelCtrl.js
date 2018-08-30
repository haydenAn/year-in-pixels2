const getOnePixelFullInfo = (req, res) => {
  console.log("Hit the get =>/api/pixel/:date ");
  const { date } = req.params,
    db = req.app.get("db");
  db.getPixelId(req.user.id, date).then(pixel => {
    if (pixel[0]) {
      db.getPixel([pixel[0].id]).then(pixel => {
        res.status(200).send(pixel[0]);
      });
    } else {
      res.status(200).send(false);
    }
  });
};
const addPixel = (req, res) => {
  console.log("Hit the post => /api/pixel", req.body);
  const {
    date,
    colorvalue,
    opacity,
    positive,
    color_data,
    text,
    img_url
  } = req.body;
  const db = req.app.get("db");
  db.addPixel([req.user.id, date])
    .then(pixel => {
      db.addPixelFullInfo([
        pixel[0].id,
        colorvalue,
        opacity,
        positive,
        color_data,
        text,
        img_url,
        date
      ])
        .then(pixel => res.status(200).send(pixel))
        .catch(console.error);
    })
    .catch(err => {
      // res.status(500).send(err);
      console.log(err);
    });
};

const getPixels = (req, res) => {
  console.log("Hit the get => /api/pixels");
  req.app
    .get("db")
    .getPixels(req.user.id)
    .then(pixels => {
      console.log(pixels);
      res.status(200).send(pixels);
    })
    .catch(() => {
      res.status(500).send();
    });
};
const getFullPixels = (req, res) => {
  console.log("Hit the get => /api/pixels/feed");
  req.app
    .get("db")
    .getFullPixels(req.user.id)
    .then(pixels => {
      console.log(pixels);
      res.status(200).send(pixels);
    })
    .catch(() => {
      res.status(500).send();
    });
};

const updatePixel = (req, res) => {
  console.log("Hit the put =>/api/pixel");
  const { id } = req.params;
  const { text, img_url, positive, opacity, colorvalue, color_data } = req.body;
  req.app
    .get("db")
    .updatePixel([id, text, img_url, positive, opacity, colorvalue, color_data])
    .then(pixel => {
      res.status(200).send(pixel);
    })
    .catch(err => {
      console.log(err);
    });
};
const countPixels = (req, res) => {
  req.app
    .get("db")
    .countAllPixels(req.user.id)
    .then(count => {
      res.status(200).send(count);
    })
    .catch(err => {
      console.log(err);
    });
};
const deletePixel = (req, res) => {
  const { id } = req.params,
    db = req.app.get("db");
  db.deletePixel(id).then(
    db
      .getFullPixels(req.user.id)
      .then(pixels => res.status(200).send(pixels))
      .catch(err => console.error(err))
  );
};
module.exports = {
  addPixel,
  getFullPixels,
  getPixels,
  getOnePixelFullInfo,
  updatePixel,
  countPixels,
  deletePixel
};
