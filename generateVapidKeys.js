import webPush from "web-push";
import { writeFileSync } from "fs";
import { config } from "dotenv";

config();

const vapidKeys = webPush.generateVAPIDKeys();

const envContent = `
EMAIL=test@test.com
VAPID_PUBLIC_KEY=${vapidKeys.publicKey}
VAPID_PRIVATE_KEY=${vapidKeys.privateKey}
`;

writeFileSync(".env", envContent);
