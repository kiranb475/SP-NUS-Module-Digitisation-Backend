module.exports = (sequelize, DataTypes) => {

    const Activities = sequelize.define("Activities", {
        UserId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Published: {
            type: DataTypes.BOOLEAN,
        }

    })

    return Activities;
}