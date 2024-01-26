import React, { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import styles from "./style";
import firestore from '@react-native-firebase/firestore';
import getUserID from "../../utils/getUserID";

export default function AreaCasal(){

    return (
        <SafeAreaView style={styles.container}>
            <Text>deu certo</Text>
        </SafeAreaView>
    )
}
