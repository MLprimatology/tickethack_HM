const mongoose = require('mongoose');

const bookedSchema = mongoose.Schema({
    trip: {type: mongoose.Schema.Types.ObjectId, ref: 'trips'}
});

const Booked = mongoose.model('bookeds',bookedSchema);
module.exports = Booked;