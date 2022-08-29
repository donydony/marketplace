DROP TABLE IF EXISTS messages CASCADE;
CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  conversation_id INTEGER REFERENCES conversations(id) NOT NULL,
  sender_id INTEGER REFERENCES users(id) NOT NULL,
  time_created TIMESTAMP NOT NULL,
  message VARCHAR(300) NOT NULL
);
