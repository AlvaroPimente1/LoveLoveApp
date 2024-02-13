import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LogOutButton from "../../../components/LogOut";

import AreaCasal from "../../../pages/AreaCasal";
import PerfilScreen from "../../../pages/Perfil";
import OptionsScreen from "../../../pages/Desconectar";

const Drawer = createDrawerNavigator();

export default function DrawerNavigatorCasal(){
    return(
        <Drawer.Navigator drawerContent={(props) => <LogOutButton {...props} />}
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#1a8fff', 
                },
                headerTintColor: '#fff', 
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Drawer.Screen name="AreaCasalScreen" component={AreaCasal} options={{ title: 'Home' }}/>
            <Drawer.Screen name="PerfilScreen" component={PerfilScreen} options={{ title: 'Perfil' }}/>
        </Drawer.Navigator>
    )
}