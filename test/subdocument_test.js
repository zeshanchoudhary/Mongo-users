const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
    it('it can create a subdocument', (done) => {
        const joe = new User({name: 'joe', 
        posts: [{title: 'This is the King'}]
    });
    
    joe.save()
        .then(() => User.findOne({name: 'joe'}))
        .then((user) => {
            assert(user.posts[0].title === 'This is the King');
            done();
        }); 
    });

    it('Can add subdocuments to an existing record', (done) => {
         const joe = new User({
             name: 'joe',
             posts: []
            });

        joe.save()
            .then(() => User.findOne({name: 'joe'}))
            .then((user) => {
                joe.posts.push({title: 'Programming 101'});
                return joe.save();
            })
            .then(() => User.findOne({name: 'joe'}))
            .then((user) => {
                assert(user.posts[0].title === 'Programming 101');
                done();
            });
    });

    it('can remove an existing subdocument', (done) => {
        const joe = new User({
            name: 'joe',
            posts: [{title: 'First post'}]
        });

        joe.save()
            .then(() => User.findOne({name: 'joe'}))
            .then((user) => {
                user.posts[0].remove();// metodo para eliminar el post(metodo proporcionado por mongoose)
                return user.save();
            })
            .then(() => User.findOne({name: 'joe'}))
            .then((user) => {
                assert(user.posts.length === 0);
                done();
            });
    });
})