const express = require("express");
require('dotenv').config({ path: __dirname + "/.env" });

const { sequelize } = require("./db/postgres");

const userRoute = require("./routes/users");
const fitnessDetailsRoute = require("./routes/fitness");
const followRoute = require("./routes/follow");
const { initServer } = require("./utils/db");

const app = express();

app.use(express.json());
app.use(require("cors")());

app.use("/users", userRoute);
app.use("/fitness_details", fitnessDetailsRoute);
app.use("/follow", followRoute);

app.get("/health_check", async (req, res) => {
    try {
        await sequelize.authenticate();
        res.status(200).send();
    } catch (error) {
        res.status(503).send();
    }
});

const port = 3001;
// server
initServer().then((operationsSuccessful) => {
    if (operationsSuccessful) {
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    }
    else {
        console.log("Error in pre-init operations");
    }
});
