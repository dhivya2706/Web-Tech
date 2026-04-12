const express = require("express");
const multer = require("multer");
const fs = require("fs");
const Jimp = require("jimp");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use("/colored", express.static("colored"));


const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    cb(null, Date.now() + "." + ext);
  }
});

const upload = multer({ storage });

app.post("/insert", upload.single("image"), async (req, res) => {
  try {
    if (!req.file)
      return res.send("No file uploaded");
    const file = req.file.filename;
    const img = await Jimp.read("./uploads/" + file);
    img
      .convolute([
        [0, -1, 0],
        [-1, 5, -1],
        [0, -1, 0]
      ])
      .contrast(0.3)
      .brightness(0.05)
      .write("./colored/" + file);
    const newData = {
      id: Date.now(),
      name: req.body.name ? req.body.name : "image",
      original: file,
      colored: file
    };
    let data = JSON.parse(fs.readFileSync("data.json"));
    data.push(newData);
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
    res.json({
      message: "Super Resolution Done",
      file: file
    });
  }
  catch (err) {
    console.log(err);
    res.send(err.message);
  }
});

app.get("/view", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json"));
  res.json(data);
});

app.delete("/delete/:id", (req, res) => {
  let data = JSON.parse(fs.readFileSync("data.json"));
  data = data.filter(item => item.id != req.params.id);
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
  res.send("Deleted");
});

app.put("/update/:id", (req, res) => {
  let data = JSON.parse(fs.readFileSync("data.json"));
  data.forEach(item => {
    if (item.id == req.params.id)
      item.name = req.body.name;
  });
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
  res.send("Updated");
});

app.get("/search/:name", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json"));
  const result = data.filter(item =>
    item.name &&
    item.name.toLowerCase().includes(req.params.name.toLowerCase())
  );
  res.json(result);
});

app.listen(5000, () =>
  console.log("Server Running on Port 5000")
);