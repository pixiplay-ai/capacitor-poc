import { useEffect, useRef, useState } from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';

const Tab2: React.FC = () => {
  const audioURL = "https://file-examples.com/storage/fe0bd45a6765817dc92f8a6/2017/11/file_example_MP3_700KB.mp3";
  const [audioSrc, setAudioSrc] = useState("");
  const audioRef = useRef(new Audio());

  const handleAudioUpload = async (event: any) => {
    const file = event.target.files[0];
    if (file && (file.type === "audio/mp3" || file.type === "audio/wav" || file.type === "audio/x-wav")) {
      const src = URL.createObjectURL(file);
      setAudioSrc(src);
    }
  };

  const handleButtonClick = () => {
    setAudioSrc(audioURL);
  };

  useEffect(() => {
    if (audioSrc) {
      audioRef.current.src = audioSrc;
      
      audioRef.current.load();
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
      });
    }
  }, [audioSrc]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Audio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <input type="file" accept="audio/mp3, audio/wav" onChange={handleAudioUpload} />
        <audio ref={audioRef} controls>
          Your browser does not support the audio element.
        </audio>
        <IonButton onClick={handleButtonClick}>Load from web</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
