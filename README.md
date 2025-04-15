# AI Short Video Generator

## Description

The **AI Short Video Generator** is an innovative application that harnesses the power of artificial intelligence to create short videos. Built using **Next.js**, **React**, and **Tailwind CSS**, this project provides a seamless user experience for generating engaging video content.

### Features

- **User  Authentication**: Secure login and registration using **Firebase**.
- **Content Generation**: Utilizes the **Google Gemini API** to generate video scripts based on user input.
- **Audio and Captioning**: Leverages the **Deepgram API** to convert text to audio and generate captions for videos.
- **Image Prompts**: Automatically generates images from text prompts to enhance video content.
- **Responsive Design**: Built with **Tailwind CSS** for a modern and responsive user interface.

### Technologies Used

- **Next.js**: Framework for server-side rendering and building React applications.
- **React**: Library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Convex Database**: For managing application data.
- **Firebase**: For user authentication and real-time database.
- **Google Gemini API**: For generating video scripts.
- **Deepgram API**: For generating image prompts and captions.

### API Endpoints

- **GET /videos**: Retrieve a list of all videos stored in the database.
- **POST /generate-content**: Generate video content from user input using Google's Gemini API.
- **POST /generate-audio**: Convert text input to audio using Deepgram.
- **POST /generate-captions**: Generate captions for audio or video files.
- **POST /generate-image**: Generate an image from a text prompt.
- **POST /save-video**: Save a video record to the database.
- **DELETE /videos/{id}**: Delete a video from the database.
