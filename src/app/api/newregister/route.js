import { MongoClient } from 'mongodb';

export async function GET(request) {
  // Extract search parameters from the URL
  const { searchParams } = new URL(request.url);

  // Pull values sent from the client form via query parameters
  const email = searchParams.get('email');
  const pass = searchParams.get('pass');
  const tel = searchParams.get('tel');
  const address = searchParams.get('address');
  const email2 = searchParams.get('email2');
  const pass2 = searchParams.get('pass2');

  // Debug log to trace the input data
  console.log("In the newregister API");
  console.log(email, pass, tel, address, email2, pass2);

  // Basic validation: check required fields are filled and confirm fields match
  if (!email || !pass || email !== email2 || pass !== pass2) {
    // Return HTTP 400 Bad Request if validation fails
    return Response.json(
      { data: "invalid", message: "Validation failed. Emails or passwords do not match." },
      { status: 400 }
    );
  }

  // MongoDB connection string and database name
  const url = 'mongodb+srv://root:myPassword123@cluster0.ijxgp6f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  const client = new MongoClient(url);
  const dbName = 'dominosapp';

  try {
    // Connect to the MongoDB client
    await client.connect();

    // Get reference to the database and users collection
    const db = client.db(dbName);
    const users = db.collection('users');

    // Check if the email is already registered
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      // Respond with conflict status if email exists
      return Response.json(
        { data: "invalid", message: "Email already registered." },
        { status: 409 }
      );
    }

    // Construct a new user object
    const newUser = { email, pass, tel, address, role: "customer"};

    // Insert the new user document into the collection
    await users.insertOne(newUser);

    // Respond with success message on successful registration
    return Response.json({ data: "valid", message: "User registered successfully." });

  } catch (err) {
    // Log any errors that occur during the process
    console.error("Error inserting user:", err);

    // Return server error status to client
    return Response.json(
      { data: "error", message: "Server error. Could not register user." },
      { status: 500 }
    );

  } finally {
    //close the database connection after operation completes
    await client.close();
  }
}
