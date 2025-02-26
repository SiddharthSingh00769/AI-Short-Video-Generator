const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
    export const generateScript = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "write a two different script for 30 Seconds video on Topic:Kids Story,\n\n1) Do not add Scene description\n2) Do not add anything in Braces, just return the plain story in text\n3) Give me a response in JSON format and follow the schema\n-{\nscripts:[\n{\ncontent:'\n};\n]\n}\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"scripts\": [\n    {\n      \"content\": \"**(Scene: Open on a child's wide, curious eyes looking up.)**\\n**(Narrator, warm and inviting):** Once upon a time, in a land filled with giggling flowers and talking animals...\\n**(Quick shots of colorful, whimsical illustrations flashing by - a friendly bear, a sparkling river, a playful fox.)**\\n**(Narrator):** ...lived a little adventurer just like you!\\n**(Scene returns to the child, now smiling.)**\\n**(Text on screen: Discover magical stories! [App/Website Name])**\\n**(Narrator):** Spark your imagination. Start your story today! [App/Website address briefly displayed].\"\n    },\n    {\n      \"content\": \"**(Scene: Upbeat, playful music begins. A parent and child are cuddled up together, reading a picture book. The book is brightly colored and engaging.)**\\n**(Child (voiceover, excited):** Tell it again! Tell it again!\\n**(Parent (voiceover, loving):** Okay, okay! But this time, *you* help me read it!\\n**(Quick cuts of different children interacting with stories on a tablet or phone - turning pages, pointing at characters.)**\\n**(Narrator (energetic):** From daring dragons to silly snails, [App/Website Name] has stories for every little listener!\\n**(Text on screen: Bedtime Stories Made Easy! [App/Website Name])**\\n**(Final shot: The app/website logo with the tagline: Where Imagination Begins.)**\"\n    }\n  ]\n}\n```"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "write a two different script for 30 Seconds video on Topic:Kids Story,\n\n1) Do not add Scene description\n\n2) Do not add anything in Braces, just return the plain story in text\n\n3) Give me a response in JSON format and follow the schema\n-{\nscripts:[\n{\ncontent:'\n};\n]"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"scripts\": [\n    {\n      \"content\": \"A little seed fell from a tree. It tumbled and twirled, landing softly on the ground. The sun peeked out, warming the seed. Raindrops whispered, 'Grow, little seed, grow!' Slowly, a tiny sprout emerged. It stretched towards the sky, becoming a strong, tall tree.  Stories blossom. Read with us! [App Name] Download now!\"\n    },\n    {\n      \"content\": \"Once there was a brave little star who was afraid of the dark. All the other stars twinkled brightly, but she hid behind the moon. One night, a lost firefly needed help finding its way home. The little star gathered her courage and shone her brightest.  Find your shine. Discover new stories. [Website Address]\"\n    }\n  ]\n}\n```"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "write a two different script for 30 Seconds video on Topic:Kids Story,\n\nDo not add Scene description\n\nDo not add anything in Braces, just return the plain story in text\n\nNo website or app name included\n\nGive me a response in JSON format and follow the schema\n-{\nscripts:[\n{\ncontent:'\n};\n]"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"scripts\": [\n    {\n      \"content\": \"Once upon a time, in a land of rainbow rivers and chocolate mountains, lived a tiny dragon named Sparky. Sparky couldn't breathe fire, but he could juggle berries! One day, the King's crown went missing. Could Sparky's juggling skills help find it? Adventure awaits! Discover magical tales.\"\n    },\n    {\n      \"content\": \"A little bunny named Pip loved to paint. But Pip only painted in shades of gray. One day, a wise old owl showed Pip a hidden garden bursting with colors he'd never seen before. From that day on, Pip's paintings filled the world with joy. Unlock your imagination. Explore captivating stories.\"\n    }\n  ]\n}\n```"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
