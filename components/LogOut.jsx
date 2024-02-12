import React, { useState, useEffect } from "react";
import { View, Button, Text, Image, ActivityIndicator } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import getUserID from "../utils/getUserID";
import { useReducedMotion } from "react-native-reanimated";

const LogOutButton = (props) => {
    const { navigation } = props;
    const [ userInfo, setUserInfo ] = useState(null);

    const fetchUserInfo = async () => {
        try {
            const userRef = await firestore().collection('usuarios').doc(getUserID()).get();
    
            if (userRef.exists) { 
                const userData = userRef.data();
                setUserInfo(userData);
            }
        } catch (error) {
            console.log('Erro ao buscar informações do usuário:', error);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, [])

    const handleLogout = () => {
        auth()
        .signOut()
        .then(() => navigation.navigate('LoginScreen'));
    };

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <View style={{ marginVertical: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5 }}>
{/*                     {
                        userInfo.image ?
                            <Image style={{ width: 80, height: 80, borderRadius: 40 }} source={{ uri: userInfo.image }}/>
                            :
                            <ActivityIndicator size="large" color="#1a8fff" />
                    } */}
                    <View style={{ paddingLeft: 5 }}>
                        <Text>{userInfo?.nome ?? ''}</Text>
                        <Text>{userInfo?.email ?? ''}</Text>
                    </View>
                </View>
                <Button title="Logout" onPress={handleLogout} />
            </View>
        </DrawerContentScrollView>
    );
};

export default LogOutButton;
