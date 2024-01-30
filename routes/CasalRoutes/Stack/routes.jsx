import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DrawerNavigatorCasal from "../Drawer/routes";

const Stack = createNativeStackNavigator();

export default function RoutesCasal(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="DrawerNavigatorCasal" component={DrawerNavigatorCasal} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
}