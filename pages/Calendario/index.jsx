import React, { useState, useEffect } from "react";
import styles from "./styles";
import { SafeAreaView, View, Text, TouchableOpacity, Alert, FlatList } from "react-native";
import { Calendar } from "react-native-calendars";
import ModalAgenda from "../../components/ModalCalendario";
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CalendarioScreen({ route }){
    const casalId = route.params.casalId

    const [ isModalVisible, setModalVisible ] = useState(false);
    const [ selectedDate, setSelectedDate ] = useState(null);
    const [ events, setEvents ] = useState([]);
    const [ usuario, setUsuario ] = useState('');
    const [ showCalendar, setShowCalendar ] = useState(true);

    function handleShowCalendar(){
        if(showCalendar){
            setShowCalendar(false)
        }else{
            setShowCalendar(true)
        }
    }

    useEffect(() => {
        if (selectedDate) {
            const unsubscribe = firestore()
                .collection('casais')
                .doc(casalId)
                .collection('agenda')
                .doc(selectedDate)
                .collection('compromisso')
                .onSnapshot(querySnapshot => {
                    const eventsForDate = [];
                    querySnapshot.forEach(documentSnapshot => {
                        eventsForDate.push({
                            id: documentSnapshot.id,  
                            ...documentSnapshot.data()
                        });
                    });
                    setEvents(eventsForDate);
                    
                });

            return () => unsubscribe();
        }
    }, [selectedDate]);

    const addEvent = (titulo, descricao) => {
        if (selectedDate && titulo && descricao) {
            firestore()
                .collection('casais')
                .doc(casalId)
                .collection('agenda')
                .doc(selectedDate)
                .collection('compromisso')
                .add({ 
                    titulo_compromisso: titulo,
                    descricao_compromisso: descricao,
                    data_compromisso: selectedDate,
                });
        }
    };

    const deleteEvent = (eventId) => {
        if (selectedDate && eventId) {
            firestore()
                .collection('casais')
                .doc(casalId)
                .collection('agenda')
                .doc(selectedDate)
                .collection('compromisso')
                .doc(eventId)
                .delete()
                .then(() => {
                    Alert.alert("Compromisso deletado!");
                })
                .catch((error) => {
                    Alert.alert("Erro ao deletar compromisso: ", error);
                });
        }
    };

    function renderItem({ item }){
        return(
            <TouchableOpacity style={styles.containerLista}>
                { item.titulo_compromisso ? <Text>{item.titulo_compromisso}</Text> : <Text>laele</Text> }
                { item.descricao_compromisso ? <Text>{item.descricao_compromisso}</Text> : <Text>laele</Text> }
                { item.data_compromisso ? <Text>{item.data_compromisso}</Text> : <Text>laele</Text> }
                <TouchableOpacity   onPress={()=> deleteEvent(item.id)}>
                        <Icon name="trash" size={20} color="#000"/>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }

    
    return(
        <SafeAreaView style={styles.container}>
            {
                showCalendar ? 
                    <Calendar
                        style={styles.agenda}
                        onDayPress={(day) => {
                            setSelectedDate(day.dateString);
                        }}
                        
                        markedDates={{
                            [selectedDate]: {
                                selected: true,
                                selectedColor: '#663399',
                            },
                        }}
                    />
                :
                    null
            }
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <TouchableOpacity onPress={()=> setModalVisible(true)}>
                        <Icon name="plus" size={20} color="#000"/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleShowCalendar}
                    >
                        {
                            showCalendar ?
                                <Icon name="cancel" size={20} color="#000"/>
                            :
                                <Icon name="calendar" size={20} color="#000"/>
                        }
                    </TouchableOpacity>
                </View>
            <FlatList
                    data={events}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                />
            <ModalAgenda isModalVisible={isModalVisible} setModalVisible={setModalVisible} addEvent={addEvent} />
        </SafeAreaView>
    )
}