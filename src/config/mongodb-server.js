const mongoose = require('mongoose');
mongoose.set('useFindAndModify',false);
mongoose.connect("mongodb://Jonathan:tron@cluster0-shard-00-00-wxkyo.mongodb.net:27017,cluster0-shard-00-01-wxkyo.mongodb.net:27017,cluster0-shard-00-02-wxkyo.mongodb.net:27017/test?replicaSet=Cluster0-shard-0&ssl=true&authSource=admin", { useNewUrlParser: true }).then(() => {
    console.log("Servidor de DB activo")
})
.catch(
    () => console.log("Error")
);

module.exports = mongoose;