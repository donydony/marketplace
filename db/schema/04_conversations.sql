DROP TABLE IF EXISTS conversations CASCADE;
CREATE TABLE conversations (
  id SERIAL PRIMARY KEY NOT NULL,
  sender_id REFERENCES users.id NOT NULL,
  receiver_id REFERENCES users.id NOT NULL,
  item_id REFERENCES items.id NOT NULL
);
