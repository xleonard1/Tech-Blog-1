const sequelize = require('../config/connection');
const { User, Blogs, Comment} = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json')
const commentData = require('./commentData.json')


let users;
let blogs;

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  blogs = []
  for(const blogItem of blogData) {
    const blog = await Blogs.create({
      ...blogItem,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    blogs.push(blog);
   }


  for (const comments of commentData) {
    await Comment.create({
      ...comments,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      blog_id: blogs[Math.floor(Math.random() * blogs.length)].id

    });
  }


  process.exit(0);
};


seedDatabase();
