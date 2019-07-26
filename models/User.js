const db = require('../database/dbConfig');

module.exports = {
    get() {
        return db("users");
    },

    async findById(id) {
        const user = await db("users").where({ id }).first();
        return user;
    },

    async findByUsername(username) {
        const user = await db("users").where({ username }).first();
        return user;
    },

    async add(user) {
        const [id] = await db("users").insert(user);
        return this.findById(id);
    },

};