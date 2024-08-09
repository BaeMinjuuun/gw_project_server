module.exports = (sequelize, DataTypes) => {
  const ReservationCategory = sequelize.define(
    "ReservationCategory",
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
    },
    {
      timestamps: false,
    }
  );
  ReservationCategory.associate = function (models) {
    ReservationCategory.hasMany(models.Reservation, {
      foreignKey: "category_id",
      sourceKey: "category_id",
    });
  };
  return ReservationCategory;
};