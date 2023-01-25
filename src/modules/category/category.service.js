const boom = require('@hapi/boom');
const { models } = require('../../sequelize-database/sequelize.index.js');

class CategoryService {
  async getAll() {
    const categories = await models.Category.findAll();
    return categories;
  }

  async getOne(id) {
    const category = await models.Category.findByPk(id);
    if (!category)
      throw boom.notFound(`The category with the id ${id} does not exist.`);

    return category;
  }

  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async update(id, changes) {
    const category = await this.getOne(id);
    const response = await category.update(changes);
    return response;
  }

  async delete(id) {
    const category = await this.getOne(id);
    await category.destroy();
    return { message: `${id} category removed.` };
  }
}

module.exports = CategoryService;
