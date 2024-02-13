import React, { useState, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import firestore from '@react-native-firebase/firestore';
import getUserID from "../../../utils/getUserID";
import LogOutButton from "../../../components/LogOut";

import HomeScreen from "../../../pages/Home";
import NotificationsScreen from "../../../pages/Notifications";
import PerfilScreen from "../../../pages/Perfil";

const Drawer = createDrawerNavigator();

export default function DrawerNavigatorSolteiros(){
    const [notificacoes, setNotificacoes] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRef = firestore().collection('usuarios').doc(getUserID());
                const doc = await userRef.get();

                if (doc.exists) {
                    const dataUser = doc.data();
                    const arrayNotificacoes = dataUser.solicitacoes_recebidas;
                    setNotificacoes(arrayNotificacoes.length); 
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return(
        <Drawer.Navigator drawerContent={(props) => <LogOutButton {...props} />}
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#1a8fff', 
                },
                headerTintColor: '#fff', 
                headerTitleStyle: {
                    fontWeight: 'bold', 
                },
            }}
        >
            <Drawer.Screen name="BuscaScreen" component={HomeScreen} options={{ title: 'Busca' }}/>
            <Drawer.Screen name="NotificationsScreen" component={NotificationsScreen} options={{ title: `Notificações (${notificacoes})` }}/>
            <Drawer.Screen name="PerfilScreen" component={PerfilScreen} options={{ title: 'Perfil' }}/>
        </Drawer.Navigator>
    )
}