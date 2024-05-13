module.exports = (sequelize, DataTypes) => {

    const ActivitySixs = sequelize.define("ActivitySixs", {
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

    ActivitySixs.associate = (models) => {
        ActivitySixs.hasMany(models.Activities, {
        })
    }

    return ActivitySixs;
}