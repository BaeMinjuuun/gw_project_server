module.exports = (sequelize, DataTypes) => {
  const CarCategories = sequelize.define(
    "CarCategories",
    {
      category_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      category_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: "Available",
      },
    },
    {
      timestamps: false,
    }
  );

  CarCategories.associate = function (models) {
    CarCategories.hasMany(models.CarReservations, {
      foreignKey: "category_id",
      sourceKey: "category_id",
    });
  };

  return CarCategories;
};
