import {
    IonBackButton,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonItem,
    IonInput,
    IonButton,
    IonLabel,
    IonContent,
    IonPage,
    IonGrid, IonRow, IonCol
} from '@ionic/react';
import React from 'react';
import axios from 'axios';
import './SignIn.css';
import { Storage } from '@capacitor/storage';

export const SignIn: React.FC = () => {
    const setBearer = async (value: string) => {
        await Storage.set({
            key: 'bearer',
            value: value,
        });
    };

    const BE_URL = 'https://work-n-travel-coffees.herokuapp.com'

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement);
        axios.post(`${BE_URL}/login/`, formData)
            .then((res: any) => {
                if (res.status == 200 && res.data.status === "success") {
                    const auth_token = `Bearer ${res.data.auth_token}`;

                    axios.post(`${BE_URL}/users/authorize_check/`, {},
                        {headers: {
                                "Access-Control-Allow-Origin": "*",
                                "Authorization": auth_token }}).then((res: any) => {
                                    if(res.data.authorized == true) {
                                        setBearer(auth_token).then(()=>{
                                            window.location.href = "/home";
                                        });
                                    }
                    });
                }
            }).catch((error: any) => {
            console.log(error)
        });
    }

    return (
        <IonPage>
            <IonContent>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="settings" />
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonGrid className={"ion-align-items-baseline vertical-align"}>
                        <IonRow>
                            <IonCol className={"ion-text-center"}>
                                <form onSubmit={handleSubmit}>
                                    <IonItem>
                                        <IonLabel position="floating">Email</IonLabel>
                                        <IonInput name={'email'} type={'text'}></IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="floating">Password</IonLabel>
                                        <IonInput name={'password'} type={'password'}></IonInput>
                                    </IonItem>                                    <div className="ion-padding">
                                        <IonButton expand="block" type="submit">
                                            Log In
                                        </IonButton>
                                    </div>
                                </form>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonContent>
        </IonPage>
    );
};

export default SignIn;
