import {
    IonIcon,
    IonLabel,
    IonContent,
    IonTabBar,
    IonTabButton,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { ellipse, home, settings } from 'ionicons/icons';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonButtons>
                <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>WnTC</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
          <ExploreContainer />
      </IonContent>webpack.config.common.js:
    <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/home1">
            <IonIcon icon={ellipse} />
        </IonTabButton>
        <IonTabButton tab="tab2" href="/home">
            <IonIcon icon={home} />
        </IonTabButton>
        <IonTabButton tab="tab3" href="/settings">
            <IonIcon icon={settings} />
        </IonTabButton>
    </IonTabBar>
    </IonPage>
  );
};

export default Home;
