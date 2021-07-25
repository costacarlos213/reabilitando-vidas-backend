"use strict";

var _app = require("./app");

_app.app.listen(process.env.SERVER_PORT || 3000, () => console.log("Server is running on port 3000"));