CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    authid VARCHAR(50),
    displayName VARCHAR(50),
    profile_pic VARCHAR(200),
    ilgi_title VARCHAR(25),
    user_created_at date
);
CREATE TABLE pixels (
    id SERIAL PRIMARY KEY,
    owner_id integer references users(id),
    pixel_date date
);
CREATE TABLE colors(
    id SERIAL PRIMARY KEY,
    colorvalue VARCHAR(10),
    opacity decimal,
    positive boolean,
    color_data decimal,
    pixel_id integer references pixels(id)
);
CREATE TABLE pixel_content(
    id SERIAL PRIMARY KEY,
    pixel_id integer references pixels(id),
    text VARCHAR(1000),
    img_url VARCHAR(300),
    pixel_date date
)
CREATE TABLE todos(
    id SERIAL PRIMARY KEY,
    checked boolean,
    text VARCHAR(150),
    pixel_id integer references pixels(id)
)
CREATE TABLE quotes(
    id SERIAL PRIMARY KEY,
    text VARCHAR(300),
    author VARCHAR(100),
    tags VARCHAR(50),
    saved_date date
)
 CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200),
    text VARCHAR(1000),
    location VARCHAR(100),
    important boolean,
    event_date date,
    pixel_id integer references pixels(id)
); 
 
