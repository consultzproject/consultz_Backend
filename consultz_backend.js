const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const https = require('https'); // Importing the 'https' module
const fs = require('fs'); // File system module for reading SSL certificates
const app = express();
require('dotenv').config();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    limit: '2mb',
    extended: true
}));
app.use("/files", express.static("files"));

const mongoose = require('./config/dbConfig');
const { check, validationResult } = require('express-validator');
const validator = {};
validator.check = check;
validator.validation = validationResult;

require('./routes/admin/contactRoutes')(app, validator);
require('./routes/admin/resumeRoutes')(app, validator);
require('./routes/admin/authRoutes')(app, validator);
require('./routes/admin/uploadRoutes')(app, validator);

// Read SSL certificate and key files
const options = {
  key: fs.readFileSync('path/to/private/key.pem'), // Provide the path to your private key
  cert: fs.readFileSync('path/to/certificate.pem') // Provide the path to your certificate
};

const port = process.env.PORT || 5000;

// Create HTTPS server
const server = https.createServer(options, app);

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
