const mongoose = require("mongoose");
const nconf = require("nconf");
const chalk = require("chalk");

// Attach connection details and set up connection 
mongoose.connect(nconf.get("mongodbURL"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// validate MongoDB connection
const db = mongoose.connection;

// events
db.on("error", () => {
    console.log("MongoDB connection error");
    process.exit(0);
});

// Connect tp mongodb
db.once("open", function(callback) {
    console.log(
        `${chalk.red("✓")} Connected to ${chalk.red("MongoDB")} Store`
    );
});

module.exports = {
    mongoConnection: db,
};