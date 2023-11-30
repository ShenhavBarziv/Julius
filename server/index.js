const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
require('dotenv').config();
const {AddRegister} = require("./mongo/conn");
const PORT = 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post('/login', (req, res) => {
    //console.log("m",req.body)
    const { email, password } = req.body;
    const user = users.find((user) => user.email === email && user.password === password);
    console.log(user);
    if (user) {
    
      res.status(200).json({ success: true, data: `Hello, ${email}!` });
    } else {
      res.status(400).json({ success: false, data: 'Incorrect email or password' });
    }
  });
app.post('/register', async(req, res) => {
    console.log(req.body);//here hackers can exploit
    user = filterKeys(req.body,['email','password','name','job','birthDate','phoneNumber','position','hireDate'])//the filter is for unwanted fields that hackers can add in the request
    code = await AddRegister(user)
    res.status(code).send();
    //201 for successfully created 409 for conflict
})
function filterKeys(data, allowedKeys) {
  const filteredData = {};
  allowedKeys.forEach(key => {
    if (data[key] !== undefined) {
      filteredData[key] = data[key];
    }
  });
  return filteredData;
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
