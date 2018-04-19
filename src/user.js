/*

USER MODEL =>
=> El modelo User representa a todas la instancias
=> de usuarios

=> EL MODELO REPRESENTA TODA LA COLECCION DENTRO
=> DE LA BASE DE DATOS

=> Cada Modelo tiene un Schema. El Schema nos dice
=> los campos que tiene que ese modelo.

*/


const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;

// Creamos el Schema
const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

// Virtual Property
// Usamos una funcion normal y no una Arrow functions
// por que el Fat Arrow functions no existe THIS
UserSchema.virtual('postCount').get(function() {
  // this se refiere a la instancia del Modelo.
  return this.posts.length;
});

// Creamos el modelo
const User = mongoose.model('user', UserSchema);

// LO EXPORTAMOS PARA QUE LO PODAMOS IMPORTAR DESDE OTRO SITIO
module.exports = User;
