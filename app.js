import { request } from 'https';
import { createInterface } from 'readline';
import 'dotenv/config'

// Function to make the POST request
function sendPostRequest(username, password, data) {
  const options = {
    hostname: process.env.TARGET_ENV + '.service-now.com',
    path: '/api/now/table/sys_trigger',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
    }
  };

  const req = request(options, (res) => {
    // Handle response from the server
    let responseData = '';
    res.on('data', (chunk) => {
      responseData += chunk;
    });

    res.on('end', () => {
      //console.log('Response:', responseData);
      console.log(res.statusCode + ' ' + 'Request successfully sent');
    });
  });

  req.on('error', (error) => {
    console.error('Error:', error);
  });

  // Send the data in the request body
  req.write(JSON.stringify(data));
  req.end();
}

// Function to prompt for username, password, and data
function promptForData() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

      // Prompt for data and populate the object
      rl.question('Enter table: ', (table) => {
        rl.question('Enter query: ', (query) => {
          
          const newQuery = encodeURIComponent(query);
          const encodedQuery = newQuery.replace(/'/g, '\\\'');
          
          const data = {
            name: 'Temp Export / Import Job',
            query: encodedQuery,
            script: "var request = new sn_ws.RESTMessageV2();request.setEndpoint('https://"+ process.env.SOURCE_ENV + ".service-now.com/api/now/table/"+table+"?sysparm_exclude_reference_link=true&sysparm_query="+ encodedQuery+"');request.setHttpMethod('GET');var user = " + "'" + process.env.SOURCE_USERNAME + "'" + ";var password = " + "'" + process.env.SOURCE_PASSWORD + "'"+ ";request.setBasicAuth(user, password);request.setRequestHeader('Accept', 'application/json');var response = request.execute();var rec = JSON.parse(response.getBody());var results = rec['result'];for(var i = 0; i < results.length; i++){var newRec = new GlideRecord(results[i].sys_class_name);if (!newRec.get(results[i].sys_id.toString())) {newRec.sys_id = results[i].sys_id.toString();} else {  gs.info(results[i].sys_id.toString());newRec.get(results[i].sys_id.toString());}for (key in results[i]) {  newRec[key] = results[i][key].toString();}newRec.setWorkflow(false);newRec.autoSysFields(false);newRec.update();}",
            trigger_type: 0,
            next_action: '2000-07-12 12:34:02'
          };

          sendPostRequest(process.env.TARGET_USERNAME, process.env.TARGET_PASSWORD, data);

          rl.close();
        });
      });
}
// Call the prompt function to start the process
promptForData();
