const mongoose = require('mongoose');

const bookedSchema = mongoose.Schema({
    trip: {type: mongoose.Schema.Types.ObjectId, ref: 'trips'}
});

const Booked = mongoose.model('booked',bookedSchema);
module.exports = Booked;