import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

const ButtonMenu = ({ icon, label, onPress }) => {
    return (
        <TouchableOpacity style={styles.ButtonOpcoes} onPress={onPress}>
        <Image style={styles.IconButton} source={icon}/>
        <Text style={styles.textBox}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    ButtonOpcoes: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1a8fff',
        minWidth: 150,
        width: '40%',
        height: 150,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#ff7e93',
        textAlign: 'center',  
    },

    textBox: {
        color: '#fff',
        marginTop: 5,
    },

    IconButton: {
        width: 50,
        height: 50,
    }
})

export default ButtonMenu;