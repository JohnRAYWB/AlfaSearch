const {Schema, model} = require('mongoose')

const Entity = new Schema({
    name: {type: String}
    gPerson: {type: String},
    inn: {type: String},
    OGRN: {type: String},
    region: {type: String},
    dateStart: {type: Date},
    dateEnd: {type: Date},
    pdfLink: {type: String}
})

module.exports = model('Entity', Entity)