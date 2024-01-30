import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DrawerNavigatorCasal from "../Drawer/routes";
import CalendarioScreen from "../../../pages/Calendario";
import TerminoScreen from "../../../pages/Desconectar";

const Stack = createNativeStackNavigator();

export default function RoutesCasal(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="DrawerNavigatorCasal" component={DrawerNavigatorCasal} options={{ headerShown: false }}/>
            <Stack.Screen name="CalendarioScreen" component={CalendarioScreen} options={{ headerShown: true }}/>
            <Stack.Screen name="TerminoScreen" component={TerminoScreen} options={{ headerShown: true }}/>
        </Stack.Navigator>
    )
}