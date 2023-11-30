const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const dbName = "users";
const registerCollection = "register";
const userCollection = "users"
let client;
async function Connect()
{
  client = new MongoClient(process.env.URI);
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
  } finally {
  if (client) {
    await client.close();
  }
}
}
async function Login(email,password)
{
  db = await Connect()
  const collection = db.collection(registerCollection);
  try {
    const user = await collection.findOne({ email, password });
    console.log(user);
    return user;
  } catch (err) {
    console.error(`Error finding user: ${err}`);
    throw err;
  } finally {
    await db.client.close();
  }
}
async function List() {
  let client;
  try {
    client = await Connect();
    const collection = client.collection(registerCollection);
    const data = await collection.find().toArray();
    return data;
  } catch (err) {
    console.error(`Error finding users: ${err}`);
    throw err;
  } finally {
    if (client) {
      await db.client.close();
    }
  }
}
module.exports = {AddRegister, Login, List};