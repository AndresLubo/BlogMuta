const boom = require('@hapi/boom');
const { models } = require('../../sequelize-database/sequelize.index.js');


const UserService = require('../user/user.service');
const userService = new UserService();

const PostService = require('../post/post.service');
const postService = new PostService();

class LikeService {
  async getOne(id) {
    const like = await models.Like.findByPk(id);
    if (!like) throw boom.notFound(`The like ${id} does not exist`);

    return like;
  }
  async create(data) {
    await userService.getOne(data.userId);
    await postService.getOne(data.postId);

    const newLike = await models.Like.create(data);
    return newLike;
  }

  async delete(id) {
    const like = await this.getOne(id);
    await like.destroy();

    return { message: `${id} like removed.` };
  }
}

module.exports = LikeService;
