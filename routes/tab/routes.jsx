import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../../pages/Home";
import PerfilScreen from "../../pages/Perfil";
import DrawerNavigator from "../drawer/routes";

const Tab = createBottomTabNavigator();

export default function TabNavigator(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Drawer" component={DrawerNavigator}/>
            <Tab.Screen name="PerfilScreen" component={PerfilScreen}/>
        </Tab.Navigator>
    )
}