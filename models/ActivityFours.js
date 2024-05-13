module.exports = (sequelize, DataTypes) => {

    const ActivityFours = sequelize.define("ActivityFours", {
        content: {
            type: DataTypes.JSON,
        },
        label: {
            type: DataTypes.STRING,
        },
        instruction : {
            type: DataTypes.TEXT('medium'),
        },
        activity_mvc: {
            type: DataTypes.JSON
        },
        lastAuthored: {
            type: DataTypes.STRING
        }
    })

    ActivityFours.associate = (models) => {
        ActivityFours.hasMany(models.Activities, {
        })
    }

    return ActivityFours;
}