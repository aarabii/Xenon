const mongoose = require('mongoose');

module.exports = mongoose.model(
    'infoSchema',
    new mongoose.Schema({
        userID: String,
        name: String,
        cource: String,
        github: String,
        instagram: String,
        aboutYou: String,
        intrests: String,
        hobbies: String,
        skills: String,
        bio: String,
    })
)