require("dotenv").config();
const { IgApiClient } = require("instagram-private-api");
const axios = require("axios");

const postToInsta = async () => {
  try {
    const ig = new IgApiClient();
    ig.state.generateDevice(process.env.username_ig);

    const loggedInUser = await ig.account.login(
      process.env.username_ig,
      process.env.password_ig
    );

    console.log("Logged in successfully:", loggedInUser.username);

    // Fetch the image as a buffer using axios
    const response = await axios.get(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/2022.Papua.New.Guinea.earthquake.shakemap.jpg/712px-2022.Papua.New.Guinea.earthquake.shakemap.jpg",
      {
        responseType: "arraybuffer",
      }
    );
    const imageBuffer = Buffer.from(response.data, "binary");

    await ig.publish.photo({
      file: imageBuffer,
      caption: "testing 1 2 3",
    });

    console.log("Photo posted successfully!");
  } catch (error) {
    console.error("Error:", error.message);
  }
};

postToInsta();
