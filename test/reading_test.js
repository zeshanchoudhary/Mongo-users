const assert = require('assert');
const User = require('../src/user');

/*

MODEL FUNCTIONS

=> User.find(criteria)
    Find all the users that match the given criteria
    Return an array
=> User.findOne(criteria)
    Find the first user that matches the criteri.
    Returns a single Record

*/



describe('Reading Users', () => {
  let joe;
  // antes de hacer el it tenemos que guardar algun joe
  // para que luego podamos buscarlo.
  beforeEach((done) => {
    joe = new User({ name: 'joe'});
    joe.save()
      .then(() => done());
  });

  it('finds all users with a name of joe', (done) => {
    User.find({name: 'joe'}) // todos los joe's
      .then((users) => {
        assert(users[0]._id.toString() === joe._id.toString());
        done();
        // Hacemos un toString por que los _id estan rodeados
        // de objectId. Para sacar solo los valores hacemos eso.
      });
  });

  it('find a user with a particular id', (done) => {
    User.findOne({ _id: joe._id })
        .then((user) => {
          assert(user.name === 'joe');
          done();
        })
  });

  
});
