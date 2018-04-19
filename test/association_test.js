const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');
const assert = require('assert');

describe('Associations', () => {
  let joe, blogPost, comment;
  beforeEach((done) => {
    joe = new User({name: 'joe'});
    blogPost = new BlogPost({title: "JS is Great", content: "Yeah it is"});
    comment = new Comment({content: 'Buen Post'});
  
    // joe ha hecho el BlogPost
    joe.blogPosts.push(blogPost);

    // el comentario pertenece al BlogPost
    blogPost.comments.push(comment);
    
    // el comentario pertenece al comentario
    comment.user = joe;

    // Guardamos todas la instancias ya que no se han guardado.
    // El Promise se usa para guardar mas de una cosa en el db.
    Promise.all([joe.save(), blogPost.save(), comment.save()]) 
        .then(() => {
            done();
        });   
  });

  // it.only es para solo correr este test solo.
  it('saves a relation between an user and a blogPost', (done) => {
    User.findOne({name: 'joe'})
    .populate('blogPosts') // (Modificador) es para rellenar los blogPosts
    .then((user) => {
        assert(user.blogPosts[0].title === 'JS is Great');
        done();
      })
  });

  it('saves a full relation graph', (done) => {
    User.findOne({name: 'joe'})
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user',
          }
        }
      })
      .then((user) => {
        assert(user.name === 'joe');
        assert(user.blogPosts[0].title === 'JS is Great');
        assert(user.blogPosts[0].comments[0].content === 'Buen Post')
        assert(user.blogPosts[0].comments[0].user.name === 'joe');
        done();
      })
  })

  
})