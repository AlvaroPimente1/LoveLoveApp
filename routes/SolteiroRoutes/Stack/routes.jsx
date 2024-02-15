import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ParPerfil from "../../../pages/ParPerfil";
import ParPerfilSolicitacaoScreen from "../../../pages/ParPerfilSolicitacao";

import DrawerNavigatorSolteiros from "../Drawer/routes";

const Stack = createNativeStackNavigator();

export default function RoutesSolteiro(){
    return(
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                    backgroundColor: "#1a8fff", // Substitua pelo código de cor desejado
                    },
                    headerTintColor: "#fff", // Cor do texto do cabeçalho
                    headerTitleStyle: {
                    fontWeight: "bold",
                    },
                }}  
            >
                <Stack.Screen name="HomeScreen" component={DrawerNavigatorSolteiros} options={{ headerShown: false, title: '' }}/>
                <Stack.Screen name="ParPerfilScreen" component={ParPerfil} options={{ headerShown: true, title: 'Perfil' }}/>
                <Stack.Screen name="ParPerfilSolicitacaoScreen" component={ParPerfilSolicitacaoScreen} options={{ headerShown: true, title: 'Perfil' }}/>
            </Stack.Navigator>
    )
}