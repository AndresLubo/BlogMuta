const boom = require('@hapi/boom');
const { models } = require('../../sequelize-database/sequelize.index.js');
const { hashPassword } = require('../../utils/bcrypt/bcrypt.utils.js');

class UserService {
  async getAll() {
    const users = await models.User.findAll({
      attributes: {
        exclude: ['password'],
      },
    });
    return users;
  }

  async getOne(id) {
    const user = await models.User.findByPk(id, {
      attributes: {
        exclude: ['password'],
      },
    });
    if (!user) throw boom.notFound(`The user with id ${id} does not exist.`);

    return user;
  }

  async getByEmail(email) {
    const user = await models.User.findOne({ where: { email } });
    if (!user)
      throw boom.notFound(`The user with email ${email} does not exist.`);

    return user;
  }

  async create(data) {
    const hash = await hashPassword(data.password);

    const newUser = await models.User.create({
      ...data,
      password: hash,
    });

    delete newUser.dataValues.password;
    return newUser;
  }

  async update(id, changes) {
    const user = await this.getOne(id);
    let response = await user.update(changes);
    return response;
  }

  async delete(id) {
    const user = await this.getOne(id);
    await user.destroy();
    return { message: `${id} user removed.` };
  }
}

module.exports = UserService;
