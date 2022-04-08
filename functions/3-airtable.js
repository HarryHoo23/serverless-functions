require('dotenv').config();
// domain/.netlify/functions/1-hello
const Airtable = require('airtable-node');


const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appFthpC6vmpB7pVO').table('products')
  
exports.handler = async (event, context) => {
  try {
    const {records} = await airtable.list();
    const products = records.map((product) => {
      const { id } = product;
      const { name, image, price, desc } = product.fields;
      const url = image[0].url;
      return { id, name, url, price, desc };
    })
    console.log(products);
    return {
      headers: {
      'Access-Control-Allow-Origin': '*',
      },
      statusCode: 200, body: JSON.stringify(products)
    }
  } catch (error) {
    return {
      statusCode: 500, body: 'Server Error'
  }
  }
}