DROP TABLE IF EXISTS items CASCADE;
CREATE TABLE items (
  id SERIAL PRIMARY KEY NOT NULL,
  seller_id REFERENCES users.id NOT NULL
  title VARCHAR(255) NOT NULL,
  img_url TEXT NOT NULL,
  price INTEGER NOT NULL,
  type VARCHAR(30),
  description TEXT,
  date_added: TIMESTAMP NOT NULL,
  sold_status BOOLEAN NOT NULL
);
