import React, { useEffect, useState } from 'react';
import './MineWishList.css';
import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonImg,
	IonItem,
	IonLabel,
	IonList,
	IonSelect,
	IonSelectOption,
} from '@ionic/react';
import { Preferences } from '@capacitor/preferences';
import { useProducts } from '../../hooks/useProducts';
import { Product } from '../../model/interface';

const getWishlist = async () => {
	const { value } = await Preferences.get({ key: 'wishlist' });
	return value ? JSON.parse(value) : [];
};

const MineWishList = () => {
	const { query } = useProducts();
	const [data, setData] = useState<Product[]>([]);
	const [wishlistState, setWishlistState] = useState<number[]>([]);
	const [showData, setShowData] = useState<Product[]>([]);
	const [opcionFiltrar, setOpcionFiltrar] = useState<string>('');

	useEffect(() => {
		if (query.data) {
			setData(query.data);
		}
	}, [query.data]);

	useEffect(() => {
		const fetchWishlist = async () => {
			const savedWishlist = await getWishlist();
			setWishlistState(savedWishlist);
		};
		fetchWishlist();
	}, []);

	useEffect(() => {
		if (data.length > 0 && wishlistState.length > 0) {
			let filteredData = data.filter((item) => wishlistState.includes(item.id));
			
			if (opcionFiltrar === 'name') {
				filteredData = filteredData.sort((a, b) => a.title.localeCompare(b.title));
			} else if (opcionFiltrar === 'price') {
				filteredData = filteredData.sort((a, b) => a.price - b.price);
			}

			setShowData(filteredData);
		}
	}, [data, wishlistState, opcionFiltrar]);

	const handleUpdateWishlist = async () => {
		const savedWishlist = await getWishlist();
		setWishlistState(savedWishlist);
	};

	// Funciones de filtrado
	const handleSortChange = (value: string) => {
		setOpcionFiltrar(value);
	};

	return (
		<div className="list">
			<IonButton onClick={handleUpdateWishlist}>Actualizar Lista de Deseos</IonButton>

			<IonList>
				<IonItem>
					<IonSelect
						aria-label="Ordenar productos"
						interface="action-sheet"
						placeholder="Ordenar Producto"
						onIonChange={(e) => handleSortChange(e.detail.value)}
					>
						<IonSelectOption value="name">Nombre</IonSelectOption>
						<IonSelectOption value="price">Precio</IonSelectOption>
					</IonSelect>
				</IonItem>
			</IonList>

			<IonList>
				{showData.map((item, index) => (
					<IonItem key={index}>
						<IonCard className="sss">
							<div className="imgSize">
								<IonImg src={item.images[0]} className="xxx" />
							</div>
							<IonCardHeader>
								<IonCardTitle>{item.title}</IonCardTitle>
								<IonCardSubtitle>{item.category.name}</IonCardSubtitle>
							</IonCardHeader>
							<IonCardContent>
								<p>{item.description}</p>
								<p>
									<strong>Precio:</strong> ${item.price}
								</p>
							</IonCardContent>
						</IonCard>
					</IonItem>
				))}
			</IonList>
		</div>
	);
};

export default MineWishList;
