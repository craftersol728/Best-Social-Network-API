const mongoose = require ('mongoose')
const User = require("./User")

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost/testdb")

const user = new User({ name: "Kyle" , age: 26 })
user.save().then(() => console.log("user saved"))



