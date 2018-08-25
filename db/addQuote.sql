INSERT INTO quotes (
    text,
     author,user_id
      ) VALUES ($1,$2,$3) RETURNING*;