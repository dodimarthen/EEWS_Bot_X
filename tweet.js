require("dotenv").config();
const { TwitterApi } = require("twitter-api-v2");

const client = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_KEY_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
});

async function tweet(message) {
  try {
    const response = await client.v2.tweet(message);
    console.log("Tweet sent successfully:", response);
  } catch (error) {
    console.error("Error sending tweet:", error);
  }
}

async function getAccountInfo() {
  try {
    const user = await client.v2.me();
    console.log("Account info:", user);
  } catch (error) {
    console.error("Error fetching account info:", error);
  }
}

getAccountInfo();
tweet("Hello Twitter using node js!");
