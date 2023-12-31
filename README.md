# snget
A utility to export &amp; import ServiceNow records from one instance to another.

## Setup from ZIP file
1. Download ZIP file
2. Extract ZIP
3. Open snget folder in VS Code
4. ```npm i``` in integrated Terminal
5. Rename or copy .env.example to .env
6. Update the target and source variables as needed
7. Run in the terminal ```node app.js```
8. Enter table:  ```incident```
9. Enter encoded query:  ```sys_id=A1234567890```
10. Check the target instance to make sure the records have inserted or updated based on your encoded query

## Setup from GitHub
1. Clone repo
2. Browse to the repo directory in the terminal ```cd snget```
3. Install dotenv dependency using ```npm i```
4. Rename or copy .env.example to .env
5. Update the target and source variables as needed
6. Run in the terminal ```node app.js```
7. Enter table:  ```incident```
8. Enter encoded query:  ```sys_id=A1234567890```
9. Check the target instance to make sure the records have inserted or updated based on your encoded query

## Setup from NPM
1. ```npm i snget```
2. Move the snget folder out of node_modules and into the project root directory
3. Move the node_modules folder into the snget folder
4. Change to the snget directory in terminal
5. Rename or copy .env.example to .env
6. Update the target and source variables as needed
7. Run in the terminal ```node app.js```
8. Enter table:  ```incident``` 
9. Enter encoded query:  ```sys_id=A1234567890```
10. Check the target instance to make sure the records have inserted or updated based on your encoded query

_This is temporary until I publish a better solution for NPM_
