const boom = require('@hapi/boom');
const { models } = require('../../sequelize-database/sequelize.index.js');


const UserService = require('../user/user.service');
const userService = new UserService();

const PostService = require('../post/post.service');
const postService = new PostService();
class CommentService {
  async getAll(query) {
    let options = {};

    const { filterPostId, filterUserId } = query;

    if (filterPostId) {
      options = {
        ...options,
        ...filterPostId,
      };
    }

    if (filterUserId) {
      options = {
        ...options,
        ...filterUserId,
      };
    }

    const comments = await models.Comment.findAll(options);
    return comments;
  }
  async getOne(id) {
    const comment = await models.Comment.findByPk(id);
    if (!comment) throw boom.notFound(`El comentario con id ${id} no existe`);

    return comment;
  }

  async create(data) {
    await userService.getOne(data.userId);
    await postService.getOne(data.postId);

    const newComment = await models.Comment.create(data);
    return newComment;
  }

  async update(id, changes) {
    const comment = await this.getOne(id);
    const response = await comment.update(changes);

    return response;
  }

  async delete(id) {
    const comment = await this.getOne(id);
    await comment.destroy();

    return { message: `${id} comment removed.` };
  }
}

module.exports = CommentService;
