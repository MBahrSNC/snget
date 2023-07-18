# snGet
A utility to export &amp; import ServiceNow records from one instance to another.
## Setup
1. ```npm i @lvl0-io/snget```
2. Rename or copy .env.example to .env
3. Update the target and source variables as needed
4. Run in the terminal ```node app.js```
5. Enter table:  ```incident``` 
6. Enter encoded query:  ```sys_id=A1234567890```
7. Check the target instance to make sure the records have inserted or updated based on your encoded query
