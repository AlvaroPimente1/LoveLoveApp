import firestore from '@react-native-firebase/firestore';
import getUserID from './getUserID';
import { useNavigation } from '@react-navigation/native';

export default function listenerTermino(){
    const navigation = useNavigation();

    const userRef = firestore().collection('usuarios').doc(getUserID());
    const unsubscribe =  userRef.onSnapshot((doc) => {
        if (doc.exists) {
            const userData =  doc.data();
            if(!userData.comprometido){
                navigation.navigate('RotasSolteiro');
            }
        } else {
            console.log("Documento não encontrado");
        }
    }, (error) => {
        console.error("Erro ao observar o documento:", error);
    });

    return () => unsubscribe();
}