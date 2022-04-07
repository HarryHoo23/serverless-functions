// domain/.netlify/functions/2-basic-api

const item = require('../assets/data');



exports.handler = async (event, context) => {
  console.log(event);
  return {
    statusCode: 200, body: JSON.stringify(item)
  }
}