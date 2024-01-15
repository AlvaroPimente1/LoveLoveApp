import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffede6'
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 0.5,
        borderColor: '#1a8fff',
        width: '80%'
    },
    
    buscaConteiner: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    

    buscaBotao: {
        marginHorizontal: 5,
    },

    botaoText: {
        color: '#1a8fff',
        fontSize: 16
    }
})

export default styles;