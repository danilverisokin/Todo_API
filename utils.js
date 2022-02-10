const { Task } = require("./models/index");

const filterAndSorter = async (filterBy, order) => {
  let result = await Task.findAndCountAll({
    where: filterBy === "done" ? { done: "true" } : { done: "false" },
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
