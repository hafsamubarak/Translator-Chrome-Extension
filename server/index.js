const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
const translate = require("@vitalets/google-translate-api");
app.get("/", (req, res) => {
  res.send("API running...");
});
app.get("/api/translator", async function (req, res) {
  const keyword = req.query.keyword; //hello
  const input = req.query.input; //de
  const output = req.query.output; //uk
  if (keyword && input && output) {
    const result = await translate(keyword, { from: input, to: output });
    console.log("hiiiiiiiiiiiiiiiii", result);
    if (result.text && result.text.length > 0) {
      return res.status(200).json(result);
    } else {
      return res.status(401).json({ message: "failed" });
    }
  }
});
app.listen(3000, function () {
  console.log("successful running on port 3000");
});
