const express = require("express");
const bodyParser = require("body-parser");
const compress = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const carRoutes = require("./routes/carRoutes");
const customerRoutes = require('./routes/customerRoutes')
const customerAuthRoutes = require('./routes/customerAuthRoutes');


const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compress());
// secure apps by setting various HTTP headers
app.use(helmet());
// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use("/", carRoutes);
app.use("/", customerRoutes);
app.use("/", customerAuthRoutes);


// Catch unauthorised errors
app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({ error: err.name + ": " + err.message });
    }
});

module.exports = app;