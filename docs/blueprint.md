# **App Name**: Vedteix Website

## Core Features:

- Company Information: Display company information, including about us, services, and contact details.
- Case Studies: Display case studies with rich content (text and photos)
- AI-Powered Message Auto-Reply: Generate contact message replies using AI that sound natural.
- Contact Form: Contact Form for users to send direct messages to the company.
- Partner Login: An area where partners of the company can login to see additional materials.

## Style Guidelines:

- The company sounds high-end; its brand could be associated with luxury and/or exclusivity. For this reason, a dark color scheme would be most appropriate. The company is a technology company, which is a large, diverse space -- including consumer goods and defense. Therefore, in keeping with current industry trends, we can choose a cool color for the primary, specifically light blue. It should be significantly brightened to ensure sufficient contrast in a dark color scheme. Primary color: Light Blue (#ADD8E6) to evoke trust and modernity.
- Background color: Very dark desaturated blue (#191920) to provide a professional and calming backdrop.
- Accent color: Soft lavender (#E6E6FA) for highlighting important sections and calls to action.
- Headline font: 'Playfair' (serif) for headlines, lending a sense of elegance; body font: 'PT Sans' (sans-serif) to maintain readability.
- Simple and modern line icons that complement the site's overall design.
- Clean and structured layout with clear sections and intuitive navigation.
- Subtle transition animations for a smooth and engaging user experience.

---

Here’s a step-by-step guide to bootstrap your professional Node.js backend for Vedteix Technology, including shell commands and initial code for a clean, scalable MVC structure.

---

## 1. Shell Commands: Project Setup

```sh
# 1. Create project folder and enter it
mkdir vedteix-backend
cd vedteix-backend

# 2. Initialize Node.js project
npm init -y

# 3. Install dependencies
npm install express mongoose dotenv cors bcryptjs jsonwebtoken express-validator morgan helmet multer multer-storage-cloudinary cloudinary nodemailer

# 4. Install dev dependencies (optional, for development)
npm install --save-dev nodemon

# 5. Create folder structure
mkdir controllers models routes middlewares utils config uploads

# 6. Create entry files
touch app.js server.js .env.example README.md
```

---

## 2. .env.example

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vedteix
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
CLIENT_URL=http://localhost:3000
```

---

## 3. Basic `package.json` (auto-generated, but add scripts)

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

---

## 4. Basic `server.js`

```js
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## 5. Basic `app.js`

```js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(morgan('dev'));
app.use(helmet());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes (to be implemented)
app.get('/', (req, res) => res.json({ message: 'Vedteix Technology API' }));

// TODO: Add route imports here

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message || 'Server Error' });
});

module.exports = app;
```

---

## 6. Folder Structure

```
vedteix-backend/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── utils/
├── config/
├── uploads/
├── .env.example
├── app.js
├── server.js
├── package.json
└── README.md
```

---

## 7. Next Steps

- Implement models (User, Service, Portfolio, Blog, etc.)
- Implement controllers and routes for each module
- Add authentication middleware
- Set up Cloudinary config and image upload logic
- Add contact/job form handlers and email logic

---

**You can now run:**
```sh
npm run dev
```
to start your backend in development mode.

---

Would you like the initial code for any specific module (e.g., User authentication, Service CRUD) next? Or a sample route/controller/model template to get started?