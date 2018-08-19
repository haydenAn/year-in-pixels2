const addEvent = (req, res) => {
    console.log("Hit the post => /api/event");
    const {
      title,
      text,
      location,
      important,
      formatDate,
      pixel_unique
    } = req.body;
    console.log(
      req.session.ilgi.id,
      title,
      text,
      location,
      important,
      formatDate,
      pixel_unique
    );
    req.app
      .get("db")
      .addEvent([
        req.session.ilgi.id,
        title,
        text,
        location,
        important,
        formatDate,
        pixel_unique
      ])
      .then(event => {
        console.log(event);
        res.status(200).json(event);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  };
  
  const updateEvent = (req, res) => {
    console.log("Hit the put =>/api/event/:id");
    const { id } = req.params;
    const {
      title,
      text,
      location,
      important,
      formatDate,
      pixel_unique
    } = req.body;
    console.log(id, req.body);
    req.app
      .get("db")
      .updateEvent([
        title,
        text,
        location,
        important,
        formatDate,
        pixel_unique,
        id,
        req.session.ilgi.id
      ])
      .then(pixels => {
        res.status(200).send(pixels);
      })
      .catch(() => {
        res.status(500).send();
      });
  };
  const getAllEvents = (req, res) => {
    console.log("Hit the get =>/api/events");
    req.app
      .get("db")
      .getAllEvents([req.session.ilgi.id])
      .then(events => {
        res.status(200).send(events);
      })
      .catch(() => {
        res.status(500).send();
      });
  };
  const deleteEvent = (req, res) => {
    console.log("Hit the delete =>/api/event/:id");
    const { id } = req.params;
    req.app
      .get("db")
      .deleteEvent([id, req.session.ilgi.id])
      .then(events => {
        console.log(events);
        res.status(200).send(events);
      })
      .catch(() => {
        res.status(500).send();
      });
  };
  
  module.exports = {
    addEvent,
    getAllEvents,
    deleteEvent,
    updateEvent
  };
  