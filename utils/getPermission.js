import { Alert, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';

export default async function getPermission() {
    try {
        let permissionStatus;

        if (Platform.OS === 'ios') {
            permissionStatus = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);

            if (permissionStatus === RESULTS.DENIED) {
                permissionStatus = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
            }
        } else {
            permissionStatus = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
        }

        switch (permissionStatus) {
            case RESULTS.GRANTED:
                return true;
            case RESULTS.BLOCKED:
                Alert.alert(
                    'Permissão negada',
                    'Você bloqueou o acesso à galeria. Abra as configurações para alterar isso.',
                    [
                        { text: 'Cancelar', style: 'cancel' },
                        { text: 'Abrir configurações', onPress: openSettings },
                    ],
                );
                return false;
            case RESULTS.UNAVAILABLE:
                Alert.alert('Permissão indisponível', 'Não é possível acessar a galeria de fotos neste dispositivo.');
                return false;
            default:
                return false;
        }
    } catch (error) {
        Alert.alert('Erro ao solicitar permissão', error.toString());
        return false;
    }
}
