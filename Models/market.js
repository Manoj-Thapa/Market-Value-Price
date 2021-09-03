import mongoose from 'mongoose';

const marketSchema = new mongoose.Schema({
    sno: Number,
    name: String,
    last: Number,
    buy: Number,
    sell: Number,
    volume: Number,
    base_unit: String
})

const Market = mongoose.model('Market',marketSchema);

export { Market }