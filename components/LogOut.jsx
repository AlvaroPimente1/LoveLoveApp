import React from "react";
import { View, Button, Text, Image } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';

const LogOutButton = (props) => {
    const { navigation } = props;

    const handleLogout = () => {
        auth()
        .signOut()
        .then(() => navigation.navigate('LoginScreen'));
    };

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <View>
                <Button title="Logout" onPress={handleLogout} />
            </View>
        </DrawerContentScrollView>
    );
};

export default LogOutButton;
