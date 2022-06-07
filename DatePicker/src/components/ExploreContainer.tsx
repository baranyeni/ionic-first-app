import './ExploreContainer.css';
import {
    IonCol,
    IonGrid,
    IonRow,
    IonText, useIonViewWillEnter,
} from "@ionic/react";

import React, {useState} from 'react';

import TinderCard from 'react-tinder-card'
import axios from "axios";
import {Storage} from "@capacitor/storage";

interface ContainerProps {
}

const ExploreContainer: React.FC<ContainerProps> = () => {
    const BE_URL = 'https://work-n-travel-coffees.herokuapp.com'

    const getBearer = async () => {
        const { value } = await Storage.get({ key: 'bearer' });
        return value;
    };

    const shopsLoading = [
        {
            name: 'Fetching..',
            imageUrl: 'https://i.pinimg.com/originals/49/23/29/492329d446c422b0483677d0318ab4fa.gif',
            city: '',
            address: ''
        }
    ]

    const shopsError = [
        {
            name: 'BASE64',
            imageUrl: 'data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7',
            city: '',
            address: ''
        }
    ]

    const [lastDirection, setLastDirection] = useState()
    const [shops, setShops] = useState(shopsLoading)

    useIonViewWillEnter(() => {
        getBearer().then((auth_token)=>{
            if (auth_token != null) {
                axios.get(`${BE_URL}/shops/list/`,
                    {headers: {"Access-Control-Allow-Origin": "*","Authorization": auth_token }}).then((res: any) => {
                        if (res.status == 200) {
                            setShops(res.data);
                        }
                    }).catch((error: any) => {
                    console.log(error)
                });
            } else {
                setShops(shopsError);
            }
        });
    });

    const swiped = (direction: any, nameToDelete: any) => {
        setLastDirection(direction)
    }

    const outOfFrame = (name: any) => {
        console.log(name + ' left the screen!')
    }
    return (
        <IonGrid className={"ion-align-items-start vertical-align"}>
            <IonRow>
                <IonCol>
                    {shops.map((shop) =>
                        <TinderCard className='swipe' key={shop.name} onSwipe={(dir) => swiped(dir, shop.name)} onCardLeftScreen={() => outOfFrame(shop.name)}>
                            <div style={{ backgroundImage: "url('" + shop.imageUrl + "')" }} className='card'>
                                <div className="bottomTextContainer">
                                    <h2 className="cardText">{shop.name}</h2>
                                    <p className="cardText">{shop.city}</p>
                                    <p className="cardText">{shop.address}</p>
                                </div>
                            </div>
                        </TinderCard>
                    )}

                </IonCol>
                {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
            </IonRow>
    </IonGrid>
  );
};

export default ExploreContainer;
