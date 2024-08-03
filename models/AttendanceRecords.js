module.exports = (sequelize, DataTypes) => {
  const attendanceRecords = sequelize.define(
    "AttendanceRecords",
    {
      user_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      check_in_time: {
        type: DataTypes.DATE,
        allowNull: false,
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
        type: DataTypes.STRING(10),
        allowNull: true,
      },
    },
    {
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["user_id", "date"], // 복합 유니크 인덱스
        },
      ],
    }
  );

  attendanceRecords.associate = function (models) {
    attendanceRecords.belongsTo(models.Users, {
      foreignKey: "user_id",
      targetKey: "user_id",
    });
  };

  return attendanceRecords;
};
