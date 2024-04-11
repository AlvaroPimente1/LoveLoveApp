import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffede6',
        
    },

    input: {
        padding: 10, 
        backgroundColor: '#ffede6', 
        borderRadius: 10,
        marginVertical: 15,
        width: '80%',
        minHeight: '20%'
    },

    button: {
        padding: 10,
        backgroundColor: '#ff7e93',
        borderRadius: 10,
    },

    conteudoMain: {
        flex: 2,
        alignItems: 'center', 
        backgroundColor: '#1a8fff', 
        paddingTop: '25%', 
        borderTopRightRadius: 30, 
        borderTopLeftRadius: 30
    },

    mensagemBorrada: {
        backgroundColor: '#ebd9d2', 
        color: '#ebd9d2', 
        borderRadius: 50, 
        marginTop: 3,
        minWidth: '50%'
    },

    containerMensagem: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        width: '90%', 
        marginVertical: 10,
    },

    iconPerfil: {
        width: 60, 
        height: 60, 
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#ff7e93'
    }
    
})

export default styles;