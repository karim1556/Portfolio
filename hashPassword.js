import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

// Read the admin password from environment variable or provide it directly
const adminPassword = process.env.ADMIN_PASSWORD || 'karim';

// Generate salt and hash
bcrypt.hash(adminPassword, 10, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
    return;
  }
  console.log('Hashed Password:', hash);
});
