'use strict'
module.exports = (sequelize, DataTypes) => {
  const Url = sequelize.define(
    'Url',
    {
      name: { type: DataTypes.STRING, allowNull: false },
      url: { type: DataTypes.STRING(2000), allowNull: false },
      shortUrl: { type: DataTypes.STRING, allowNull: false, unique: true }
    },
    {}
  )
  Url.associate = function(models) {
    // associations can be defined here
  }
  return Url
}
