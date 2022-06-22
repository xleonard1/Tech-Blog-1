const sequelize = require('../config/connection');
const { User, Blogs} = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json')



const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Blogs.bulkCreate(blogData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};


seedDatabase();
