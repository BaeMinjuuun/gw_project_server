module.exports = (sequelize, DataTypes) => {
  const Reservations = sequelize.define(
    "Reservations",
    {
      reservation_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      start_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: "예약가능",
      },
      purpose: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  Reservations.associate = function (models) {
    Reservations.belongsTo(models.Users, {
      foreignKey: "user_id",
      targetKey: "user_id",
    });
    Reservations.belongsTo(models.ReservationCategories, {
      foreignKey: "category_id",
      targetKey: "category_id",
    });
  };

  return Reservations;
};
