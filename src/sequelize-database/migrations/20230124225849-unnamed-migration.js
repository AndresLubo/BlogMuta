'use strict';
const { CategorySchema, CATEGORY_TABLE } = require('../models/category.model');
const { UserSchema, USER_TABLE } = require('../models/user.model');
const { PostSchema, POST_TABLE } = require('../models/post.model');
const { CommentSchema, COMMENT_TABLE } = require('../models/comment.model');
const {LikeSchema, LIKE_TABLE} = require('../models/like.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(POST_TABLE, PostSchema);
    await queryInterface.createTable(LIKE_TABLE, LikeSchema)
    await queryInterface.createTable(COMMENT_TABLE, CommentSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(LIKE_TABLE);
    await queryInterface.dropTable(POST_TABLE);
    await queryInterface.dropTable(COMMENT_TABLE);
  },
};
