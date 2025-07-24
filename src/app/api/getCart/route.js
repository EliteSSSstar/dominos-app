import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://root:myPassword123@cluster0.ijxgp6f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'dominosapp';
const collectionName = 'shopping_cart';

export async function GET() {
  const client = new MongoClient(uri);

  try {
    console.log("in the getCart API route");

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Only return items for the hardcoded user (can be dynamic later)
    const items = await collection.find({ username: "sample@test.com" }).toArray();

    return new Response(JSON.stringify({ items }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error("Error fetching cart:", err);
    return new Response(JSON.stringify({ error: 'Failed to fetch cart' }), {
      status: 500,
    });
  } finally {
    await client.close();
  }
}
