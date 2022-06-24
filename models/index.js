const User = require('./User');
const Blogs = require('./Blogs');
const Comment = require('./Comments')



User.hasMany(Blogs, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})
Blogs.hasMany(Comment, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE'
})

Blogs.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
})

Comment.belongsTo(Blogs, {
  foreignKey: 'blog_id',
})



module.exports = { User, Blogs, Comment };
