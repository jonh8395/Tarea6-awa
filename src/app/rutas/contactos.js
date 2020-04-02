const contacto = require('../model/contactos');
const joi = require('joi');

module.exports=(app) => {
    app.get('/contacto',(req,res)=>{
        contacto.find((err,datos)=>{
            if(err) res.status(400).json({status:0, mensaje:"No se pudieron obtener los contactos"});
            res.status(200).json({status:1, listado: datos});
        });


    });
    app.get('/contacto/:nombre',(req,res)=>{ //obtener informacion del contacto por medio del nombre colocado
        contacto.findOne({'nombre':`${req.params.nombre}`} ,'nombre telefono direccion',(err,datos)=>{
            if(err) res.status(400).json({status:0, mensaje:"No se pudieron obtener los contactos"});
            res.status(200).json({status:1, listado: datos});
        });
    });
    app.post('/contacto',(req,res)=>{

        let schema = joi.object({
            nombre: joi.string().max(100).required(),
            telefono: joi.string().max(45).required() ,
            direccion: joi.string().max(45).required() ,
         }); 
         
         if (schema.validate(req.body).error) {
             res.status(400).json({status:0, mensaje:"Error en los parametros enviados"});
         }else{
   let temp = new contacto({
       nombre: req.body.nombre,
       telefono: req.body.telefono,
       direccion: req.body.direccion
   });
   temp.save().then((result) => {});
   res.json({status:1, mensaje:"contacto insertado correctamente"});
}
    });
//Lo que se debia investigar------------------------
 app.put('/contacto/:nombre',(req,res)=>{
    let schema = joi.object({
        nombre: joi.string().max(100).required(),
        telefono: joi.string().max(45).required() ,
        direccion: joi.string().max(45).required() ,
     }); 
     
     if (schema.validate(req.body).error) {
         res.status(400).json({status:0, mensaje:"Error en los parametros enviados"});
     }else{


    contacto.findOneAndUpdate({'nombre':`${req.params.nombre}`},{$set:{'nombre':`${req.body.nombre}` , 'telefono':`${req.body.telefono}`, 'direccion':`${req.body.direccion}`}   },  {new: true} ,(err,datos)=>{
        if(err) res.status(400).json({status:0, mensaje:"No se pudieron actualizar los contactos"});
        res.status(200).json({status:1, listado: datos});
    } );
     }
 });


app.delete('/contacto/:nombre',(req,res)=>{
    contacto.deleteMany({'nombre':`${req.params.nombre}`},(err,datos)=>{
        if(err) res.status(400).json({status:0, mensaje:"No se pudo borrar el contacto"});
        res.status(200).json({status:1, mensaje:"Contacto eliminado satisfactoriamente!"});
    });
});


}