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
    IonMenuButton,
    useIonViewWillEnter,
    IonList,
    IonItem
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { cafe, home, settings } from 'ionicons/icons';
import './Home.css';
import {Storage} from "@capacitor/storage";

const List: React.FC = () => {
    const getBearer = async () => {
        const { value } = await Storage.get({ key: 'bearer' });
        return value;
    };

    useIonViewWillEnter(() => {
        getBearer().then((token)=>{
            if (token == null || token.length == 0) {
                window.location.href = "/settings";
            }
        });
    });
        return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonButtons>
                <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Loved ones ❤️</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
          <IonList>
              <IonItem>
                  <IonLabel>Starbucks Coffee - Beyoğlu</IonLabel>
              </IonItem>
              <IonItem>
                  <IonLabel>NOVE - Cadde</IonLabel>
              </IonItem>
              <IonItem>
                  <IonLabel>Nero express - Maltepe</IonLabel>
              </IonItem>
              <IonItem>
                  <IonLabel>Kahve Dünyası - Üsküdar</IonLabel>
              </IonItem>
              <IonItem>
                  <IonLabel>Caribou Coffee - Marina</IonLabel>
              </IonItem>
          </IonList>
      </IonContent>
    <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/list">
            <IonIcon icon={home} />
        </IonTabButton>
        <IonTabButton tab="tab2" href="/home">
            <IonIcon icon={cafe} />
        </IonTabButton>
        <IonTabButton tab="tab3" href="/settings">
            <IonIcon icon={settings} />
        </IonTabButton>
    </IonTabBar>
    </IonPage>
  );
};

export default List;
