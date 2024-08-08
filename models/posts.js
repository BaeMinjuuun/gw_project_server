module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define(
    "Posts",
    {
      post_id: {
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
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
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
      underscored: true,
    }
  );

  Posts.associate = function (models) {
    Posts.belongsTo(models.Users, {
      foreignKey: "user_id",
      targetKey: "user_id",
    });
    Posts.belongsTo(models.Categories, {
      foreignKey: "category_id",
      targetKey: "category_id",
    });
  };

  return Posts;
};
