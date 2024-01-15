import auth from '@react-native-firebase/auth';

export default function getUserID(){
    if (auth().currentUser) {
        return auth().currentUser.uid;
    } else {
        return null;
    }
}