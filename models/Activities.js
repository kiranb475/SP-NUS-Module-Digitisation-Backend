module.exports = (sequelize, DataTypes) => {

    const Activities = sequelize.define("Activities", {
        UserId: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    })

    Activities.associate = (models) => {
        Activities.hasMany(models.SummariesA6s, {
            foreignKey: 'StudentTemplateId'
        })
    }



    return Activities;
}