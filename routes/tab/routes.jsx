import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../../pages/Home";
import PerfilScreen from "../../pages/Perfil";

const Tab = createBottomTabNavigator();

export default function TabNavigator(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Busca" component={HomeScreen}/>
            <Tab.Screen name="PerfilScreen" component={PerfilScreen}/>
        </Tab.Navigator>
    )
}