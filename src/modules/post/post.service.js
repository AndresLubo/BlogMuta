const boom = require('@hapi/boom');
const { models } = require('../../sequelize-database/sequelize.index.js');

class PostService {
  async getAll() {
    const posts = await models.Post.findAll();
    return posts;
  }

  async getOne(id) {
    const post = await models.Post.findByPk(id);
    if (!post) throw boom.notFound(`The post with id ${id} does not exist.`);

    return post;
  }

  async create(data) {
    const newPost = await models.Post.create(data);
    return newPost;
  }

  async update(id, changes) {
    const post = await this.getOne(id);
    const response = await post.update(changes);
    return response;
  }

  async delete(id) {
    const post = await this.getOne(id);
    await post.destroy();
    return {
      message: `${id} post removed.`,
    };
  }
}

module.exports = PostService;
