import { Handler } from "@netlify/functions";
import fetch from "node-fetch";

const MONO_SECRET_KEY = process.env.MONO_SECRET_KEY;

export const handler: Handler = async (event) => {
  try {
    // Parse the request body
    const { email, name } = JSON.parse(event.body || "{}");

    if (!email || !name) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Email and name are required" }),
      };
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

    return {
      statusCode: response.status,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
