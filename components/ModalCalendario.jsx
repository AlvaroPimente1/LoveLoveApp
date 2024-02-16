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
                        placeholderTextColor={'#fff'}
                    />
                    
                    <TextInput
                        style={styles.input}
                        value={descricaoCompromisso}
                        onChangeText={setDescricaoCompromisso}
                        placeholder="Digite a descrição"
                        placeholderTextColor={'#fff'}
                    />
        
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <TouchableOpacity
                            style={styles.buttonConfirma}
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
        backgroundColor: "#1a8fff",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#ff7e93'
    },

    input: {
        width: '100%',
        padding: 10,
        borderColor: '#ff7e93',
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 5,
        color: '#fff'
    },

    button: {
        backgroundColor: '#ff7e93',
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
    },

    buttonConfirma: {
        backgroundColor: '#ff7e93',
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