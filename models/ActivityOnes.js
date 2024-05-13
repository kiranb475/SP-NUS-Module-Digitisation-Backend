module.exports = (sequelize, DataTypes) => {

    const ActivityOnes = sequelize.define("ActivityOnes", {
        content: {
            type: DataTypes.JSON,
        },
        transcript_source_id: {
            type: DataTypes.STRING,
        },
        transcriptEditable: {
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

    ActivityOnes.associate = (models) => {
        ActivityOnes.hasMany(models.Activities, {
        })
    }

    return ActivityOnes;
}