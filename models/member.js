module.exports = (sequelize, DataTypes) => {
  const member = sequelize.define("Member", {
    userId: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  });
  return member;
};
