const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
   id: {
       type: DataTypes.INTEGER,
       autoIncrement: true,
       primaryKey: true,
       allowNull: false
   },
   date_created: {
       type: DataTypes.DATE,
       allowNull: false,
       defaultValue: DataTypes.NOW,
   },
   message: {
       type: DataTypes.STRING,
       allowNull: true,
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
    modelName: 'comments',
  }
);

module.exports = Comment;