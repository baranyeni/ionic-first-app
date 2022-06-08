import { Redirect, Route } from 'react-router-dom';
import {IonApp, IonMenu, IonHeader, IonToolbar, IonTitle, IonRouterOutlet, setupIonicReact} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Settings from "./pages/Settings";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import List from "./pages/List";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonMenu side="start" contentId="content">
      <IonHeader>
        <IonToolbar>
          <IonTitle className="menu-title">MENU</IonTitle>
        </IonToolbar>
      </IonHeader>
    </IonMenu>
    <IonReactRouter>
      <IonRouterOutlet id="content">
          <Route exact path="/home">
              <Home />
          </Route>
          <Route exact path="/list">
              <List />
          </Route>
          <Route exact path="/settings">
              <Settings />
          </Route>
          <Route exact path="/sign_in">
              <SignIn />
          </Route>
          <Route exact path="/register">
              <Register />
          </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
