import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../../pages/Home";
import LoginScreen from "../../pages/Login/index";
import CadastroScreen from "../../pages/Cadastro";

import TabNavigator from "../tab/routes";

const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="CadastroScreen" component={CadastroScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="HomeScreen" component={TabNavigator} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}