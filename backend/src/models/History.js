import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  sensor_data: {
    type: Object,
    required: true,
  },
  prediction_result: {
    type: Object,
    required: true,
  }
}, { timestamps: true });

export const History = mongoose.model('History', historySchema);
