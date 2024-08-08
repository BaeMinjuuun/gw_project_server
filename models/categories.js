module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define(
    "Categories",
    {
      category_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Categories;
};
