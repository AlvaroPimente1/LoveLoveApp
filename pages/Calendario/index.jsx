import React, { useState } from "react";
import styles from "./styles";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import ModalAgenda from "../../components/ModalCalendario";

export default function CalendarioScreen({ route }){
    const casalId = route.params.casalId

    const [ isModalVisible, setModalVisible ] = useState(false);
    
    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={()=> setModalVisible(true)}>
                <Text>{casalId}</Text>
            </TouchableOpacity>
            <ModalAgenda isModalVisible={isModalVisible} setModalVisible={setModalVisible}  />
        </SafeAreaView>
    )
}