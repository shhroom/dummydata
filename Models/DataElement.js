const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  data: String,
  fieldType: String,
  fieldRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FieldType',
  },
});

module.exports =
  mongoose.models.DataElement || mongoose.model('DataElement', dataSchema);
