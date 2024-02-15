import auth from '@react-native-firebase/auth';

const logOut = ({ navigation }) => {
    auth()
    .signOut()
    .then(() => navigation.navigate('LoginScreen'));
}

export default logOut;