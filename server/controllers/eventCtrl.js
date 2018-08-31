const addEvent = (req, res) => {
  console.log("Hit the post => /api/event");
  const { title, text, location, important, formattedDate } = req.body;
  req.app
    .get("db")
    .addEvent([req.user.id, title, text, location, important, formattedDate])
    .then(event => {
      res.status(200).send(event[0]);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};
const getEvent = (req, res) => {
  console.log("hit the get => /api/event/:date");
  const { date } = req.params;
  req.app
    .get("db")
    .getEvent([req.user.id, date])
    .then(event => {
      res.status(200).send(event[0]);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};
const updateEvent = (req, res) => {
  console.log("Hit the put =>/api/event/:id");
  const { id } = req.params,
    { title, text, location, important } = req.body;
    req.app.get("db").updateEvent([title, text, location, important, id])
      .then(event => {
        res.status(200).send(event);
      })
      .catch(() => {
        res.status(500).send();
      });
};
const getAllEvents = (req, res) => {
  console.log("Hit the get =>/api/events");
  req.app
    .get("db")
    .getAllEvents([req.user.id])
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
    req.app.get("db").deleteEvent([id])
      .then(event => {
        res.status(200).send(event);
      })
      .catch(() => {
        res.status(500).send();
      });
};

module.exports = {
  addEvent,
  getEvent,
  getAllEvents,
  deleteEvent,
  updateEvent
};
