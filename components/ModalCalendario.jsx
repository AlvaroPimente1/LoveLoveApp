import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, Button, TouchableOpacity } from 'react-native';

export default function ModalAgenda({ isModalVisible, setModalVisible, addEvent }){
    const [ tituloCompromisso, setTituloCompromisso ] = useState('');
    const [ descricaoCompromisso, setDescricaoCompromisso ] = useState('');

    return(
        <>
        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => {
                setModalVisible(false);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={{ marginBottom: 10, color: '#fff' }}>Novo Compromisso</Text>
                    <TextInput
                        style={styles.input}
                        value={tituloCompromisso}
                        onChangeText={setTituloCompromisso}
                        placeholder="Digite o titulo"
                        placeholderTextColor={'#000'}
                    />
                    
                    <TextInput
                        style={styles.input}
                        value={descricaoCompromisso}
                        onChangeText={setDescricaoCompromisso}
                        placeholder="Digite a descrição"
                        placeholderTextColor={'#000'}
                    />
        
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                addEvent(tituloCompromisso, descricaoCompromisso);
                                setTituloCompromisso('');
                                setDescricaoCompromisso('');
                                setModalVisible(false);
                            }}
                        >
                            <Text style={styles.buttonText}>Adicionar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                setModalVisible(false);
                            }}
                        >
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity> 
                    </View>
                </View>
            </View>
        </Modal>
    </>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.4)", 
    },

    modalView: {
        width: '80%',
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#fff'
    },

    input: {
        width: '100%',
        padding: 10,
        borderColor: '#000',
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 5,
        color: '#000'
    },

    button: {
        backgroundColor: 'green',
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
    },

    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})