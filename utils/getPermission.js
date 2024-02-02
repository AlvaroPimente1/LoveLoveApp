import { Alert } from 'react-native';
import { request, PERMISSIONS, RESULTS,openSettings } from 'react-native-permissions';

export default async function getPermission() {
    try {
        const permissionStatus = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

        switch (permissionStatus) {
            case RESULTS.GRANTED:
                return true;
            case RESULTS.BLOCKED:
                return true;
            case RESULTS.UNAVAILABLE:
                Alert.alert('Permissão indisponível', 'Não é possível acessar o armazenamento externo.');
                return false;
            default:
                return false;
        }
    } catch (error) {
        Alert.alert('Erro ao solicitar permissão:', error.toString());
        return false;
    }
}
