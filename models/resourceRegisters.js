module.exports = (sequelize, DataTypes) => {
  const ResourceRegisters = sequelize.define(
    "ResourceRegisters",
    {
      fk_category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      resource_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      resource_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      min_value: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      max_value: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
      image_url: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );

  ResourceRegisters.associate = function (models) {
    ResourceRegisters.belongsTo(models.ResourceCategories, {
      foreignKey: "fk_category_id",
      targetKey: "category_id",
    });
  };

  return ResourceRegisters;
};
