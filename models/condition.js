const { DataTypes } = require("sequelize");
const sequelize = require("../src/db/db");

const Condition = sequelize.define(
  "Condition",
  {
    field: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    operator: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING, // Adjust to appropriate type based on your use case
      allowNull: false,
    },
    ruleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Rule', // Assuming your rules table is named 'Rule'
        key: 'id',
      },
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Condition;
