import express from "express";
import webpush from "web-push";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import pushNotificationRoutes from "./routes/pushNotification.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("/ route");
});
app.use("/api/pushNotification", pushNotificationRoutes);

const port = 4000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

export default app;
