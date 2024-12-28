const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000;

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Database Connection Error: ', err);
  } else {
    console.log('Connected To MySQL DataBase.');
  }
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.get('/api/users', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get('/api/users/:id', (req, res) => {
  const query = 'SELECT * FROM users WHERE id = ?';
  const userId = req.params.id;
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results[0]);
  });
});

app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ status: 'error', message: 'Invalid Email or Password' });
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (isMatch) {
        return res.json({ status: 'success', message: 'Login Successful.' });
      } else {
        return res.status(400).json({ status: 'error', message: 'Invalid Email or Password' });
      }
    });
  });
});

app.post('/api/users', (req, res) => {
  const { firstName, lastName, email, password, phone, photo, address, age, whatsappNumber } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: 'Please fill all required fields.' });
  }
  const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'Email already in use.' });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ error: 'Error hashing password.' });
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

app.get('/api/categories', (req, res) => {
  const query = 'SELECT * FROM categories';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get('/api/colors', (req, res) => {
  const query = 'SELECT * FROM colors';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get('/api/sizes', (req, res) => {
  const query = 'SELECT * FROM sizes';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get('/api/products', (req, res) => {
  const query = 'SELECT * FROM products';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get('/api/products/:id', (req, res) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  const productId = req.params.id;
  db.query(query, [productId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results[0]);
  });
});

app.post('/api/products', (req, res) => {
  const { name, price, categoryId, description, image, reviews, rating, brand, status } = req.body;
  const query = 'INSERT INTO products (name, price, category_id, description, image, reviews, rating, brand, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [name, price, categoryId, description, image, reviews, rating, brand, status], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId, name, price, categoryId, description, image, reviews, rating, brand, status });
  });
});

app.put('/api/products/:id/status', (req, res) => {
  const productId = req.params.id;
  const { status } = req.body;
  const query = 'UPDATE products SET status = ? WHERE id = ?';
  db.query(query, [status, productId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: productId, status });
  });
});

app.post('/api/product-colors', (req, res) => {
  const { productId, colorIds } = req.body;
  const query = 'INSERT INTO product_colors (product_id, color_id) VALUES ?';
  const values = colorIds.map(colorId => [productId, colorId]);
  db.query(query, [values], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Product Colors Added Successfully.' });
  });
});

app.post('/api/product-sizes', (req, res) => {
  const { productId, sizeIds } = req.body;
  const query = 'INSERT INTO product_sizes (product_id, size_id) VALUES ?';
  const values = sizeIds.map(sizeId => [productId, sizeId]);
  db.query(query, [values], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Product Sizes Added Successfully.' });
  });
});

app.listen(port, () => {
  console.log(`Server Is Running On: http://localhost:${port}`);
});