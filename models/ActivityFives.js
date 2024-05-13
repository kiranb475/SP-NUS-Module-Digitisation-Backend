module.exports = (sequelize, DataTypes) => {

    const ActivityFives = sequelize.define("ActivityFives", {
        content: {
            type: DataTypes.JSON,
        },
        MLClusters: {
            type: DataTypes.BOOLEAN, 
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

    ActivityFives.associate = (models) => {
        ActivityFives.hasMany(models.Activities, {
            foreignKey: 'ActivityFiveId',
        })
    }

    return ActivityFives;
}