export async function GET(req) {
  console.log("in the putInCart api page");

  const { searchParams } = new URL(req.url);
  const pname = searchParams.get('pname');
  console.log(pname);



  const { MongoClient } = require('mongodb');
  //const url = 'mongodb://root:example@localhost:27017/';
  const url = 'mongodb+srv://root:myPassword123@cluster0.ijxgp6f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  const client = new MongoClient(url);
  const dbName = 'dominosapp';

  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('shopping_cart');

  const clearFirst = searchParams.get('clearFirst'); 

  if (clearFirst === 'true') {
    await collection.deleteMany({}); // clear cart only once at login
  }

  const myobj = { pname: pname, username: "sample@test.com" }; 
  const insertResult = await collection.insertOne(myobj);

  return Response.json({ data: "inserted" });
}
