"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_service_1 = require("./services/database.service");
const ridersRouter = require('../models/rider.ts');
const app = (0, express_1.default)();
const port = 8080; // default port to listen
// ** TODO ** Replace this code with a call to your games router class to handle all calls to /games endpoint
(0, database_service_1.connectToDatabase)()
    .then(() => {
    app.use("/dispatchRiders", ridersRouter);
    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });
})
    .catch((error) => {
    console.error("Database connection failed", error);
    process.exit();
});
//# sourceMappingURL=index.js.map