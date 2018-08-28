const getPixelsByColor = (req, res) => {
  console.log("Hit the get => /api/pixels/byColor/:color");
  const { color } = req.params;
  req.app
    .get("db")
    .getPixelsByColor([req.user.id, `#${color}`])
    .then(pixels => {
      console.log(pixels);
      res.status(200).send(pixels);
    })
    .catch(() => {
      res.status(500).send();
    });
};

const getPixelsByDate = (req, res) => {
  console.log("Hit the get => /api/pixels/byDate/:date");
  const { date } = req.params;
  req.app
    .get("db")
    .getPixelsByDate([req.user.id, date])
    .then(pixels => {
      console.log(pixels);
      res.status(200).send(pixels);
    })
    .catch(() => {
      res.status(500).send();
    });
};

const getPixelsForGraph = (req, res) => {
  console.log("Hit the get => /api/forGraph/pixels");
  req.app
    .get("db")
    .getPixelsForGraph(req.user.id)
    .then(pixels => {
      console.log(pixels);
      res.status(200).send(pixels);
    })
    .catch(() => {
      res.status(500).send();
    });
};
const getPixelsForGraphByMonth = (req, res) => {
  console.log("Hit the get => /api/forGraph/pixels/:month");
  const {month} = req.params;
  req.app
    .get("db")
    .getAvgByMonth([req.user.id,month])
    .then(pixels => {
      console.log(pixels);
      res.status(200).send(pixels);
    })
    .catch(() => {
      res.status(500).send();
    });
};
const getColorRatio = (req, res) => {
  console.log("Hit the get => /api/colorRatio");
  req.app
    .get("db")
    .getColorRatio(req.user.id)
    .then(pixels => {
      console.log(pixels);
      res.status(200).send(pixels);
    })
    .catch(() => {
      res.status(500).send();
    });
};
const getColorRatioByMonth = (req, res) => {
  console.log("Hit the get => /api/colorRatio/byMOnth/:month");
  const {month} = req.params;
  req.app
    .get("db")
    .getColorRatioByMonth([req.user.id,month])
    .then(pixels => {
      console.log(pixels);
      res.status(200).send(pixels);
    })
    .catch(() => {
      res.status(500).send();
    });
};

module.exports = {
  getPixelsByColor,
  getPixelsByDate,
  getPixelsForGraph,
  getColorRatio,
  getColorRatioByMonth,
  getPixelsForGraphByMonth
};
