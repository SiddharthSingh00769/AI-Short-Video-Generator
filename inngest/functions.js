import { inngest } from "./client";
import axios from "axios";
import { createClient } from "@deepgram/sdk";
import { GenerateImageScript } from "@/configs/AiModel";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const ImagePromptScript = `Generate Image Promt of {style} style with all details for each scene for 30 seconds video : script: {script}
- Just give specific image prompt depending on the story line
- Do not give camera angle image prompt
- Follow thw following schema and return JSON data (Max 4-5 images)
- Do not mention any extra detail in script content
- [
    {
      imagePrompt:'',
      sceneContent: '<Script Content>
    }
]`


export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

const BASE_URL='https://aigurulab.tech';
export const GenerateVideoData = inngest.createFunction(
  {id: 'generate-video-data'},
  {event: 'generate-video-data'},
  async({event, step}) => {

    const {script, topic, title, caption, videoStyle, voice, recordId} = event?.data;
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
    //Generate Audio File MP3
    const GenerateAudioFile = await step.run(
      "GenerateAudioFile",
      async() => {
        const result = await axios.post(BASE_URL+'/api/text-to-speech',
          {
              input: script,
              voice: voice
          },
          {
              headers: {
                  'x-api-key': process.env.NEXT_PUBLIC_AIGURULAB_API_KEY, // Your API Key
                  'Content-Type': 'application/json', // Content Type
              },
          })
        return result.data.audio;
      }
    )

    //Generate Captions
    const GenerateCaptions = await step.run(
      "generateCaptions",
      async() => {
        // STEP 1: Create a Deepgram client using the API key
        const deepgram = createClient(process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY);

        // STEP 2: Call the transcribeUrl method with the audio payload and options
        const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
          {
            url: GenerateAudioFile,
          },
          // STEP 3: Configure Deepgram options for audio analysis
          {
            model: "nova-3",
          }
        );
        return result.results?.channels[0]?.alternatives[0]?.words;
      }
    )

    //Generate Image Promt from Script
    const GenerateImagePrompt = await step.run(
      "generateImagePrompt",
      async() => {
        const FINAL_PROMPT = ImagePromptScript.replace('{style}', videoStyle).replace('{script}', script);
        const result = await GenerateImageScript.sendMessage(FINAL_PROMPT);
        const resp = JSON.parse(result?.response?.text());
        return resp;
      }
    )

    //Generate Images using AI
    const GenerateImages = await step.run(
      "generateImages",
      async() => {
        let images = [];
        images = await Promise.all(
          GenerateImagePrompt.map(async(element) => {
            const result = await axios.post(BASE_URL+'/api/generate-image',
              {
                  width: 1024,
                  height: 1024,
                  input: element?.imagePrompt,
                  model: 'sdxl',//'flux'
                  aspectRatio:"1:1"//Applicable to Flux model only
              },
              {
                  headers: {
                      'x-api-key': process.env.NEXT_PUBLIC_AIGURULAB_API_KEY, // Your API Key
                      'Content-Type': 'application/json', // Content Type
                  },
              })
              console.log(result.data.image) //Output Result: Base 64 Image
              return result.data.image;
          })
        );
        return images;
      }
    )

    //Save all Data to Database
    const UpdateDB = await step.run(
      'UpdateDB',
      async() => {
        const result = await convex.mutation(api.videoData.UpdateVideoRecord, {
          recordId: recordId,
          audioUrl: GenerateAudioFile,
          captionJson: GenerateCaptions,
          images: GenerateImages
        });
        return result;
      }
    )

    // return GenerateAudioFile;
    return "Executed Successfully!!";
  }
)