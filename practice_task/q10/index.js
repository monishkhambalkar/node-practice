const express = require("express");
const axios = require("axios");

const app = express();

app.get("/fetch-data", async (req, res) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    console.log(response.data);
    res.json({
      message: "Data nfetch succefully",
      data: response.data,
    });
  } catch (error) {
    console.log(`Error while fetching data ${error}`);
    res.status(500).json({
      message: "Error fetching data from api",
      error: error.message,
    });
  }
});

const PORT = 3010;
app.listen(PORT, () => {
  console.log(`YOUR SERVER IS RUNNING ON http://localhost:${PORT}`);
});
