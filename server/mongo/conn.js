const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const dbName = "users";
const registerCollection = "register";
const userCollection = "users"

async function Connect()
{
  const client = new MongoClient(process.env.URI);
  await client.connect();
  return client.db(dbName);
}
async function AddRegister(user)
{
  try {
    db = await Connect()
    const collection = db.collection(registerCollection);
    await collection.insertOne(user);
    console.log(`${user.name} inserted successfully.\n`);
    return 201; //successfully inserted code
  } catch (err) {
    console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
    return 409; //error
  }
}
module.exports = {AddRegister};