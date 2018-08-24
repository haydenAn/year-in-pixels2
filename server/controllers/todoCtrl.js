const addTodo = (req, res) => {
  console.log("Hit the post => /api/todo");
  const { title, todo_date } = req.body;
  console.log(req.body);
  req.app
    .get("db")
    .addTodo([req.user.id, false, title, todo_date])
    .then(todos => {
      res.status(200).send(todos);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};
const getTodos = (req, res) => {
  console.log("hit the get => /api/todo/:date");
  const { date } = req.params;
  req.app
    .get("db")
    .getTodos([req.user.id, date])
    .then(todos => {
      res.status(200).send(todos);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};
const updateTodo = (req, res) => {
  console.log("Hit the put =>/api/todo/:id");
  const { id } = req.params,
    { checked,date } = req.body;
    console.log(req.body)
  req.app
    .get("db")
    .updateTodo([checked, id,req.user.id,date])
    .then(todos => {
      console.log(todos);
      res.status(200).send(todos);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const deleteTodo = (req, res) => {
  console.log("Hit the delete =>/api/todo/:id/:date");
  const { id, date } = req.params;
  req.app
    .get("db")
    .deleteTodo([id, req.user.id, date])
    .then(todos => {
      console.log(todos);
      res.status(200).send(todos);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

module.exports = {
  addTodo,
  getTodos,
  deleteTodo,
  updateTodo
};
