const express = require("express");
const multer = require("multer");
const Jimp = require("jimp");
const cors = require("cors");

const { MongoClient, ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/colored", express.static("colored"));


// ================== MongoDB Connection ==================
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

let db;

async function connectDB() {
  await client.connect();
  db = client.db("imageDB");
  console.log("MongoDB Connected");
}


// ================== Mongoose (Small Part) ==================
mongoose.connect("mongodb://127.0.0.1:27017/imageDB")
  .then(() => console.log("Mongoose Connected"))
  .catch(err => console.log(err));

const imageSchema = new mongoose.Schema({
  name: String,
  createdAt: { type: Date, default: Date.now }
});

const ImageMeta = mongoose.model("ImageMeta", imageSchema);


// ================== Multer ==================
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    const randomName = Math.random().toString(36).substring(2, 12);
    cb(null, randomName + "." + ext);
  }
});

const upload = multer({ storage });


// ================== INSERT ==================
app.post("/insert", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.send("No file uploaded");

    const file = req.file.filename;

    const img = await Jimp.read("./uploads/" + file);
    img.convolute([
      [0,-1,0],
      [-1,5,-1],
      [0,-1,0]
    ]).contrast(0.3).brightness(0.05)
      .write("./colored/" + file);

    // MongoDB Native
    const result = await db.collection("images").insertOne({
      name: req.body.name || "image",
      original: file,
      colored: file
    });

    // Mongoose (small use)
    await ImageMeta.create({ name: req.body.name });

    res.json({
      message: "Inserted",
      data: result
    });

  } catch (err) {
    res.send(err.message);
  }
});


// ================== VIEW ==================
app.get("/view", async (req, res) => {
  const data = await db.collection("images").find().toArray();
  res.json(data);
});


// ================== DELETE ==================
app.delete("/delete/:id", async (req, res) => {
  await db.collection("images").deleteOne({
    _id: new ObjectId(req.params.id)
  });

  res.send("Deleted");
});


// ================== UPDATE (PUT) ==================
app.put("/update/:id", async (req, res) => {
  await db.collection("images").updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: { name: req.body.name } }
  );

  res.send("Updated");
});


// ================== PATCH (Partial Update) ==================
app.patch("/patch/:id", async (req, res) => {
  await db.collection("images").updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );

  res.send("Patched");
});


// ================== SEARCH ==================
app.get("/search/:name", async (req, res) => {
  const data = await db.collection("images")
    .find({
      name: { $regex: req.params.name, $options: "i" }
    })
    .toArray();

  res.json(data);
});


// ================== START SERVER ==================
connectDB().then(() => {
  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
});