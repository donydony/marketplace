# This folder is for RANDOMDLY generating rows for the tables


## Instructions

### Make sure to check that your .env file is configured properly!!

- Install the faker (fake data generator) and bcrypt (password hasher) packages

```
npm install --save-dev @faker-js/faker
npm install bcryptjs
```

- Please run the js files in order due to tables being dependent on one another (ie table 2 uses foreign keys from table 1; therefore table 1 must have rows before making rows for table 2)

- Please run the js files from the command line using node and a number argument for number of rows created (may take several seconds due to async)

For example to create 5 users in the Users Table (Table 1):
```
node 01_users_random_seeds.js 5
```

- True can be added to the end of the command to console.log the newly created objects for viewing; false or null can be also be used and are the default
```
node 01_users_random_seeds.js 5 true

{
  id: 8,
  username: 'Winnifred99',
  password: '$2a$10$8pF7ZzuLXSQ.YKM2pjyWJO25k3WvncRyZMj5WmbciIRFIxd9S4Kku',
  admin: true,
  user_pic: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/192.jpg',
  first_name: 'Agnes',
  last_name: 'Mueller',
  address: '2004 Jasen Knolls',
  description: 'grow value-added markets'
}

```


- Furthermore, for the messages table, conversation id and sender id can be specified to force creation of messages for a specific conversation(process.argv[5]) by a specific sender(process.argv[4]) BUT true/false must be used at process.argv[3]:

```
node 05_msgs_random_seeds 5 false 1 6 

```

The above example has a sender_id of 1 and a conversation_id of 6. You can still apply the specific conversation 

#### NOTE: all randomly generated users current have a password of 'password' which is hashed; this is only for ease of testing and new users on the actual app are allowed to set an unique password(provided they can remember it as it is not stored in the database!!)


### Log into PSQL and run 'SELECT * FROM' commands to check rows were created sucessfully 