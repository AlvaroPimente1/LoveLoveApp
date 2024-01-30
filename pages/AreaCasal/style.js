import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffede6'
    },
    
    banner: {
        width: '100%',
        height: '40%',
        backgroundColor: '#1a8fff',
        justifyContent: 'space-evenly',
        borderBottomStartRadius: 40,
        borderBottomEndRadius: 40, 
        borderColor: '#000',
    },

    icon: {
        width: 130, 
        height: 130, 
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#fff',
        marginHorizontal: 20
    }, 

    containerOpcoes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },

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

export default styles;