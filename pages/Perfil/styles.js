import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffede6',
        justifyContent: 'center'
    },

    fotoPerfil: {
        width: 250,
        height: 250,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#1a8fff'
    },

    containerFoto: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    containerInformacoes: {
        marginVertical: 20,
        backgroundColor: '#ebd9d2',
        padding: 30,
        borderRadius: 30,
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#1a8fff',
        minWidth: 300,
        maxWidth: 300
    },

    buttonCopy: {
        backgroundColor: '#1a8fff',
        padding: 10,
        marginTop: 15,
        borderRadius: 50
    },

    buttonCopyText: {
        color: '#ffede6'
    },

    iconEdit: {
        width: 15,
        height: 15,
    },

    iconSave: {
        width: 22,
        height: 22,
    },

    buttonEdit: {
        backgroundColor: '#1a8fff',
        marginLeft: 5,
        padding: 3,
        borderRadius: 20 
    },

    buttonSave: {
        backgroundColor: '#1a8fff',
        marginTop: 8,
        padding: 8,
        borderRadius: 20 
    },

    textData: {
        fontSize: 17
    },

    inputText: {
        borderBottomWidth: 1,
        borderBottomColor: '#1a8fff',
        width: '100%'
    }, 

    containerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#1a8fff',
        width: '30%',
        padding: 15,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20
    }
})

export default styles;