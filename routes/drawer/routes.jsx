import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LogOutButton from "../../components/LogOut";

import HomeScreen from "../../pages/Home";
import NotificationsScreen from "../../pages/Notifications";
import PerfilScreen from "../../pages/Perfil";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator(){
    return(
        <Drawer.Navigator drawerContent={(props) => <LogOutButton {...props} />}>
            <Drawer.Screen name="HomeScreen" component={HomeScreen}/>
            <Drawer.Screen name="NotificationsScreen" component={NotificationsScreen}/>
            <Drawer.Screen name="PerfilScreen" component={PerfilScreen}/>
        </Drawer.Navigator>
    )
}