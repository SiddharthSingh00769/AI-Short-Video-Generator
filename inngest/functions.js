import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);


export const GenerateVideoData = inngest.createFunction(
  {id: 'generate-video-data'},
  {event: 'generate-video-data'},
  async({event, step}) => {

    //Generate Audio File MP3

    //Generate Captions

    //Generate Image Promt from Script

    //Generate Images using AI

    //Save all Data to Database
  }
)