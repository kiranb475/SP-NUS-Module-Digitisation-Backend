module.exports = (sequelize, DataTypes) => {

    const SummariesA6s = sequelize.define("SummariesA6s", {
        UserClusterIndexA5: {
            type: DataTypes.INTEGER
        },
        SentenceDictionary: {
            type: DataTypes.JSON,
        },
        InsightDictionary: {
            type: DataTypes.JSON,
        },
        NeedsDictionary: {
            type: DataTypes.JSON,
        }
    })

    return SummariesA6s;
}