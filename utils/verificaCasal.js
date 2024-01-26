import firestore from '@react-native-firebase/firestore';
import getUserID from './getUserID';

export default async function verificaCasal(){
    const userID = getUserID();
    const casaisCollectionRef = firestore().collection('casais');
    try {
        const querySnapshot1 = await casaisCollectionRef
            .where('userRef1', '==', userID)
            .get();

        const querySnapshot2 = await casaisCollectionRef
            .where('userRef2', '==', userID)
            .get();

        if (!querySnapshot1.empty || !querySnapshot2.empty) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
    }
    }