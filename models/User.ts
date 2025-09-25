import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import type { User as UserType, Address } from '@/lib/types';
import { mockDb } from '@/lib/mock-db';

const AddressSchema = new Schema({
  name: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true, default: 'US' },
  isDefault: { type: Boolean, default: false },
});

interface UserDocument extends Omit<UserType, '_id'>, Document {
  passwordHash: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<UserDocument>({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true,
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: { 
    type: String, 
    required: [true, 'Password is required'],
  },
  role: { 
    type: String, 
    enum: ['customer', 'admin'],
    default: 'customer',
  },
  addresses: [AddressSchema],
}, {
  timestamps: true,
});

// Index for faster queries
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('passwordHash')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

// Remove sensitive fields from JSON output
UserSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.passwordHash;
  return userObject;
};

// Use mock database in development when MongoDB is not available
const USE_MOCK_DB = !process.env.MONGODB_URI || process.env.NODE_ENV === 'development';

let User: any;

if (USE_MOCK_DB) {
  // Use mock database
  User = {
    find: (query?: any) => mockDb.getModel('User').find(query),
    findOne: (query: any) => mockDb.getModel('User').findOne(query),
    findById: (id: string) => mockDb.getModel('User').findById(id),
    create: (data: any) => mockDb.getModel('User').create(data),
    countDocuments: (query?: any) => mockDb.getModel('User').countDocuments(query),
  };
} else {
  // Use MongoDB
  User = mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);
}

export default User;
export type { UserDocument };