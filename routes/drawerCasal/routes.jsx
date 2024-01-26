import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LogOutButton from "../../components/LogOut";

import AreaCasal from "../../pages/AreaCasal";

const Drawer = createDrawerNavigator();

export default function DrawerNavigatorCasal(){
    return(
        <Drawer.Navigator drawerContent={(props) => <LogOutButton {...props} />}>
            <Drawer.Screen name="AreaCasalScreen" component={AreaCasal}/>
        </Drawer.Navigator>
    )
}