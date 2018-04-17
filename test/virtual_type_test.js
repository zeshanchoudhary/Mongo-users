const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {
    it('postCount return number of posts', (done) => {
        const joe = new User({
            name: 'joe',
            posts: [{title: 'post'}]
        });
        joe.save()
            .then(() => User.findOne({name: 'joe'}))
            .then((user) => {
                console.log(joe.postCount);
                assert(joe.postCount === 1);
                done();
            });
    });
});