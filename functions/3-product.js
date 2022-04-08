require('dotenv').config();
// domain/.netlify/functions/1-hello
const Airtable = require('airtable-node');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appFthpC6vmpB7pVO').table('products')

exports.handler = async (event, context) => {
  console.log(event);
  const { id } = event.queryStringParameters;
  if (id) {
    try {
      const product = await airtable.retrieve(id);
      if (product.error) {
        return {    
          statusCode: 404, body: 'No product.'
        }
      }
      return { 
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        statusCode: 200, body: JSON.stringify(product)
      }
    } catch (error) {
      return {    
        statusCode: 404, body: 'Cannot find the product.'
      }
    }
  } else {
    return {    
      statusCode: 400, body: 'Provide product id please.'
    }
  }
  
}