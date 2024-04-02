module.exports = (sequelize, DataTypes) => {

    const Summaries = sequelize.define("Summaries", {
        InstructorId: {
            type: DataTypes.INTEGER,
        },
        ActivitySequenceId: {
            type: DataTypes.JSON
        },
        StudentId: {
            type: DataTypes.INTEGER,
        },
        StudentTemplateId: {
            type: DataTypes.JSON,
        },
        InterviewerSentenceIndexA1: {
          type: DataTypes.INTEGER  
        },
        InterviewerSentenceContentA1: {
            type: DataTypes.TEXT('medium')
        },
        IntervieweeSentenceIndexA1: {
            type: DataTypes.INTEGER,
        },
        IntervieweeSentenceContentA1: {
            type: DataTypes.TEXT('medium')
        },
        SentenceUserHighlightA2: {
            type: DataTypes.BOOLEAN
        },
        SentenceUserHighlightA3: {
            type: DataTypes.BOOLEAN
        },
        SentenceMLHighlightA3: {
            type: DataTypes.BOOLEAN
        },
        UserClusterIndexA4: {
            type: DataTypes.INTEGER
        },
        UserClusterLabelA4: {
            type: DataTypes.STRING
        },
        UserClusterIndexA5: {
            type: DataTypes.INTEGER,
        },
        InsightIndex: {
            type: DataTypes.INTEGER,
        },
        InsightLabel: {
            type: DataTypes.STRING,
        },
        NeedIndex: {
            type: DataTypes.INTEGER,
        },
        NeedLabel: {
            type: DataTypes.STRING,
        }
    })

    return Summaries;
}