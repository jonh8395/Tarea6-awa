const app = require("./config/server");
require("./app/rutas/contactos")(app);
app.listen(app.get("port"), () => console.log(`Ejecutando servidor en el puerto ${app.get("port")}`));
