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
    },

    containerUser: {
        backgroundColor: '#ebd9d2',
        padding: 15,
        borderRadius: 20,
        borderWidth: 1, 
        borderColor: '#1a8fff'
    },

    perfilPar: {
        width: 70,
        height: 70,
        borderWidth: 1,
        borderColor: '#1a8fff',
        borderRadius: 25,
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