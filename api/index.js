const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  productId: Number,
  quantity: { type: Number, default: 1 },
  addedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
const Cart = mongoose.model("Cart", cartSchema);

const saltRounds = 10;
const secretKey = "your_secret_key";

const generateToken = (userId) => {
  return jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
};

app.get("/", (req, res) => {
  res.send("Server Is Running");
});

app.get("/api/products", (req, res) => {
  res.status(200).json(products);
});

app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email And Password Are Required..." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();

    res.status(201).json({ message: "User Created Successfully" });
  } catch (err) {
    res.status(500).json({ message: "DataBase Error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email And Password Are Required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = generateToken(user._id);
    res.status(200).json({ message: "Login Successful", token });
  } catch (err) {
    res.status(500).json({ message: "Database Error" });
  }
});

app.get("/check-auth", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ isAuthenticated: false });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.userId;
    const user = await User.findById(userId);
    if (user) {
      return res.status(200).json({ isAuthenticated: true });
    } else {
      return res.status(401).json({ isAuthenticated: false });
    }
  } catch (err) {
    return res.status(401).json({ isAuthenticated: false });
  }
});

app.post("/forgetpassword", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email Is Required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email Not Found" });

    res.status(200).json({ message: "Password Reset Link Sent" });
  } catch (err) {
    res.status(500).json({ message: "Database Error" });
  }
});

app.get("/profile/cart", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No Token Provided" });

  try {
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.userId;

    const cartItems = await Cart.find({ userId }).populate("productId");
    res.status(200).json({ cartItems });
  } catch (err) {
    res.status(401).json({ message: "Invalid Or Expired Token" });
  }
});

app.post("/profile/cart", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No Token Provided" });

  try {
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.userId;
    const { productId, quantity } = req.body;

    const cartItem = new Cart({ userId, productId, quantity });
    await cartItem.save();
    res.status(200).json({ message: "Item Added To Cart" });
  } catch (err) {
    res.status(401).json({ message: "Invalid Or Expired Token" });
  }
});

app.delete("/profile/cart/:itemId", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No Token Provided" });

  try {
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.userId;
    const itemId = req.params.itemId;

    const result = await Cart.deleteOne({ _id: itemId, userId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Item Not Found In Cart" });
    }

    res.status(200).json({ message: "Item Removed From Cart" });
  } catch (err) {
    res.status(401).json({ message: "Invalid Or Expired Token" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Is Running on: http://localhost:${PORT}`);
});
