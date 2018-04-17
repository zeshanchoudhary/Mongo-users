const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
  it('saves a user', (done) => {
    const joe = new User({ name: 'joe' });
    /* La operacion de save toma su tiempo, por eso antes
    // de hacer la comparacion, tenemos que asegurarnos de
    // que el record se ha guardado correctamente. */

    // saving to database
    joe.save()
      .then(() => {
        // Has joe been saved succesfully?
        assert(!joe.isNew);
        done(); // diciendo que pase al siguiente test
      });
  });
});
