import { Board } from "../../../Core/Entities/Board";
const mongoose = require('mongoose');

const Users = mongoose.model('Users', {
  name: String,
  email: String,
  senha: String,
  boards: Array<Board>
});

module.exports = Users;