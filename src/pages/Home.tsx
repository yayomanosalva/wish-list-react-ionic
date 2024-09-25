import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { logoIonic, heart } from 'ionicons/icons';
import ListProducts from '../components/ListProducts';
import './Home.css';
import { IonNav } from '@ionic/react';
import MineWishList from './MineWishList/MineWishList'

const Home: React.FC = () => {

  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonIcon slot="start" size="large" color="primary" icon={heart}></IonIcon>
            <IonTitle>Mis Favoritos</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonNav root={() => <MineWishList />}></IonNav>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large"></IonTitle>
            </IonToolbar>
          </IonHeader>
          {/* <ExploreContainer /> */}
          <div className="fullContainer">
            <ListProducts />
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
