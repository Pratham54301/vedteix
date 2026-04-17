require('dotenv').config();

const hasMongoUri = Boolean(process.env.MONGODB_URI);

console.log('Checking required environment variables...');
console.log('MONGODB_URI configured:', hasMongoUri ? 'yes' : 'no');
