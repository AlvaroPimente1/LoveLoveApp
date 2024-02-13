import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffede6',
        alignItems: 'center',
    },

    fotoPerfil: {
        width: 200,
        height: 200,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#ff7e93'
    },

    containerFoto: {
        backgroundColor: '#1a8fff',
        paddingHorizontal: 100,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        paddingVertical: 50
    },

    containerInfo: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    itensInfo: {
        padding: 30,
        backgroundColor: '#ebd9d2',
        marginTop: 20,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#1a8fff'
    },
})

export default styles;