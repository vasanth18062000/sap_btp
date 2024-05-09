const oauthclient = require('client-oauth2');
const request = require('request-promise');
const express = require('express');
const e = require('express');
const env = require("dotenv").config();
const app = express();
app.use(json())
app.use(urlencoded({
   extended:false
}))

const SERVICE_URL="https://e9a3e9d8trial-dev-proposal-srv.cfapps.us10-001.hana.ondemand.com/v2/odata/v4/proposal"

const VCAP_SERVICES= JSON.parse(process.env.VCAP_SERVICES);
const XSUAA_URL= VCAP_SERVICES.xsuaa [0].credentials.url;
const XSUAA_CLIENTID = VCAP_SERVICES.xsuaa[0].credentials.clientid;
const XSUAA_CLIENTSECRET = VCAP_SERVICES. xsuaa[0].credentials.clientsecret;


const _getAccessToken = ()=> {
   return new Promise((resolve, reject) =>{
   const client = new oauthclient({
      accessTokenUri: XSUAA_URL + '/oauth/token',
      clientId: XSUAA_CLIENTID,
      clientsecret: XSUAA_CLIENTSECRET,
      scopes: []
   });
   client.owner.gettoken (process.env.USER_EMAIL, process.env.PASSWORD)
   .catch((error)=>{
   reject ({ message: 'Error: failed to get access token', error:error});
   return;
}).then((result)=>
{
   resolve({
      access_token:result.accessToken
   });
});
});
}
const _doQuery = function (serviceurl, accessToken){
return new Promise(function (resolve, reject) {
const options={
   url: serviceurl,
   resolvewithFullResponse: true,
   headers:{
Authorization: 'Bearer ' + accessToken,
Accept: 'application/json'
   }
};
request(options)
.then((response) => {
if (response && response.statusCode == 200) {
resolve({responseBody: response.body });
}
reject({message:'Error while calling odata service'});
})
.catch((error)=>{
   reject({message:'Error while calling odata service',error:e});
});
});
};

const port = process.env.PORT || 3000; 
app.listen(port, function (){
console.log('=> Server running. Port: ' + port);
console.log(port);
})

app.get('/$metadata', function (req, res) {
_getAccessToken()
.then((result)=>{
return _doQUERY(SERVICE_URL, result.accessToken);
})
.then((result) =>{
res.send ('<h2>RESULT: </h2>called OData service QUERY and received response:<p>'+JSON.stringify(result.responseBody)+'</p>');
})
.catch((error) =>{
console.log(error.message + 'Reason:'+error.error);
res.send('ERROR: ' + error.message +'-FULL ERROR'+error.error);
});
});





// const VCAP_SERVICES = JSON.parse(process.env.VCAP_SERVICES);
// const conSrvCred = VCAP_SERVICES.connectivity[0].credentials;
 
// app.get('/', function (req, res) {
//     res.send('Hello World');
// })
 
// app.get('/Customers', async function (req, res) {
//     const connJwtToken = await _fetchJwtToken(conSrvCred.token_service_url, conSrvCred.clientid, conSrvCred.clientsecret);
 
//     var connOptions = {
//         serverNode: 'hxehost_VH:2000', // Virtual host specified in the Cloud Connector
//         proxyUsername: connJwtToken,
//         proxyPort: conSrvCred.onpremise_socks5_proxy_port,
//         proxyHostname: conSrvCred.onpremise_proxy_host,
//         //proxyScpAccount: 'myLocID',  // Cloud Connector's location ID if specified in the Cloud Connector
//                                        // A location ID is used when multiple Cloud Connectors are connected to the same subaccount
//         UID: 'KARTHIKEYAN',
//         PWD: 'Ladera123'
//         //traceFile: 'stdout',
//         //traceOptions: 'sql=warning'
//     };
//     var connection = hana.createConnection();
//     connection.connect(connOptions, function(err) {
//         if (err) {
//             return console.error(err);
//         }
//         var sql = 'select * from KARTHIKEYAN.LADERATECHNOLOGY;';
//         var rows = connection.exec(sql, function(err, rows) {
//             if (err) {
//                 return console.error(err);
//             }
//             console.log(rows);
//             res.send(rows);
//             connection.disconnect(function(err) {
//                 if (err) {
//                     return console.error(err);
//                 }  
//             });
//         });
//     });
// })
 
// // const port = process.env.PORT || 3000;
// var server = app.listen(port, function () {
//      var host = server.address().address
//      var port = server.address().port
//      console.log("Example app listening at http://%s:%s", host, port)
// })
 
// const _fetchJwtToken = async function(oauthUrl, oauthClient, oauthSecret) {
//     return new Promise ((resolve, reject) => {
//         const tokenUrl = oauthUrl + '/oauth/token?grant_type=client_credentials&response_type=token'  
//         const config = {
//             headers: {
//                Authorization: "Basic " + Buffer.from(oauthClient + ':' + oauthSecret).toString("base64")
//             }
//         }
//         axios.get(tokenUrl, config)
//         .then(response => {
//            resolve(response.data.access_token)
//         })
//         .catch(error => {
//            reject(error)
//         })
//     })  
// }