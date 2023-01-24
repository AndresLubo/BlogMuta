'use strict';
const { CategorySchema, CATEGORY_TABLE } = require('../models/category.model');
const { LabelSchema, LABEL_TABLE } = require('../models/label.model');
const { UserSchema, USER_TABLE } = require('../models/user.model');
const { PostSchema, POST_TABLE } = require('../models/post.model');
const { CommentSchema, COMMENT_TABLE } = require('../models/comment.model');
const {
  PostLabelSchema,
  POST_LABEL_TABLE,
} = require('../models/post_label.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(LABEL_TABLE, LabelSchema);
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(POST_TABLE, PostSchema);
    await queryInterface.createTable(COMMENT_TABLE, CommentSchema);
    await queryInterface.createTable(POST_LABEL_TABLE, PostLabelSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(LABEL_TABLE);
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(POST_TABLE);
    await queryInterface.dropTable(COMMENT_TABLE);
    await queryInterface.dropTable(POST_LABEL_TABLE);
  },
};
