import React, { useState, useEffect } from "react";
import styles from "./styles";
import { SafeAreaView, View, Text, TouchableOpacity, Alert, FlatList } from "react-native";
import { Calendar } from "react-native-calendars";
import ModalAgenda from "../../components/ModalCalendario";
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextTitle, TextContainer } from "../../styled/global.styles";
import { formatDate } from "../../utils/formatDate";

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
                .orderBy('dt_criado', 'desc')
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
                    dt_criado: firestore.FieldValue.serverTimestamp()
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
        const dataFormatada = formatDate(item.data_compromisso);

        return(
            <TouchableOpacity style={styles.containerLista}>
                { item.titulo_compromisso ? <TextContainer>{item.titulo_compromisso}</TextContainer> : <Text>laele</Text> }
                { item.descricao_compromisso ? <TextContainer>{item.descricao_compromisso}</TextContainer> : <Text>laele</Text> }
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    { item.data_compromisso ? <TextContainer>Criado em {dataFormatada}</TextContainer> : <Text>Carregando...</Text> }
                    <TouchableOpacity   onPress={()=> deleteEvent(item.id)}>
                            <Icon name="trash" size={20} color="#fff"/>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    
    return(
        <SafeAreaView style={styles.container}>
            {
                showCalendar ? 
                    <Calendar
                        onDayPress={(day) => {
                            setSelectedDate(day.dateString);
                        }}
                        
                        markedDates={{
                            [selectedDate]: {
                                selected: true,
                                selectedColor: '#1a8fff',
                            },
                        }}
                    />
                :
                    null
            }
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 20 }}>
                    <TouchableOpacity style={styles.buttonCompromisso} onPress={()=> setModalVisible(true)}>
                        <Text style={styles.textButtons}>Adicionar compromisso</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonCompromisso}
                        onPress={handleShowCalendar}
                    >
                        {
                            showCalendar ?
                                <Text style={styles.textButtons}>Mostrar menos</Text>
                            :
                                <Text style={styles.textButtons}>Mostrar mais</Text>
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.containerCompromissos}>
                    { selectedDate ? <TextTitle>{selectedDate}</TextTitle> : <Text></Text> }
                        {
                            !events.length == 0 ? 
                            <FlatList
                            data={events}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderItem}
                        />
                        :

                        <View style={{ alignItems: 'center', marginTop: '20%' }}>
                            <Text style={{ color: '#fff' }}>Nenhum Compromisso marcado para este dia</Text>
                        </View>
                        }
                </View>
            <ModalAgenda isModalVisible={isModalVisible} setModalVisible={setModalVisible} addEvent={addEvent} />
        </SafeAreaView>
    )
}