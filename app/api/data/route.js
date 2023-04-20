import { NextResponse } from 'next/server';
import { FieldType, DataElement } from '../../../Models';
const MONGO_URL = process.env.MONGO_URL;
import { mongoose } from 'mongoose';
import Fuse from 'fuse.js';

export async function GET(request) {
  await mongoose.connect(MONGO_URL);

  
  const { searchParams } = new URL(request.url);
  
  const userInputFields = searchParams.getAll('field_type');
  const existingFields = await FieldType.find();
  const fieldNames = existingFields.map((field) => field.fieldType);
  
  const fuseOptions = {
    isCaseSensitive: false,
    shouldSort: true,
    includeScore: true,
    includeMatches: true,
    threshold: 0.3,
  };
  
  const fuse = new Fuse(fieldNames, fuseOptions);


  const compareFields = userInputFields.reduce(
    (accumulator, field) => {
      const fieldAlreadyExists = [];
      const fieldDoNotExist = [];

      if (fieldNames.includes(field)) fieldAlreadyExists.push(field);
      else fieldDoNotExist.push(field);

      accumulator = [
        [...accumulator[0], ...fieldAlreadyExists],
        [...accumulator[1], ...fieldDoNotExist],
      ];
      return accumulator;
    },
    [[], []]
  );

  console.log(fuse.search(compareFields[1][0]));

  console.log('FIELDS++++++++', compareFields);

  return NextResponse.json('this is the data route');
}
