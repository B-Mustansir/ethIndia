import { HuddleClient } from '@huddle01/web-core';
import * as speechSDK from 'microsoft-cognitiveservices-speech-sdk';
import axios from 'axios';

const huddleClient = new HuddleClient({
  projectId: 'YOUR_PROJECT_ID',
});

const generateAccessToken = async () => {
  try {
    const response = await axios.post('YOUR_SERVER_ENDPOINT/generate-token', {
      roomId: 'YOUR_ROOM_ID',
      role: 'HOST',
    });
    return response.data.accessToken;
  } catch (error) {
    console.error('Error generating access token:', error);
  }
};

const joinRoom = async () => {
  const accessToken = await generateAccessToken();
  await huddleClient.joinRoom({
    roomId: 'YOUR_ROOM_ID',
    token: accessToken,
  });
};

huddleClient.room.on('room-joined', () => {
  console.log('Room Joined');
  startTranscription();
});

const startTranscription = () => {
  const speechConfig = speechSDK.SpeechConfig.fromSubscription(
    'YOUR_AZURE_SUBSCRIPTION_KEY',
    'YOUR_AZURE_REGION'
  );
  const audioConfig = speechSDK.AudioConfig.fromDefaultMicrophoneInput();
  const recognizer = new speechSDK.SpeechRecognizer(speechConfig, audioConfig);

  recognizer.recognizing = (s, e) => {
    console.log(`Recognizing: ${e.result.text}`);
  };

  recognizer.recognized = (s, e) => {
    if (e.result.reason === speechSDK.ResultReason.RecognizedSpeech) {
      console.log(`Recognized: ${e.result.text}`);
    }
  };

  recognizer.startContinuousRecognitionAsync();
};

const leaveRoom = async () => {
  await huddleClient.leaveRoom();
  console.log('Room Left');
};

joinRoom();

setTimeout(() => {
  leaveRoom();
}, 5 * 60 * 1000);
