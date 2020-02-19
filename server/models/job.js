'use strict';
module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    pickup: DataTypes.STRING,
    dropoff: DataTypes.STRING,
    notes: DataTypes.TEXT,
    status: DataTypes.STRING,
    courier: DataTypes.INTEGER,
    team: DataTypes.STRING
  }, {});
  Job.associate = function(models) {
    // associations can be defined here
  };
  return Job;
};