const mongo = require('../../config/mongodb-server');

const ContactoSchema = mongo.Schema({
    nombre:{type: String, require: true},
    telefono:{type: String, require: true},
    direccion:{type: String, require: true}
});

module.exports = mongo.model('Contacto', ContactoSchema);