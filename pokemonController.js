// Import pokemon model
Pokemon = require('./pokemonModel');
// Handle index actions
exports.index = function (req, res) {
    Pokemon.get(function (err, pokemons) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Pokemons retrieved successfully",
            data: pokemons
        });
    });
};
// Handle create pokemon actions
exports.new = function (req, res) {
    var pokemon = new Pokemon();
    pokemon.name = req.body.name ? req.body.name : pokemon.name;
    pokemon.type = req.body.type;
    pokemon.status = req.body.status;

// save the pokemon and check for errors
    pokemon.save(function (err) {
        // if (err)
        //     res.json(err);
res.json({
            message: 'New pokemon created!',
            data: pokemon
        });
    });
};
// Handle view pokemon info
exports.view = function (req, res) {
    Pokemon.findById(req.params.pokemon_id, function (err, pokemon) {
        if (err)
            res.send(err);
        res.json({
            message: 'Pokemon details loading..',
            data: pokemon
        });
    });
};
// Handle update pokemon info
exports.update = function (req, res) {
Pokemon.findById(req.params.pokemon_id, function (err, pokemon) {
        if (err){
            res.send(err);
            
          }
pokemon.name = req.body.name ? req.body.name : pokemon.name;
pokemon.type = req.body.type;
pokemon.status = req.body.status;
// save the pokemon and check for errors
        pokemon.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Pokemon Info updated',
                data: pokemon
            });
        });
    });
};
// Handle delete pokemon
exports.delete = function (req, res) {
    Pokemon.remove({
        _id: req.params.pokemon_id
    }, function (err, pokemon) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Pokemon deleted'
        });
    });
};
