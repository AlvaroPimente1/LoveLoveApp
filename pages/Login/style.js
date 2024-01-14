import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffede6'
    },

    logo: {
        width: 200,
        height: 200
    },

    input: {
        borderBottomWidth: 1,
        borderColor: '#1a8fff',
        paddingVertical: 3,
        paddingHorizontal: 3,
        marginBottom: 10
    },

    botao: {
        backgroundColor: '#1a8fff',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        width: '100%',
        alignItems: 'center'
    },

    botaoText: {
        fontSize: 15,
        color: '#ffede6'
    }
})

export default styles;