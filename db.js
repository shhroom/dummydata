const mongoose = require('mongoose');

const { DataElement, FieldType, FIELD_TYPES } = require('./Models');

const MONGO_URL = 'mongodb://127.0.0.1:27017';

async function purgeDb() {
  await mongoose.connect(MONGO_URL);

  console.log('Removing all items from database...');
  await FieldType.deleteMany();
  await DataElement.deleteMany();
  console.log('Database purge complete.');

  await mongoose.disconnect();
}

async function seedFieldTypes() {
  console.log('Seeding field types...');
  await mongoose.connect(MONGO_URL);

  const newTypes = await FieldType.create(
    FIELD_TYPES.map((ft) => {
      const retObj = { fieldType: ft };
      return retObj;
    })
  );

  await mongoose.disconnect();
  console.log('Field type seeding complete.');
}

async function init() {
  await purgeDb();
  await seedFieldTypes();

  await mongoose.connect(MONGO_URL);

  console.log('field types:', await FieldType.find());

  const firstNameField = await FieldType.findOne({ fieldType: 'firstName' });

  await DataElement.create({
    data: 'Anastasia',
    fieldType: firstNameField.fieldType,
    fieldRef: firstNameField._id,
  });

  console.log(
    await DataElement.find({ fieldType: 'firstName' }).populate('fieldRef')
  );

  await mongoose.disconnect();
}

init();
