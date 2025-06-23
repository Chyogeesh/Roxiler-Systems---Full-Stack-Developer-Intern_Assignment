const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

const db = require('./models');

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/user', require('./routes/user'));
app.use('/api/store', require('./routes/store'));

app.listen(PORT, async () => {
  await db.sequelize.sync();
  console.log(`Server running on http://localhost:${PORT}`);
});

// backend/models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('store_rating', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

const User = require('./User')(sequelize, DataTypes);
const Store = require('./Store')(sequelize, DataTypes);
const Rating = require('./Rating')(sequelize, DataTypes);

User.hasMany(Rating);
Rating.belongsTo(User);
Store.hasMany(Rating);
Rating.belongsTo(Store);
Store.belongsTo(User, { as: 'owner' });

module.exports = { sequelize, User, Store, Rating };

// backend/models/User.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    name: { type: DataTypes.STRING(60), allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING(400) },
    role: { type: DataTypes.ENUM('admin', 'user', 'owner'), defaultValue: 'user' },
  });
};

// backend/models/Store.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Store', {
    name: { type: DataTypes.STRING(60), allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    address: { type: DataTypes.STRING(400) },
  });
};

// backend/models/Rating.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Rating', {
    value: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
  });
};

// backend/middleware/auth.js (JWT-based)
const jwt = require('jsonwebtoken');
const secret = 'jwt-secret';

const verifyToken = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return res.sendStatus(403);
      if (roles.length && !roles.includes(decoded.role)) return res.sendStatus(403);
      req.user = decoded;
      next();
    });
  };
};

module.exports = { verifyToken, secret };

// === FRONTEND CODE ===
// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import StoreOwnerDashboard from './pages/StoreOwnerDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/owner" element={<StoreOwnerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

// NOTE: All remaining pages and components (SignupPage, LoginPage, Dashboard, StoreList, RatingForm, etc.) will include form validation (regex, min/max length), JWT-based auth, conditional rendering based on role, rating UI, filters, sorting, and logout functionality.

// Let me know if you want this full project exported as a downloadable zip with complete backend/frontend implementation, schema, and API documentation.
