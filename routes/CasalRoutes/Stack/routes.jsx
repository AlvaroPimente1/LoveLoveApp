import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DrawerNavigatorCasal from "../Drawer/routes";
import CalendarioScreen from "../../../pages/Calendario";
import TerminoScreen from "../../../pages/Desconectar";
import MensagensScreen from "../../../pages/Mensagens";
import DateScreen from "../../../pages/Dates";

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
            <Stack.Screen name="DrawerNavigatorCasal" component={DrawerNavigatorCasal} options={{ headerShown: false, title: '' }}/>
            <Stack.Screen name="CalendarioScreen" component={CalendarioScreen} options={{ headerShown: true, title: 'Calendario' }}/>
            <Stack.Screen name="TerminoScreen" component={TerminoScreen} options={{ headerShown: true, title: 'Terminar' }}/>
            <Stack.Screen name="MensagemScreen" component={MensagensScreen} options={{ headerShown: true, title: 'Só love' }}/>
            <Stack.Screen name="DateScreen" component={DateScreen} options={{ headerShown: true, title: 'Dates' }}/>
        </Stack.Navigator>
    )
}