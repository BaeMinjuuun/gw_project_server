module.exports = (sequelize, DataTypes) => {
  const CarReservations = sequelize.define(
    "CarReservations",
    {
      reservation_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      car_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      rental_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      passengers: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      dispatch_datetime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      usage_period: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  CarReservations.associate = function (models) {
    CarReservations.belongsTo(models.Users, {
      foreignKey: "user_id",
      targetKey: "user_id",
    });
    CarReservations.belongsTo(models.ReservationCategories, {
      foreignKey: "category_id",
      targetKey: "category_id",
    });
  };

  return CarReservations;
};
