module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "Users",
    {
      user_id: {
        type: DataTypes.STRING(30),
        allowNull: false,
        primaryKey: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      birthday: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      imageUrl: {
        type: DataTypes.STRING(300),
        allowNull: true,
        unique: true,
      },
      department: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      position: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  users.associate = function (models) {
    users.hasMany(models.AttendanceRecords, {
      foreignKey: "user_id",
      sourceKey: "user_id",
    });
  };
  return users;
};
