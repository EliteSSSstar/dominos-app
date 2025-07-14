import { MongoClient } from 'mongodb';

const url = 'mongodb://root:example@localhost:27017';  // your MongoDB connection string
const client = new MongoClient(url);

export async function GET(req) {

  // Make a note we are on
  // the api. This goes to the console.
  console.log("in the api page");

  // get the values
  // that were sent across to us.
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const pass = searchParams.get('pass');

  console.log(email);
  console.log(pass);

  const dbName = 'dominosapp'; // database name

  // database call goes here
  try {
    await client.connect();
    console.log('Connected successfully to server');

    const db = client.db(dbName);
    const collection = db.collection('login'); // collection name

    // Find user by email
    const findResult = await collection.findOne({ username: email });

    let valid = false;
    if (findResult && findResult.pass === pass) {
      valid = true;
      console.log("login valid");
    } else {
      valid = false;
      console.log("login invalid");
    }

    // at the end of the process we need to send something back.
    return new Response(JSON.stringify({ data: "" + valid + "" }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("MongoDB connection error:", error);
    return new Response(JSON.stringify({ data: "error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  } finally {
    await client.close();
  }
}
