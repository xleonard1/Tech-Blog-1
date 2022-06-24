
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blogs extends Model {}

Blogs.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
   },
   avatar: {
        type: DataTypes.STRING,
        allowNull: true,
   },
   title: {
       type: DataTypes.STRING, 
       allowNull: false,
   },
   description: {
       type: DataTypes.TEXT,
   },
   date_created: {
       type: DataTypes.DATE,
       allowNull: false,
       defaultValue: DataTypes.NOW,
   },
   blog_text: {
       type: DataTypes.TEXT,
       allowNull: false,
   },
   user_id: {
       type:DataTypes.INTEGER,
       references: {
           model: 'user',
           key: 'id',
       },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'blogs',
  }
);

module.exports = Blogs;