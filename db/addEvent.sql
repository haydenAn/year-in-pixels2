INSERT INTO events (
    user_id,
   title,
      text,
      location,
      important,
      event_date
      ) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;