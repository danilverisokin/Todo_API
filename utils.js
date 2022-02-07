const fs = require("fs");
const { data } = require("./config");
const db = require("./models/index");

const openAndRemake = () => {
  return JSON.parse(fs.readFileSync(data, "utf8"));
};

const remakeAndSave = (elem) => {
  fs.writeFileSync(data, JSON.stringify(elem));
};

const filterAndSorter = async (filterBy, order) => {
  const allTasks = await db.Task.findAll();
  const tasks = allTasks.map((task) => {
    return task.dataValues;
  });

  const filteredTasks = tasks.filter((item) => {
    if (filterBy === "done" && filterBy) {
      return item.done === "true";
    }
    if (filterBy === "undone" && filterBy) {
      return item.done === "false";
    }
    if (filterBy === "all" && filterBy) {
      return item;
    }
    return item;
  });

  const array = (arr) => {
    if (order === "desc" && order) {
      return arr.sort((a, b) => {
        if (a.createdAt < b.createdAt) return 1;
        if (a.createdAt > b.createdAt) return -1;
        return 0;
      });
    }
    if (order === "asc" && order) {
      return arr.sort((a, b) => {
        if (a.createdAt > b.createdAt) return 1;
        if (a.createdAt < b.createdAt) return -1;
        return 0;
      });
    }
    return arr;
  };

  const filteredAndSortedTasks = array(filteredTasks);

  const count = filteredAndSortedTasks.length;

  return { count: count, tasks: filteredAndSortedTasks };
};

const errorsHandler = (errors) => {
  return errors.errors.map((err) => err.msg).join(", ");
};

module.exports = {
  openAndRemake,
  remakeAndSave,
  filterAndSorter,
  errorsHandler,
};
