import React, { useState } from 'react';
import './login.css';
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonInput,
	IonItem,
	IonLabel,
	IonButton,
	IonCard,
	IonCardContent,
	IonToast,
	IonGrid,
	IonRow,
	IonCol,
} from '@ionic/react';
import { useMutation } from '@tanstack/react-query';
import { postLogin } from '../../services/AuthService';
import { useHistory } from 'react-router-dom';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showErrorToast, setShowErrorToast] = useState(false);
	const history = useHistory();

	// Mutations
	const mutation = useMutation({
		mutationFn: postLogin,
		onSuccess: () => {
			history.push('/home');
		},
		onError: () => {
			setShowErrorToast(true);
		},
	});

	const handleLogin = () => {
		mutation.mutate({ email, password });
		console.log('Email:', email);
		console.log('Password:', password);
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Login</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<div className="login-container">
					<IonGrid>
						<IonRow className='ion-justify-content-center'>
							<IonCol size="12" size-sm="8">
								<form>
									<IonItem>
										<IonInput
											type="email"
											label="Email"
											fill="solid"
											labelPlacement="floating"
											helperText="Digite correo válido"
											errorText="Invalid email"
											value={email}
											onIonChange={(e) => setEmail(e.detail.value!)}
											required
											clearInput
											className='inputOne'
										/>
									</IonItem>
									<IonItem>
										<IonLabel position="floating">Password</IonLabel>
										<IonInput
											type="password"
											label="Password"
											fill="solid"
											labelPlacement="floating"
											helperText="Digite contraseña válida"
											errorText="Invalid password"
											value={password}
											onIonChange={(e) => setPassword(e.detail.value!)}
											required
											clearInput
											className='inputOne'
										/>
									</IonItem>
									<IonButton expand="block" onClick={handleLogin} className="login-button">
										Iniciar Sesión
									</IonButton>
								</form>
							</IonCol>
						</IonRow>
					</IonGrid>
				</div>
				<IonToast
					isOpen={showErrorToast}
					onDidDismiss={() => setShowErrorToast(false)}
					message="Credenciales incorrectas"
					duration={5000}
					color="danger"
				/>
			</IonContent>
		</IonPage>
	);
};

export default Login;
