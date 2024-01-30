import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CadastroScreen from "../../pages/Cadastro";
import LoginScreen from "../../pages/Login";
import RoutesCasal from "../CasalRoutes/Stack/routes";
import RoutesSolteiro from "../SolteiroRoutes/Stack/routes";

const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="CadastroScreen" component={CadastroScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="RotasCasal" component={RoutesCasal} options={{ headerShown: false }}/>
                <Stack.Screen name="RotasSolteiro" component={RoutesSolteiro} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}