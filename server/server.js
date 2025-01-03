const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require("multer");
const path = require("path");

const app = express();
const port = 5000;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/assets", express.static(path.join(__dirname, "assets")));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Database Connection Error : ', err);
  } else {
    console.log('Connected To MySQL DataBase.');
  }
});

const authenticateUser = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'No Token Provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid Token.' });
    }
    req.userId = decoded.id;
    next();
  });
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets/images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post("/upload", authenticateUser, upload.single("image"), (req, res) => {
  if (req.file) {
    const imagePath = "uploads/" + req.file.filename;
    const userId = req.userId;
    const query = "UPDATE users SET image = ? WHERE id = ?";
    db.query(query, [imagePath, userId], (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Error Saving Image Path." });
      }
      res.status(200).json({ message: "Image Uploaded And Path Saved." });
    });
  } else {
    res.status(400).json({ error: "No Image File Uploaded." });
  }
});

app.get('/api/users', authenticateUser, (req, res) => {
  const userId = req.userId;
  const query = 'SELECT * FROM users WHERE id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results[0]);
  });
});

app.post('/api/users', (req, res) => {
  const { firstName, lastName, email, password, phone, photo, address, age, whatsappNumber } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: 'Please Fill All Required Fields.' });
  }
  const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'Email Already In Use.' });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ error: 'Error Hashing Password.' });
      }

      const query = 'INSERT INTO users (first_name, last_name, email, password, phone, photo, address, age, whatsapp_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
      db.query(query, [firstName, lastName, email, hashedPassword, phone, photo, address, age, whatsappNumber], (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: result.insertId, firstName, lastName, email, phone, photo, address, age, whatsappNumber });
      });
    });
  });
});

app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("DataBase Error :", err);
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      console.log("User Not Found For E-Mail :", email);
      return res.status(404).json({ status: 'error', message: 'Invalid Email or Password' });
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Bcrypt Error :", err);
        return res.status(500).json({ error: err.message });
      }
      if (isMatch) {
        console.log("Password Match Successful. Generating Token...");
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );

        return res.json({
          status: 'success',
          message: 'Login Successful.',
          token,
          userId: user.id,
        });
      } else {
        console.log("Invalid Password For User :", email);
        return res.status(400).json({ status: 'error', message: 'Invalid Email or Password' });
      }
    });
  });
});

app.post('/api/users/forgot-password', (req, res) => {
  const { email } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ status: 'error', message: 'Email Not Found.' });
    }

    const user = results[0];
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const resetUrl = `http://localhost:3000/reset-password/${token}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      html: `<p>Click <a href="${resetUrl}">Here</a> To Reset Your Password.</p>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ error: 'Error Sending E-Mail' });
      }

      res.status(200).json({ message: 'Password Reset Link Sent To Your E-Mail.' });
    });
  });
});

app.post('/api/users/reset-password', (req, res) => {
  const { token, newPassword } = req.body;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(400).json({ error: 'Invalid Or Expired Token.' });
    }
    bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ error: 'Error Hashing Password.' });
      }
      const query = 'UPDATE users SET password = ? WHERE id = ?';
      db.query(query, [hashedPassword, decoded.userId], (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Password Successfully Updated.' });
      });
    });
  });
});

app.get('/api/products', authenticateUser, (req, res) => {
  const userId = req.userId;
  const query = 'SELECT * FROM products WHERE user_id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get('/api/products/:id', authenticateUser, (req, res) => {
  const productId = req.params.id;
  const userId = req.userId;
  const query = 'SELECT * FROM products WHERE id = ? AND user_id = ?';
  db.query(query, [productId, userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results[0]);
  });
});

app.post('/api/products', authenticateUser, (req, res) => {
  const { name, price, categoryId, description, image, reviews, rating, brand, status } = req.body;
  const userId = req.userId;
  const query = 'INSERT INTO products (name, price, category_id, description, image, reviews, rating, brand, status, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [name, price, categoryId, description, image, reviews, rating, brand, status, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId, name, price, categoryId, description, image, reviews, rating, brand, status });
  });
});

app.put('/api/products/:id/status', authenticateUser, (req, res) => {
  const productId = req.params.id;
  const { status } = req.body;
  const userId = req.userId;
  const query = 'UPDATE products SET status = ? WHERE id = ? AND user_id = ?';
  db.query(query, [status, productId, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: productId, status });
  });
});

app.listen(port, () => {
  console.log(`Server Is Running On : http://localhost:${port}`);
});