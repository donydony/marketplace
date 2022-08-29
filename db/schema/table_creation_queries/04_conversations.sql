DROP TABLE IF EXISTS conversations CASCADE;
CREATE TABLE conversations (
  id SERIAL PRIMARY KEY NOT NULL,
  sender_id INTEGER REFERENCES users(id) NOT NULL,
  receiver_id INTEGER REFERENCES users(id) NOT NULL,
  item_id INTEGER REFERENCES items(id) NOT NULL
);
