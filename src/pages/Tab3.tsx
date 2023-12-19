import { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { SpeechRecognition } from "@capacitor-community/speech-recognition";
import './Tab3.css';

const Tab3: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState('');

  const startListening = async () => {
    // const languages = await SpeechRecognition.getSupportedLanguages();
    // console.log(languages);

    const isAvailable = await SpeechRecognition.available();
    if (isAvailable)
    {
      let permission = await SpeechRecognition.checkPermissions();
      if (permission.speechRecognition == 'prompt') {
        permission = await SpeechRecognition.requestPermissions();
      }
  
      if (permission.speechRecognition == 'granted') {
        await SpeechRecognition.start({
          language: "en-US",
          // language: "pt-BR",
          maxResults: 2,
          prompt: "Start speaking...", // Android only
          partialResults: true, // Android only
          popup: true, // Android only
        });
  
        SpeechRecognition.addListener("partialResults", (data: any) => {
          console.log("partialResults was fired", data.matches);
          setText(data.matches[0]);
        });
  
        setIsListening(true);
      }
    } else {
      console.log("Speech recognition not available");
    }
  };

  const stopListening = async () => {
    await SpeechRecognition.removeAllListeners();
    await SpeechRecognition.stop();
    setIsListening(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Speech</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Voice Recognition</IonTitle>
          </IonToolbar>
        </IonHeader>
        {isListening ? (
          <IonButton onClick={stopListening}>Stop Listening</IonButton>
        ) : (
          <IonButton onClick={startListening}>Start Listening</IonButton>
        )}
        <p>Recognized Text: {text}</p>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
