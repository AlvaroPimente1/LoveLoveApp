import firestore from '@react-native-firebase/firestore';
import getUserID from './getUserID';

export default async function verificaCasal(){
    const userID = getUserID();
    try{
        const userRef = (await firestore().collection('usuarios').doc(userID)).get();

        const dadosUsuario = (await userRef).data()

        if(dadosUsuario.comprometido){
            return true
        } else {
            return false
        }
        
    } catch(error) {
        console.error(error);
    }
    }