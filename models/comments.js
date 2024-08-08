module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    "Comments",
    {
      comment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.STRING(30),
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

  Comments.associate = function (models) {
    Comments.belongsTo(models.Posts, {
      foreignKey: "post_id",
      targetKey: "post_id",
    });
    Comments.belongsTo(models.Users, {
      foreignKey: "user_id",
      targetKey: "user_id",
    });
  };

  return Comments;
};
