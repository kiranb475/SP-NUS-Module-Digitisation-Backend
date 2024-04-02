module.exports = (sequelize, DataTypes) => {

    const StudentLogs = sequelize.define("StudentLogs", {
        StudentId: {
            type: DataTypes.STRING,
        },
        Event: {
            type: DataTypes.STRING,
        },
        DateTime: {
            type: DataTypes.DATE,
        },
        StudentTemplateId: {
            type: DataTypes.INTEGER
        },
        ActivityType: {
            type: DataTypes.STRING,
        },
        ActivityId: {
            type: DataTypes.INTEGER
        },
    })

    return StudentLogs;
}