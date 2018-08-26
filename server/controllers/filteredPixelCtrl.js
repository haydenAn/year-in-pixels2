const getPixelsByColor = (req, res) => {
    console.log("Hit the get => /api/pixels/byColor/:color");
    const {color} = req.params;
    req.app
      .get("db")
      .getPixelsByColor(req.user.id,color)
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
    const {date} = req.params;
    req.app
      .get("db")
      .getPixelsByDate(req.user.id,date)
      .then(pixels => {
        console.log(pixels);
        res.status(200).send(pixels);
      })
      .catch(() => {
        res.status(500).send();
      });
  };

module.exports={
    getPixelsByColor,
    getPixelsByDate
}