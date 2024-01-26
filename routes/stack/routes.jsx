import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../../pages/Login/index";
import CadastroScreen from "../../pages/Cadastro";
import ParPerfil from "../../pages/ParPerfil";
import ParPerfilSolicitacaoScreen from "../../pages/ParPerfilSolicitacao";
import DrawerNavigatorCasal from "../drawerCasal/routes";

import DrawerNavigator from "../drawer/routes";

const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="CadastroScreen" component={CadastroScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="HomeScreen" component={DrawerNavigator} options={{ headerShown: false }}/>
                <Stack.Screen name="ParPerfilScreen" component={ParPerfil} options={{ headerShown: true }}/>
                <Stack.Screen name="ParPerfilSolicitacaoScreen" component={ParPerfilSolicitacaoScreen} options={{ headerShown: true }}/>
                <Stack.Screen name="DrawerNavigatorCasal" component={DrawerNavigatorCasal} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}