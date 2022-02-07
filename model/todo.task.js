const { Sequrlize, DataTypes } = require("sequelize");
const sequelize = new Sequrlize("splite::memory:");

const Task = sequelize.define("Task", {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
  },
  done: {
    type: DataTypes.BOOLEAN,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
});
