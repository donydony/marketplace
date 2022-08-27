DROP TABLE IF EXISTS messages CASCADE;
CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  conversation_id REFERENCES conversations.id NOT NULL,
  sender_id REFERENCES users.id NOT NULL,
  time_created TIMESTAMP
);
