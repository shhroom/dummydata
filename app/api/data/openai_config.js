import { Configuraion, OpenAIApi} from 'openai'
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const config = new Configuraion({
  organization: 'org-GLshQ1uT1tm6pK2v5D1lUlXO',
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const completion = await openai.createCompletion({
  model: 'text-davinci-003',
  prompt: generatePrompt(),
  temperature: 0.4,
  max_tokens: 1000,
});


function generatePrompt() {
  return `
  Act as a mock database information generator. Generate ten short blog post comments from different users displaying different attitudes. Provide your response as a JSON array. Here's an example:
  [
    {
      "userName":"mikey342",
      "comment":"This is the most enlightening blog post I have ever read."
    },
    {
      "userName":"liam3",
      "comment":"i hope u didnt get paid for this"
    }
  ]
  `;
}
const response = await openai.listEngines();