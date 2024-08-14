module.exports = (sequelize, DataTypes) => {
  const ResourceBookings = sequelize.define(
    "ResourceBookings",
    {
      fk_user_id: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      booking_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fk_resource_id: {
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
      foreignKey: {
        name: "fk_resource_id",
        allowNull: false,
      },
      targetKey: "resource_id",
      onDelete: "CASCADE", // 자원이 삭제될 때 관련 예약도 삭제
      onUpdate: "CASCADE", // 자원 ID가 변경될 때 예약의 fk_resource_id도 업데이트
    });
    // fk_user_id에 대한 외래 키 설정
    ResourceBookings.belongsTo(models.Users, {
      foreignKey: {
        name: "fk_user_id",
        allowNull: false,
      },
      targetKey: "user_id",
      onDelete: "NO ACTION", // 사용자가 삭제될 때 관련 예약은 삭제되지 않음
      onUpdate: "CASCADE", // 사용자 ID가 변경될 때 예약의 fk_user_id도 업데이트
    });
  };

  return ResourceBookings;
};
