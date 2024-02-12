import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DrawerNavigatorCasal from "../Drawer/routes";
import CalendarioScreen from "../../../pages/Calendario";
import TerminoScreen from "../../../pages/Desconectar";
import MensagensScreen from "../../../pages/Mensagens";

const Stack = createNativeStackNavigator();

export default function RoutesCasal(){
    return(
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                backgroundColor: "#1a8fff", 
                },
                headerTintColor: "#fff", 
                headerTitleStyle: {
                fontWeight: "bold",
                },
            }}          
        >
            <Stack.Screen name="DrawerNavigatorCasal" component={DrawerNavigatorCasal} options={{ headerShown: false }}/>
            <Stack.Screen name="CalendarioScreen" component={CalendarioScreen} options={{ headerShown: true }}/>
            <Stack.Screen name="TerminoScreen" component={TerminoScreen} options={{ headerShown: true }}/>
            <Stack.Screen name="MensagemScreen" component={MensagensScreen} options={{ headerShown: true }}/>
        </Stack.Navigator>
    )
}