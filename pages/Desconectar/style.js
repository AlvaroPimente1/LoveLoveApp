import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffede6'
    },

    containerSolicitacao: {
        marginVertical: 20,
        backgroundColor: '#ebd9d2',
        padding: 30,
        borderRadius: 30,
        alignItems: 'center',
    },

    botaoCancelar: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 10
    },

    textButton: {
        color: '#ffede6',
        fontSize: 17
    }
})

export default styles;