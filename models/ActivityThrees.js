module.exports = (sequelize, DataTypes) => {

    const ActivityThrees = sequelize.define("ActivityThrees", {
        content: {
            type: DataTypes.JSON,
        },
        transcript_source_id: {
            type: DataTypes.STRING,
        },
        MLModel: {
            type: DataTypes.STRING, 
        },
        AllowMLModel: {
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

    ActivityThrees.associate = (models) => {
        ActivityThrees.hasMany(models.Activities, {
        })
    }

    return ActivityThrees;
}