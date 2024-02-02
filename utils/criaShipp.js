import firestore from '@react-native-firebase/firestore';

export default function CriarShipp(userRef, userParRef) {
    if (typeof userRef !== 'string' || typeof userParRef !== 'string') {
        throw new Error('Os parâmetros devem ser strings.');
    }
    
    const silabasPar = userParRef.length >= 4 ? userParRef.slice(0, 4) : userParRef;
    const silabasUser = userRef.length >= 4 ? userRef.slice(0, 4) : userRef;
    
    const shippCasal = silabasPar + silabasUser;
    return shippCasal;
}