import './ExploreContainer.css';
import {DatetimeChangeEventDetail, IonButton, IonContent, IonDatetime, IonModal, IonTitle} from "@ionic/react";

import React, {useState, useRef} from 'react';

interface ContainerProps {
}

const ExploreContainer: React.FC<ContainerProps> = () => {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const [popoverDate, setPopoverDate] = useState('Years, Months, Days, Minutes');
    const [hideButton, setButtonDisable] = React.useState(false);
    const [hidePicker, setPickerDisable] = React.useState(true);
    const datepickerRef = useRef<any>(null);

    const today         = new Date().toLocaleDateString('en-CA');
    function setDate(ev: CustomEvent<DatetimeChangeEventDetail>) {
        let pickedDate = new Date(ev.detail.value!);
        let today      = new Date();
        let diff       = Math.floor((today.valueOf() - pickedDate.valueOf()) / _MS_PER_DAY );
        let diff_min   = Math.floor((today.valueOf() - pickedDate.valueOf()) / (_MS_PER_DAY / (24 * 60)) );


        let years  = Math.floor(diff/365);
        diff = diff - (years*365);
        let months = Math.floor(diff/30)
        let days   = (diff % 30);

        let hours  = Math.floor((diff_min - days*24*60) / 60);
        diff_min = (diff_min - days*24*60);

        let minutes  = Math.floor(diff_min % 24);

        reverseView();

        // TODO: add the diff in minutes
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
      <IonContent>
            <div className="container">
                <p>Calculate Your</p>
                <p>Age</p>

                <IonDatetime hidden={hidePicker} onIonCancel={() => reverseView()} max={today} showDefaultButtons={true} ref={datepickerRef} locale="en-GB-u-hc-h12" onIonChange={ev => setDate(ev)} ></IonDatetime>
                <IonButton hidden={hideButton} onClick={() => reverseView()}>Pick a date!</IonButton>

                <IonTitle class={"datePicked"}>
                    { popoverDate }
                </IonTitle>
            </div>
      </IonContent>
  );
};

export default ExploreContainer;
