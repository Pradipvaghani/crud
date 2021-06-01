'use strict'
const { db } = require('../../library/mongodb');
const tablename = "language";

module.exports.SelectWithSort = ((data, sortBy = {}, porject = {}, skip = 0, limit = 20) => db.get().collection(tablename).find(data).sort(sortBy).project(porject).skip(skip).limit(limit).toArray())
module.exports.SelectOne = ((data) => db.get().collection(tablename).findOne(data))
module.exports.SelectAll = ((data) => db.get().collection(tablename).find(data).toArray())
module.exports.Insert = ((data) => db.get().collection(tablename).insertOne(data))
module.exports.Update = ((condition, data) => db.get().collection(tablename).updateOne(condition, { $set: data }))
module.exports.Delete = ((condition) => db.get().collection(tablename).remove(condition))
module.exports.Aggregate = ((condition) => db.get().collection(tablename).aggregate(condition).toArray())
module.exports.GetCount = ((condition) => db.get().collection(tablename).find(condition).count())
