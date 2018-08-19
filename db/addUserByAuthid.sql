INSERT INTO users (authid,displayName,profile_pic,ilgi_title,user_created_at) VALUES ($1, $2,$3,$4,NOW()) RETURNING *;
