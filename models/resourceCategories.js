module.exports = (sequelize, DataTypes) => {
  const ResourceCategories = sequelize.define(
    "ResourceCategories",
    {
      category_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      category_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      min_value: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      max_value: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      validate: {
        minLessThanMax() {
          if (
            this.min_value !== null &&
            this.max_value !== null &&
            this.min_value > this.max_value
          ) {
            throw new Error("min_value는 max_value보다 작거나 같아야 합니다.");
          }
        },
      },
    }
  );

  return ResourceCategories;
};
