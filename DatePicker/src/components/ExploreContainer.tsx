import './ExploreContainer.css';
import {DatetimeChangeEventDetail, IonButton, IonDatetime, IonTitle} from "@ionic/react";

import React, {useState, useRef} from 'react';

interface ContainerProps {
}

const ExploreContainer: React.FC<ContainerProps> = () => {
    const [popoverDate, setPopoverDate] = useState('');

    function setDate(ev: CustomEvent<DatetimeChangeEventDetail>) {
        let pickedDate = new Date(ev.detail.value!);
        setPopoverDate(pickedDate.toLocaleDateString("en-US"));
    }

    return (
      <div>
          <IonTitle>
              { popoverDate }
          </IonTitle>
            <div className="container">
                <IonDatetime locale="en-GB-u-hc-h12" onIonChange={ev => setDate(ev)} ></IonDatetime>
            </div>
      </div>
  );
};

export default ExploreContainer;
