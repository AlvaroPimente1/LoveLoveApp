import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffede6'
    },

    containerLista: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: '#ff7e93',
        width: '100%',
        borderRadius: 10,
        marginVertical: 5
    },

    buttonCompromisso: {
        backgroundColor: '#1a8fff',
        padding: 10,
        borderRadius: 10,
    },

    buttonHideCalendar: {
        backgroundColor: '#ff7e93',
        padding: 10,
        borderRadius: 10,
    },

    textButtons: {
        color: '#ffede6',
        fontSize: 15
    },

    containerCompromissos: {
        flex: 2,
        paddingHorizontal: 10, 
        backgroundColor: '#1a8fff',
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        paddingTop: 20
    }
})

export default styles;