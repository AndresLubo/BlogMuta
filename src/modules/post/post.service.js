const boom = require('@hapi/boom');
const { models } = require('../../sequelize-database/sequelize.index.js');

const UserService = require('../user/user.service');
const userService = new UserService();

const CategoryService = require('../category/category.service');
const categoryService = new CategoryService();

class PostService {
  async getAll(query = {}) {
    let options = {};

    const { filterCategoryId, filterUserId } = query;

    if(filterCategoryId){
      options = {
        ...options,
        ...filterCategoryId
      }
    }

    if(filterUserId){
      options = {
        ...options,
        ...filterUserId
      }
    }


    const posts = await models.Post.findAll(options);
    return posts;
  }

  async getOne(id) {
    const post = await models.Post.findByPk(id);
    if (!post) throw boom.notFound(`The post with id ${id} does not exist.`);

    return post;
  }

  async create(data) {
    await userService.getOne(data.userId);
    await categoryService.getOne(data.categoryId);


    const newPost = await models.Post.create(data);
    return newPost;
  }

  async update(id, changes) {
    if(changes.categoryId)  await categoryService.getOne(changes.categoryId);

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
