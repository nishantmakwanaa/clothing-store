const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const products = require("./data/data.json");

const dbURI =
  "mongodb+srv://NISHANT:NISHANT@nishant.c1g7o.mongodb.net/?retryWrites=true&w=majority&appName=NISHANT"; // Replace with your MongoDB Atlas connection string

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected To MongoDB Atlas"))
  .catch((err) => console.log("MongoDB Connection Error :", err));

app.use(cors({ origin: "*" }));
app.use("/images", express.static(path.join(__dirname, "data/images")));
app.use(express.json());

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  productId: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  addedAt: { type: Date, default: Date.now },
});

const Cart = mongoose.model("Cart", cartSchema);

const productSchema = new mongoose.Schema({
  productId: { type: Number, required: true, unique: true },
  name: String,
  price: Number,
  description: String,
  imageUrl: String,
});

const Product = mongoose.model("Product", productSchema);

app.get("/", (req, res) => {
  res.send("Server Is Running");
});

app.get("/api/products", (req, res) => {
  res.status(200).json(products);
});

app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email And Password Are Required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();

    res.status(201).json({ message: "User Created Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Database Error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password Required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Email Or Password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Email Or Password" });
    }

    res.json({
      user: { name: `${user.firstName} ${user.lastName}`, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Login Failed" });
  }
});

app.get("/profile", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password Required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const cartItems = await Cart.find({ userId: user._id }).populate("productId");
    res.json({
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      cartItems,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed To Fetch User Profile" });
  }
});

app.post("/profile/cart", async (req, res) => {
  const { email, password, productId, quantity } = req.body;

  if (!email || !password || !productId) {
    return res.status(400).json({ message: "Required Fields Missing" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const cartItem = new Cart({ userId: user._id, productId, quantity });
    await cartItem.save();
    res.status(201).json({ message: "Item Added To Cart" });
  } catch (err) {
    res.status(500).json({ message: "Database Error" });
  }
});

app.delete("/profile/cart/:itemId", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password Required" });
  }

  const itemId = req.params.itemId;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const result = await Cart.deleteOne({ _id: itemId, userId: user._id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Item Not Found In Cart" });
    }

    res.status(200).json({ message: "Item Removed From Cart" });
  } catch (err) {
    res.status(500).json({ message: "Database Error" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server Is Running On : http://localhost:${PORT}`);
});