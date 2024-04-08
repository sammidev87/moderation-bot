const { model, Schema } = require("mongoose");

module.exports = model("moderation", new Schema({

    Guild: String,
    LogChannel: String,
    Whitelist: Array,

}));