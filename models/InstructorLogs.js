module.exports = (sequelize, DataTypes) => {

    const InstructorLogs = sequelize.define("InstructorLogs", {
        InstructorId: {
            type: DataTypes.STRING,
        },
        Event: {
            type: DataTypes.STRING,
        },
        DateTime: {
            type: DataTypes.DATE,
        },
        ActivitySequenceId: {
            type: DataTypes.INTEGER,
        },
        ActivityId: {
            type: DataTypes.INTEGER,
        },
        ActivityType: {
            type: DataTypes.STRING,
        }

    })

    return InstructorLogs;
}