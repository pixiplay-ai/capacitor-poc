import { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


const Tab1: React.FC = () => {
  const [photo, setPhoto] = useState(null);

  const takePhoto = async () => {
    try {
      const cameraPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100
      });

      var imageUrl = cameraPhoto.webPath;
      setPhoto(imageUrl);
    } catch (error) {
      console.error("Error taking photo:", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Camera</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton onClick={takePhoto}>Take Photo</IonButton>
        {photo && <img src={photo} alt="Captured" />}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
