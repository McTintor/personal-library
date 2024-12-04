const { findUserByUsername, findUserById, insertUser } = require('../db/queries');

class User {
  constructor({ id, username, firstname, lastname, email, password }) {
    this.id = id;
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
  }

  static async findByUsername(username) {
    const userData = await findUserByUsername(username);
    return userData ? new User(userData) : null;
  }

  static async findById(id) {
    const userData = await findUserById(id);
    return userData ? new User(userData) : null;
  }

  static async create({ username, firstname, lastname, password, email }) {
    const userData = await insertUser(username, firstname, lastname, password, email);
    return new User(userData);
  }
}

module.exports = User;
