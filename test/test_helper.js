const mongoose = require('mongoose');

/*
  Diciendo a mongoose que cuando quieras usar promises
  usas el promises de ES6.(for the deprecation Warning)
*/

mongoose.Promise = global.Promise;


/*

Este before lo hacemos para que si la conexion con mongo
tarda mucho, se paren los tests y cuando la conexion se
haga le decimos a mocha que ya puede hacer los tests
con la fuction done();

*/

// La funcion before() corre solo una vez antes de ejecutar los tests
before((done) => {
  mongoose.connect("mongodb://localhost/users_test");
  // ver si se ha conectado o no.
  // Mongoose Connection  to database
  mongoose.connection
    .once('open', () => { done(); }) // succesfull
    .on('error', (error) => { // error
      console.log('Warning:', error);
    });
});


// Hook => funcion que se ejecuta antes de cada test
beforeEach((done) => {
  const {users, comments, blogposts} = mongoose.connection.collections;
  // borramos todos los records antes de ejecutar el test
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        // Ready to run next test
        done(); // diciendo a mocha que ya puede ejecutar el nuevo test
      });
    });
  });
})
