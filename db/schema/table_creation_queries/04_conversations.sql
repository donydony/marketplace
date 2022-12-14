DROP TABLE IF EXISTS conversations CASCADE;
CREATE TABLE conversations (
  id SERIAL PRIMARY KEY NOT NULL,
  sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  receiver_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  item_id INTEGER REFERENCES items(id) ON DELETE CASCADE NOT NULL,
  UNIQUE (sender_id, receiver_id, item_id),
  CHECK (sender_id != receiver_id)
);

