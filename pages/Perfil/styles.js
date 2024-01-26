import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffede6',
    },

    fotoPerfil: {
        width: 200,
        height: 200,
        borderRadius: 25,
        borderWidth: 0.5,
        borderColor: '#1a8fff'
    },

    containerFoto: {
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
        width: 22,
        height: 22,
    },

    buttonEdit: {
        backgroundColor: '#1a8fff',
        marginTop: 10,
        padding: 8,
        borderRadius: 20 
    }
})

export default styles;