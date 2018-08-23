INSERT INTO todos (
    user_id,
     checked,
      text,
      todo_date
      ) VALUES ($1,$2,$3,$4);
select * from todos where user_id=$1 and todo_date=$4;