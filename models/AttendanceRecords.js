module.exports = (sequelize, DataTypes) => {
  const AttendanceRecords = sequelize.define(
    "AttendanceRecords",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      check_in_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      check_out_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
    },
    {
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["user_id", "date", "check_in_time", "check_out_time"],
        },
      ],
    }
  );

  // 관계 설정 (N:1 관계)
  AttendanceRecords.associate = function (models) {
    AttendanceRecords.belongsTo(models.Users, {
      foreignKey: "user_id",
      targetKey: "user_id",
    });
  };

  return AttendanceRecords;
};
