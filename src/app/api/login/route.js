import { MongoClient } from 'mongodb';

// MongoDB connection string
const url = 'mongodb+srv://root:myPassword123@cluster0.ijxgp6f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(url);

export async function POST(req) {
  // Log that the API route was hit
  console.log("in the login API");

  // Parse the JSON body from the POST request
  const { email, pass } = await req.json();

  // Log received credentials 
  console.log(email);
  console.log(pass);

  const dbName = 'dominosapp'; // Name of  database

  try {
    // Connect to MongoDB server
    await client.connect();
    console.log('Connected successfully to server');

    // Select the database and collection
    const db = client.db(dbName);
    const collection = db.collection('users'); // Changed to 'users' collection to match registration

    // Query for user matching the given email and password
    const user = await collection.findOne({ email, pass });

    // Check if a user was found
    const valid = !!user;

    if (valid) {
      console.log("login valid");
    } else {
      console.log("login invalid");
    }

    // Respond with JSON indicating login validity and user role (if valid)
    return new Response(
      JSON.stringify({
        data: valid ? "valid" : "invalid",
        role: valid ? user.role : null  // Send back user role if login is valid
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    // Log any error that occurs during connection or query
    console.error("MongoDB connection error:", error);

    // Respond with error message and status code 500 (internal server error)
    return new Response(
      JSON.stringify({ success: false, error: "Database error" }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } finally {
    // Always close the MongoDB client after request finishes
    await client.close();
  }
}
