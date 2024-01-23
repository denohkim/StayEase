const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


app.listen(PORT, function () {
    console.log(`Web server running at: http://localhost:${PORT}`);
    console.log("Type Ctrl+C to shut down the web server");
});