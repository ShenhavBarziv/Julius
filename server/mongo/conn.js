const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const dbName = "users";
const registerCollectionName = "register";
const userCollectionName = "users";

async function Connect() {
  const client = new MongoClient(process.env.URI);
  await client.connect();
  return client.db(dbName);
}



async function AddRegister(user) {
  try {
    const db = await Connect();
    const registerCollection = db.collection(registerCollectionName);
    const existingUser = await registerCollection.findOne({ email: user.email });

    if (existingUser) {
      console.log(`User with email ${user.email} already exists in the register collection.`);
      return 409; // Conflict status code
    }
    user.admin = false;
    const collection = db.collection(registerCollectionName);
    await collection.insertOne(user);
    console.log(`${user.name} inserted successfully.\n`);
    return 201; // Successfully inserted status code
  } catch (err) {
    console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
    return 500; // Internal Server Error status code
  }
}

async function Login(email, password) {
  try {
    const db = await Connect();
    let collection = db.collection(userCollectionName);
    let msg = "msg";
    const user = await collection.findOne({ email, password });

    if (!user) {
      collection = db.collection(registerCollectionName);
      const user1 = await collection.findOne({ email, password });

      if (user1) {
        msg = "Your user is not approved.\nPlease contact your supervisor";
      } else {
        msg = "email or password are incorrect";
      }
    } else {
      msg = "connected successfully";
    }

    console.log(user);
    return { user, msg };
  } catch (err) {
    console.error(`Error finding user: ${err}`);
    throw err;
  }
}

async function List() {
  try {
    const db = await Connect();
    const collection = db.collection(userCollectionName);
    const data = await collection.find().toArray();
    return data;
  } catch (err) {
    console.error(`Error finding users: ${err}`);
    throw err;
  }
}

async function GetUserByEmail(email) {
  try {
    const db = await Connect();
    const collection = db.collection(userCollectionName);
    const user = await collection.findOne({ email });
    const keysToKeep = ['email', 'name', 'job', 'birthDate', 'phoneNumber', 'position', 'hireDate'];
    const ans = Object.fromEntries(
      Object.entries(user).filter(([key]) => keysToKeep.includes(key))
    );
    return ans;
  } catch (err) {
    console.error(`Error finding user by email: ${err}`);
    throw err;
  }
}
async function ListReg() {
  try {
    const db = await Connect();
    const collection = db.collection(registerCollectionName);
    const data = await collection.find().toArray();
    if(!data){return {};}
    return data;
  } catch (err) {
    console.error(`Error finding users: ${err}`);
    throw err;
  }
}
async function DeleteReg(id) {
  try {
    const db = await Connect();
    const collection = db.collection(registerCollectionName);
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      console.log(`User with id ${id} deleted successfully from the register collection.`);
      return {"code":200}; // Success status code
    } else {
      msg = `User with id ${id} not found in the register collection.`;
      console.log(msg);
      return {"code":404,msg}; // Not Found status code
    }
  } catch (err) {
    console.error(`Error deleting user from register collection: ${err}`);
    return {"code":500,"msg":"Error"};
  }
}

async function ApproveReg(id) {
  try {
    const db = await Connect();
    const registerCollection = db.collection(registerCollectionName);
    const userCollection = db.collection(userCollectionName);

    // Find the user to be approved in the register collection
    const userToApprove = await registerCollection.findOne({ _id: new ObjectId(id) });

    if (userToApprove) {
      // Insert the user into the user collection
      await userCollection.insertOne(userToApprove);
      // Delete the user from the register collection
      await registerCollection.deleteOne({ _id: new ObjectId(id) });

      console.log(`User with id ${id} approved and moved to the users collection.`);
      return { "code": 200 }; // Success status code
    } else {
      console.log(`User with id ${id} not found in the register collection.`);
      return { "code": 404 }; // Not Found status code
    }
  } catch (err) {
    console.error(`Error approving user in register collection: ${err}`);
    return { "code": 500 }; // Internal Server Error status code
  }
}
async function DeleteUser(id) {
  try {
    const db = await Connect();
    const collection = db.collection(userCollectionName);
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      console.log(`User with id ${id} deleted successfully from the user collection.`);
      return {"code":200}; // Success status code
    } else {
      msg = `User with id ${id} not found in the user collection.`;
      console.log(msg);
      return {"code":404,msg}; // Not Found status code
    }
  } catch (err) {
    console.error(`Error deleting user from user collection: ${err}`);
    return {"code":500,"msg":"Error"};
  }
}
async function GetUserById(userId)
{
  try {
    console.log(userId);
    const db = await Connect();
    const collection = db.collection(userCollectionName);
    const user = await collection.findOne({ _id: new ObjectId(userId) });
    
    if (user) {
      const keysToKeep = ['email', 'name', 'job', 'birthDate', 'phoneNumber', 'position', 'hireDate', 'admin'];
    const ans = Object.fromEntries(
      Object.entries(user).filter(([key]) => keysToKeep.includes(key))
    );
      console.log('Found user:', ans);
      return ans;
    } else {
      console.log('User not found');
      return {};
    }
  } catch (err) {
    console.error(`Error finding user by ID: ${err}`);
  }
}
async function UpdateUser(userId, userData) {
  try {
    client = new MongoClient(process.env.URI);
    await client.connect();
    
    const db = client.db(dbName);
    const collection = db.collection(userCollectionName);

    const result = await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: userData }
    );

    if (result.modifiedCount === 1) {
      console.log(`User with ID ${userId} updated successfully.`);
      return { code: 200, msg: 'User updated successfully' };
    } else {
      console.log(`User with ID ${userId} not found.`);
      return { code: 404, msg: 'User not found' };
    }
  } catch (error) {
    console.error(`Error updating user: ${error}`);
    return { code: 500, msg: 'Error' };
  } finally {
    await client.close();
  }
}

module.exports = { AddRegister, Login, List, GetUserByEmail, ListReg, DeleteReg, ApproveReg, DeleteUser, GetUserById, UpdateUser };
