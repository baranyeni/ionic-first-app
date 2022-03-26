import './ExploreContainer.css';
import {
    DatetimeChangeEventDetail,
    IonButton,
    IonCol,
    IonContent,
    IonDatetime, IonGrid,
    IonModal, IonRow,
    IonText,
    IonTitle
} from "@ionic/react";

import React, {useState, useRef} from 'react';

interface ContainerProps {
}

const ExploreContainer: React.FC<ContainerProps> = () => {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const [selectedDate, setSelectedDate] = useState('SELECTED DATE');
    const [popoverDate, setPopoverDate] = useState('Years, Months, Days, Minutes');
    const [hideButton, setButtonDisable] = React.useState(false);
    const [hidePicker, setPickerDisable] = React.useState(true);

    const today         = new Date().toLocaleDateString('en-CA');
    function setDate(ev: CustomEvent<DatetimeChangeEventDetail>) {
        setSelectedDate(new Date(ev.detail.value!).toLocaleDateString('en-CA'));
        console.log(selectedDate);
        let pickedDate = new Date(ev.detail.value!);
        let today      = new Date();
        let diff       = Math.floor((today.valueOf() - pickedDate.valueOf()) / _MS_PER_DAY );
        let diff_min   = Math.floor((today.valueOf() - pickedDate.valueOf()) / (_MS_PER_DAY / (24 * 60)) );

        let years  = Math.floor(diff/365);
        diff = diff - (years*365);
        let months = Math.floor(diff/30)
        let days = (diff % 30);
        let hours = Math.floor((diff_min-(days*24*60)) / 60);


        let minutes = diff_min - (years*365*24*60 + months*30*24*60 + days*24*60 + hours*60);

        reverseView();

        setPopoverDate(`${years} years, ${months} months, ${days} days, ${hours} hours, ${minutes} minutes`);
    }

    function reverseView() {
        if (hideButton) {
            setButtonDisable(false);
            setPickerDisable(true);
        } else {
            setButtonDisable(true);
            setPickerDisable(false);
        }
    }

    return (
        <IonGrid className={"ion-align-items-baseline vertical-align"}>
            <IonRow>
                <IonCol className={"ion-text-center"}>
                    <IonText className={"font1"} color={"primary"}>Calculate Your</IonText>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol className={"ion-text-center"}>
                    <IonText className={"font2"}>Age</IonText>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol className={"ion-text-center"}>
                    <IonDatetime size={"cover"} hidden={hidePicker} onIonCancel={() => reverseView()} max={today} showDefaultButtons={true} locale="en-GB-u-hc-h12" onIonChange={ev => setDate(ev)} ></IonDatetime>
                    <IonButton hidden={hideButton} onClick={() => reverseView()}>Pick a date!</IonButton>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol className={"ion-text-center"}>
                    <IonText>
                        { selectedDate }
                    </IonText>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol className={"ion-text-center"}>
                    <IonTitle class={"datePicked"}>
                        { popoverDate }
                    </IonTitle>
                </IonCol>
            </IonRow>
    </IonGrid>
  );
};

export default ExploreContainer;
