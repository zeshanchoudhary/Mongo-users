const assert = require('assert');
const User = require('../src/user');


describe('updating records', () => {
    let joe;
    
    beforeEach((done) =>{
        joe = new User({ name: 'joe', likes: 0});
        joe.save()
            .then(() => done());
    });

    function assertName(operation, done){
        operation
            .then(() => User.find({})) // devuelve todos los usuarios
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'Alex');
                done();
            });
    }


    it('instance type using set n save', (done) => {
        joe.set('name','Alex'); // en memoria, not save to database
        assertName(joe.save(), done);
    });

    // actualiza la instacia y lo guarda.s
    it('A model instance can update', (done) => {
        assertName(joe.update({ name: 'Alex'}), done);
    })

    it('A model class can update', (done) => {
        assertName(
            User.update({name: 'joe'}, { name: 'Alex' }),
            done
        );
    });

    it('A model class can update one record', (done) => {
        assertName(
            User.findOneAndUpdate({ name: 'joe'}, { name: 'Alex'}),
            done  
        );
    });

    it('A model class can find a record with an Id and update', (done) => {
        assertName(
            User.findByIdAndUpdate(joe._id, { name: 'Alex'}),
            done
        )
    });

    // xit ==> pending
    it('A user can have their likes incremented by 1', (done) => {  
        User.update({name: 'joe'}, { $inc: { likes:  10} } )
            .then(() => User.findOne({name: 'joe'}))
            .then((user) => {
                assert(user.likes === 10);
                done();
            })
    });

})