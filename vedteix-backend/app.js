const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const path = require('path');
const { configurePassport, passport } = require('./config/passport');
const {
  SESSION_COOKIE_NAME,
  buildSessionUser,
  getSessionCookieOptions,
} = require('./utils/authSession');
const { ensureAdminUser } = require('./utils/adminUser');
const { errorMiddleware } = require('./middlewares/errorMiddleware');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const SESSION_MAX_AGE_MS = Number.parseInt(
  process.env.SESSION_MAX_AGE_MS || `${1000 * 60 * 60 * 24 * 7}`,
  10
);

// Middleware
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:1404')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Origin not allowed by CORS'));
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Connect to MongoDB
const uri =
  process.env.MONGODB_URI ||
  (process.env.NODE_ENV !== 'production'
    ? 'mongodb://127.0.0.1:27017/vedteix'
    : '');
if (!uri) {
  console.error('ERROR: MONGODB_URI environment variable is not set!');
  process.exit(1);
}

const sessionSecret =
  process.env.SESSION_SECRET ||
  (process.env.NODE_ENV !== 'production' ? 'dev-session-secret-change-me' : '');
if (!sessionSecret) {
  console.error('ERROR: SESSION_SECRET environment variable is not set!');
  process.exit(1);
}

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

configurePassport();

const sessionStore = MongoStore.create({
  mongoUrl: uri,
  collectionName: 'sessions',
  ttl: Math.floor(SESSION_MAX_AGE_MS / 1000),
  autoRemove: 'native',
});

sessionStore.on('error', (error) => {
  console.error('Session store error:', error);
});

app.use(
  session({
    name: SESSION_COOKIE_NAME,
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    store: sessionStore,
    cookie: {
      ...getSessionCookieOptions(),
      maxAge: SESSION_MAX_AGE_MS,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  if (req.user && req.session) {
    req.session.user = buildSessionUser(req.user);
  }

  next();
});

// Routes
app.use('/auth', require('./routes/oauthRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/portfolios', require('./routes/portfolioRoutes'));
app.use('/api/technologies', require('./routes/technologyRoutes'));
app.use('/api/newsletters', require('./routes/newsletterRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/leads', require('./routes/leadsRoutes'));
app.use('/api/appointments', require('./routes/appointmentsRoutes'));
app.use('/api/chat', require('./routes/chatApiRoutes'));
app.use('/api/chats', require('./routes/chatRoutes'));
app.use('/api/invoices', require('./routes/invoiceRoutes'));
app.use('/api/uploads', require('./routes/uploadRoutes'));
app.use('/api/testimonials', require('./routes/testimonialsRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/site-settings', require('./routes/siteSettingsRoutes'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/', (req, res) => {
  res.send('Vedteix Backend API is running');
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use(errorMiddleware);

async function startServer() {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
    await ensureAdminUser();

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(
          `Port ${PORT} is already in use. Stop the existing server on that port or change PORT in vedteix-backend/.env.`
        );
      } else {
        console.error('Backend server error:', error);
      }

      process.exit(1);
    });

    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully...');
      server.close(() => {
        console.log('Server closed. Exiting.');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('Failed to start backend:', error);
    process.exit(1);
  }
}

startServer();
