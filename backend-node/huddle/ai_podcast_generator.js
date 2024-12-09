import * as speechSDK from 'microsoft-cognitiveservices-speech-sdk';
import fs from 'fs';
import { exec } from 'child_process';

const synthesizeSpeech = (text, voiceName, outputFile) => {
  const speechConfig = speechSDK.SpeechConfig.fromSubscription(
    'YOUR_AZURE_SUBSCRIPTION_KEY',
    'YOUR_AZURE_REGION'
  );
  speechConfig.speechSynthesisVoiceName = voiceName;

  const audioConfig = speechSDK.AudioConfig.fromAudioFileOutput(outputFile);
  const synthesizer = new speechSDK.SpeechSynthesizer(speechConfig, audioConfig);

  synthesizer.speakTextAsync(
    text,
    (result) => {
      if (result.reason === speechSDK.ResultReason.SynthesizingAudioCompleted) {
        console.log(`Synthesis succeeded for ${voiceName}.`);
        synthesizer.close();
        generateVideo(outputFile);
      } else {
        console.error(`Synthesis failed for ${voiceName}:`, result.errorDetails);
        synthesizer.close();
      }
    },
    (error) => {
      console.error(`Synthesis error for ${voiceName}:`, error);
      synthesizer.close();
    }
  );
};

const generateVideo = (audioFile) => {
  const videoFile = audioFile.replace('.wav', '.mp4');
  const command = `ffmpeg -loop 1 -i persona_image.jpg -i ${audioFile} -c:v libx264 -c:a aac -strict experimental -b:a 192k -shortest ${videoFile}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error generating video: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`FFmpeg stderr: ${stderr}`);
      return;
    }
    console.log(`Video generated: ${videoFile}`);
  });
};

const text = "Hello, this is a synthesized voice of Elon Musk.";
const voiceName = 'en-US-GuyNeural';
const outputFile = 'elon_musk_speech.wav';

synthesizeSpeech(text, voiceName, outputFile);
