const mongoose = require('mongoose');

const FIELD_TYPES = [
  'firstName',
  'lastName',
  'emailName',
  'email',
  'emailDomain',
];

const fieldTypeSchema = new mongoose.Schema({
  fieldType: String,
});

const FieldType = mongoose.model('FieldType', fieldTypeSchema);

module.exports = { FieldType, FIELD_TYPES };

// { fieldType: 'firstName' }
