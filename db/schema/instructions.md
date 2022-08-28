# This folder is for creating the tables for the databases

## Instructions

- Choose either instructions

VERSION 1 : Log into your local database using the following format:
  ``` 
  psql -d database -U username -p port -h localhost 
  ```
- Add each table manually using a relative path command eg:
```
\i ./db/schema/table creation queries/01_users.sql
```


VERSION 2 : run the 'run.js' file using node (NOTE: extremely slow since it runs many ASYNC operations back to back) eg:
```
node ./db/schema/run.js
```


### Log into PSQL and run 'SELECT * FROM' commands to check tables were created sucessfully 
