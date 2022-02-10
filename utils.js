const { Task } = require("./models/index");
const { Op } = require("sequelize");

const filterAndSorter = async (filterBy, order) => {
  let result = await Task.findAndCountAll({
    where: !filterBy
      ? { [Op.or]: [{ done: "false" }, { done: "true" }] }
      : { done: filterBy },
    order: [["createdAt", order]],
  });

  return { ...result };
};

const errorsHandler = (errors) => {
  return errors.errors.map((err) => err.msg).join(", ");
};

module.exports = {
  filterAndSorter,
  errorsHandler,
};
