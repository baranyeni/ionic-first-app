import {IonContent, IonDatetime, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Age calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
