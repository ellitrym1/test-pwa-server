import express from "express";
import webpush from "web-push";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

webpush.setVapidDetails(
    "mailto:" + process.env.EMAIL,
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

let subscriptions = [];

router.get("/applicationServerKey", (req, res) => {
    res.json({
        publicKey: process.env.VAPID_PUBLIC_KEY,
    });
});

router.get("/checkSubscription", (req, res) => {
    res.json(subscriptions);
});

router.post("/subscribe", (req, res) => {
    const subscription = req.body;
    subscriptions.push(subscription);
    res.sendStatus(200);
});

router.post("/send", (req, res) => {
    const { title, body } = req.body;

    const payload = JSON.stringify({
        title: title,
        body: body,
    });

    if (subscriptions.length === 0) {
        console.log("No subscriptions found.");
        return res.sendStatus(200);
    }

    Promise.all(
        subscriptions.map((subscription) => {
            return webpush
                .sendNotification(subscription, payload)
                .catch((error) => {
                    console.error("Error sending push notification:", error);
                });
        })
    )
        .then(() => {
            console.log("Push notifications sent successfully.");
            res.sendStatus(200);
        })
        .catch((error) => {
            console.error("Error sending push notification:", error);
            res.sendStatus(500);
        });
});

export default router;
