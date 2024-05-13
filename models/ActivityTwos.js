module.exports = (sequelize, DataTypes) => {

    const ActivityTwos = sequelize.define("ActivityTwos", {
        content: {
            type: DataTypes.JSON,
        },
        transcript_source_id: {
            type: DataTypes.STRING,
        },
        predefinedHighlighting: {
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

    ActivityTwos.associate = (models) => {
        ActivityTwos.hasMany(models.Activities, {
        })
    }

    return ActivityTwos;
}