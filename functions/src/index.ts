/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import { onRequest } from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";

import * as functions from "firebase-functions";
import cors from "cors";
// import fetch from "node-fetch";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const corsHandler = cors({ origin: true });
const MONO_SECRET_KEY = functions.config().mono.secret_key;

export const linkAccountMono = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    try {
      const { email, name } = req.body;
      if (!email || !name) {
        res.status(400).send({ error: "Email and name are required" });
        return;
      }
      const uniqueRef = Math.random().toString(36).substring(2, 12);

      const response = await fetch(
        "https://api.withmono.com/v2/accounts/initiate",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            "mono-sec-key": MONO_SECRET_KEY,
          },
          body: JSON.stringify({
            customer: { email, name },
            meta: { ref: uniqueRef },
            scope: "auth",
            redirect_url: "https://mono.co",
          }),
        }
      );

      const data = await response.json();
      res.status(response.status).send(data);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal server error" });
    }
  });
});
