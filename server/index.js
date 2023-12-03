const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
require('dotenv').config();
const {AddRegister, Login, List, GetUserByEmail, ListReg, DeleteReg, ApproveReg, DeleteUser, GetUserById, UpdateUser } = require("./mongo/conn");
const PORT = 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post('/login', async(req, res) => {
    //console.log("m",req.body)
    const { email, password } = req.body;
    const data = await Login(email,password);
    console.log(data);
    res.status(200).json(data);
});
app.post('/register', async(req, res) => {
    console.log(req.body);//here hackers can exploit
    user = filterKeys(req.body,['email','password','name','job','birthDate','phoneNumber','position','hireDate'])//the filter is for unwanted fields that hackers can add in the request
    code = await AddRegister(user)
    res.json({code});
    //201 for successfully created 409 for conflict
});
app.get('/list', async(req,res) => {
  res.json(await List())
});
function filterKeys(data, allowedKeys) {
  const filteredData = {};
  allowedKeys.forEach(key => {
    if (data[key] !== undefined) {
      filteredData[key] = data[key];
    }
  });
  return filteredData;
}
app.get('/profile', async(req,res) =>{
  console.log(req.query);
  data = await GetUserByEmail(req.query.email);
  console.log(data);
  res.json(data);
});
app.get('/approve', async(req,res) =>{
  res.json(await ListReg())
});
app.delete('/reg', async (req, res) => {
  console.log(req.body.id);
  res.json(await DeleteReg(req.body.id));
});

app.post('/reg', async (req, res) => {
  console.log(req.body.id);
  res.json(await ApproveReg(req.body.id));
});
app.delete('/del', async(req, res) =>{
  console.log(req.body);
  res.json(await DeleteUser(req.body.id));
})
app.get('/EditUser', async(req,res) => {
  res.json(await GetUserById(req.query.id))
})
app.post('/SaveUserChanges', async(req,res) =>{
  data = req.body;
  res.json(await UpdateUser(data.userId,data.userData));
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
