require("dotenv").config();
const { TwitterApi } = require("twitter-api-v2");
const fs = require("fs");

const client = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_KEY_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
});

async function uploadMedia(mediaPath) {
  try {
    const mediaData = fs.readFileSync(mediaPath); // Read the media file (image)
    const mediaType = "shakemap/png"; // Define the media type (adjust as needed for different formats)

    // Upload media to Twitter
    const mediaId = await client.v1.uploadMedia(mediaData, {
      mimeType: mediaType,
    });

    console.log("Media uploaded successfully. Media ID:", mediaId);
    return mediaId;
  } catch (error) {
    console.error("Error uploading media:", error);
  }
}

async function tweetWithMedia(message, mediaPath) {
  try {
    const mediaId = await uploadMedia(mediaPath); // Upload the media and get media_id

    if (mediaId) {
      // Post tweet with the uploaded media
      const response = await client.v2.tweet(message, {
        media: { media_ids: [mediaId] },
      });
      console.log("Tweet with media sent successfully:", response);
    }
  } catch (error) {
    console.error("Error sending tweet with media:", error);
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
tweetWithMedia("Testing tweeting with media by node js!", "shakemap.png");
