module.exports = (sequelize, DataTypes) => {
  const ReservationCategories = sequelize.define(
    "ReservationCategories",
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
        defaultValue: "예약 가능",
      },
    },
    {
      timestamps: false,
    }
  );
  ReservationCategories.associate = function (models) {
    ReservationCategories.hasMany(models.Reservations, {
      foreignKey: "category_id",
      sourceKey: "category_id",
    });
  };
  return ReservationCategories;
};
