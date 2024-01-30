import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ParPerfil from "../../../pages/ParPerfil";
import ParPerfilSolicitacaoScreen from "../../../pages/ParPerfilSolicitacao";

import DrawerNavigatorSolteiros from "../Drawer/routes";

const Stack = createNativeStackNavigator();

export default function RoutesSolteiro(){
    return(
            <Stack.Navigator>
                <Stack.Screen name="HomeScreen" component={DrawerNavigatorSolteiros} options={{ headerShown: false }}/>
                <Stack.Screen name="ParPerfilScreen" component={ParPerfil} options={{ headerShown: true }}/>
                <Stack.Screen name="ParPerfilSolicitacaoScreen" component={ParPerfilSolicitacaoScreen} options={{ headerShown: true }}/>
            </Stack.Navigator>
    )
}