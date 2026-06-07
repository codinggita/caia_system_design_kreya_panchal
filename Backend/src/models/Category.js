import mongoose from 'mongoose';

const patternSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Pattern name is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  useCases: {
    type: [String],
    default: [],
  },
  keyFeatures: {
    type: [String],
    default: [],
  },
}, { _id: true });

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    trim: true,
    index: true,
  },
  description: {
    type: String,
    trim: true,
  },
  subcategories: {
    type: [String],
    default: [],
    index: true,
  },
  patterns: {
    type: [patternSchema],
    default: [],
  },
}, {
  timestamps: true,
});

// Compound text index for name + description full-text searching
categorySchema.index({ name: 'text', description: 'text' });

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category;
export { Category };
