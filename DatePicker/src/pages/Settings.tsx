
import {
    IonIcon,
    IonTabBar,
    IonTabButton,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    useIonViewWillEnter,
    IonGrid,
    IonRow,
    IonCol,
    IonButton
} from '@ionic/react';
import { Storage } from '@capacitor/storage';
import { cafe, home, settings } from 'ionicons/icons';
import React, {useState} from 'react';

import './Settings.css';

const Settings: React.FC = () => {
    const getBearer = async () => {
        const { value } = await Storage.get({ key: 'bearer' });
        return value;
    };

    const [bearerToken, setBearerToken] = useState<any>("");

    const setBearer = async (value: string) => {
        await Storage.set({
            key: 'bearer',
            value: value,
        }).then(() => {
            setBearerToken(value);
        });
    };

    const removeBearer = async () => {
        await Storage.remove({ key: 'bearer' });
    };

    useIonViewWillEnter(() => {
        getBearer().then((bearer)=>{
            if (bearer != null) setBearerToken(bearer);
        });
    });

    const titleText = (!(bearerToken?.length > 0)) ? 'Sign In/Up' : 'User Settings'

    const destroyBearer = () => {
        removeBearer().then(()=>{
            setBearerToken("");
            window.location.href = "/settings"
        });
    }

    const Login = () => {
        if (bearerToken.length > 0) { return (<></>) }

        return (
            <div>
                <IonGrid className={"ion-align-self-center"}>
                    <IonRow className={"ion-align-self-center"}>
                        <IonCol>
                            <IonButton href="/register" expand="block" color="primary">Register</IonButton>
                            <br/>
                            <p className={"text-center bold"}> OR </p>
                            <br/>
                            <IonButton href="/sign_in" expand="block" color="danger">Sign In</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </div>
        )
    }

    const Logout = () => {
        if (bearerToken.length <= 0) { return (<></>) }

        return (
            <div>
                <IonGrid className={"ion-align-self-center"}>
                    <IonRow className={"ion-align-self-center"}>
                        <IonCol>
                            <IonButton expand="block" color="danger" onClick={()=> destroyBearer()}>Log Out</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </div>
        )
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons>
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle> {titleText} </IonTitle>
                </IonToolbar>
            </IonHeader>

            <Login/>
            <Logout/>

            <IonTabBar slot="bottom">
                <IonTabButton tab="tab1" href="/home">
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

export default Settings;
