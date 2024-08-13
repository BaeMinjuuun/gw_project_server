module.exports = (sequelize, DataTypes) => {
  const ResourceBookings = sequelize.define(
    "ResourceBookings",
    {
      booking_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      resource_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      purpose: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );

  ResourceBookings.associate = function (models) {
    ResourceBookings.belongsTo(models.ResourceRegisters, {
      foreignKey: "resource_id",
      targetKey: "resource_id",
    });
  };

  return ResourceBookings;
};
