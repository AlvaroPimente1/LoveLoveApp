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
        borderWidth: 2,
        borderColor: '#fff'
    },

    containerFoto: {
        backgroundColor: '#1a8fff',
        paddingHorizontal: 100,
        flexDirection: 'row',
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

    button: {
        marginVertical: 10,
        padding: 3,
        
    }
})

export default styles;