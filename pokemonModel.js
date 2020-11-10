var mongoose = require('mongoose');
// Setup schema
var pokemonSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }

});
// Export Pokemon model
var Pokemon = module.exports = mongoose.model('pokemon', pokemonSchema);
module.exports.get = function (callback, limit) {
    Pokemon.find(callback).limit(limit);
}
