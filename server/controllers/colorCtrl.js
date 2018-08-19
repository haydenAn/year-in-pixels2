const addColor = (req, res) => {
    console.log("Hit the post => /api/color", req.body);
    const { pixel_unique } = req.body;
    req.app
      .get("db")
      .addColor([0.5, pixel_unique, req.session.ilgi.id])
      .then(color => {
        res.status(200).json(color);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  };
  
  const updateColor = (req, res) => {
    console.log("Hit the post =>/api/color", req.params, req.body);
    const { id } = req.params;
    const { colorvalue, opacity } = req.body;
    req.app
      .get("db")
      .updateColor([id, colorvalue, Number(opacity)])
      .then(pixels => {
        res.status(200).send(pixels);
      })
      .catch(() => {
        res.status(500).send();
      });
  };
  
  module.exports = {
    addColor,
    updateColor
  };
  