// File: src/models/Counter.ts
import { Schema, model, models } from 'mongoose';

const CounterSchema = new Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
});

const Counter = models.Counter || model('Counter', CounterSchema);
export default Counter;
