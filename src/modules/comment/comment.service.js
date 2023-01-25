const boom = require('@hapi/boom');
const { models } = require('../../sequelize-database/sequelize.index.js');

class CommentService {
  async getOne(id) {
    const comment = await models.Comment.findByPk(id);
    if (!comment) throw boom.notFound(`El comentario con id ${id} no existe`);

    return comment;
  }

  async create(data) {
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
