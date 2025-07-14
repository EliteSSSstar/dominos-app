export async function GET(req, res) {
  console.log("in the api page");

  const { MongoClient } = require('mongodb');

  //const url = 'mongodb://root:example@localhost:27017/';

  const url = 'mongodb+srv://root:myPassword123@cluster0.ijxgp6f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  const client = new MongoClient(url);

  const dbName = 'dominosapp'; // use your actual DB name here

  try {
    await client.connect();
    console.log('Connected successfully to server');

    const db = client.db(dbName);
    const collection = db.collection('products');

    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);

    return Response.json(findResult);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return Response.json({ error: 'Could not fetch products' });
  } finally {
    await client.close();
  }
}
