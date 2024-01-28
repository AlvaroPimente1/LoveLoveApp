import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffede6'
    },
    
    banner: {
        width: '100%',
        height: '55%',
        backgroundColor: '#1a8fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderBottomStartRadius: 40,
        borderBottomEndRadius: 40, 
    },

    icon: {
        width: 130, 
        height: 130, 
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#fff'
    }, 

    carrosel: {
        
    }
})

export default styles;