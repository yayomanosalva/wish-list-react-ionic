import React, { useEffect, useState } from 'react';
import { getAllProduct } from '../services/ProductService';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonImg, IonItem, IonList, IonRow } from '@ionic/react';
import StyleGeneral from '../styles/general.module.css';
import { Preferences } from '@capacitor/preferences';
import { useProducts } from '../hooks/useProducts';

const addToWishlist = async (productId) => {
  const { value } = await Preferences.get({ key: 'wishlist' });
  let wishlist = value ? JSON.parse(value) : [];
  wishlist.push(productId);
  await Preferences.set({ key: 'wishlist', value: JSON.stringify(wishlist) });
};

const removeFromWishlist = async (productId) => {
  const { value } = await Preferences.get({ key: 'wishlist' });
  let wishlist = value ? JSON.parse(value) : [];
  wishlist = wishlist.filter(id => id !== productId);
  await Preferences.set({ key: 'wishlist', value: JSON.stringify(wishlist) });
};

const getWishlist = async () => {
  const { value } = await Preferences.get({ key: 'wishlist' });
  // console.log(`Hello ${value}!`);
  return value ? JSON.parse(value) : [];
};

const ListProducts = () => {
  const { query } = useProducts();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (query.data) {
      setData(query.data);
    }
  }, [query.data]);

  interface Category {
    id: number;
    name: string;
    image: string;
  }

  interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: Category;
    images: string[];
  }

  // por si viene los datos como JSON
  // function parseImageArray(imageArray: string[]): string[] {
  //   return imageArray.map(imageStr => {
  //     try {
  //       const parsedImage = JSON.parse(imageStr);
  //       if (typeof parsedImage === 'string') {
  //         return parsedImage;
  //       } else if (Array.isArray(parsedImage)) {
  //         // Si el JSON parseado es un array, devuelve el primer elemento si es una cadena
  //         return typeof parsedImage[0] === 'string' ? parsedImage[0] : '';
  //       } else {
  //         console.error('Parsed image is not a string or array:', parsedImage);
  //         return '';
  //       }
  //     } catch (e) {
  //       console.error('Error parsing image string:', e);
  //       return '';
  //     }
  //   });
  // }

  const [wishlistState, setWishlistState] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const savedWishlist = await getWishlist();
      setWishlistState(savedWishlist);
    };
    fetchWishlist();
  }, []);

  const handleWishlistToggle = async (productId: any) => {
    if (wishlistState.includes(productId)) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }

    const updatedWishlist = await getWishlist();
    setWishlistState(updatedWishlist);
  };

  return (
    <div>
      <IonGrid>
        <IonRow>
          {data.map((itemProduct: Product) => {
            const images = itemProduct.images;
            return (
              <IonCol size="12" size-sm="6" key={itemProduct.id}>
                <IonCard className={StyleGeneral.cardContent}>
                  <div className={StyleGeneral.imgFull}>
                    <IonImg src={images[0]} className={StyleGeneral.imgInterna} />
                  </div>
                  <IonButton onClick={() => handleWishlistToggle(itemProduct.id)}>
                    {wishlistState.includes(itemProduct.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </IonButton>
                  <IonCardHeader>
                    <IonCardTitle>{itemProduct.title}</IonCardTitle>
                    <IonCardSubtitle>{itemProduct.category.name}</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p>{itemProduct.description}</p>
                    <p><strong>Price:</strong> ${itemProduct.price}</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            );
          })}

        </IonRow>
      </IonGrid>
    </div>
  );
};

export default ListProducts;
