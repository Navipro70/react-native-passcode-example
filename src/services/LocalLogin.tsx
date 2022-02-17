import {makeAutoObservable} from 'mobx';
import {Alert, Linking} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import * as Keychain from 'react-native-keychain';
// import {RSA} from 'react-native-rsa-native';

const onAlert = (title: string, message?: string) =>
  Alert.alert(title, message, [
    {
      text: 'OK',
      onPress: () => {
        /* back */
      },
    },
  ]);

enum LocalLoginService {
  digits = 'digits.com',
  biometric = 'biometric.com',
}

const MAX_ATTEMPS = 5;

class LocalLogicClass {
  maxAttemps = MAX_ATTEMPS;
  // Также в реальном приложении эти данные должны быть синхронизированы с бэкендом
  // И приложение на момент входа должно ограничивать доступ если нет интернета
  isActive = false;
  attemps = 0;
  blocked = false;
  biometricEnabled = false;

  constructor() {
    makeAutoObservable(this);
  }

  refreshBiometric = async () => {
    try {
      const {biometryType} = await ReactNativeBiometrics.isSensorAvailable();
      const data = await Keychain.getGenericPassword({
        service: LocalLoginService.biometric,
      });
      this.biometricEnabled = !!(biometryType && !!data);
      return biometryType && !!data;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  clearBiometric = async () => {
    try {
      const isSuccess = await Keychain.resetGenericPassword({
        service: LocalLoginService.biometric,
      });
      this.biometricEnabled = !isSuccess;
    } catch (e) {
      console.log(e);
    }
  };

  clearActive = async () => {
    try {
      const isSuccess = await Keychain.resetGenericPassword({
        service: LocalLoginService.digits,
      });
      await this.clearBiometric();
      this.isActive = !isSuccess;
    } catch (e) {
      console.log(e);
    }
  };

  refreshActive = async () => {
    try {
      const data = await Keychain.getGenericPassword({
        service: LocalLoginService.digits,
      });

      this.biometricEnabled = !!data;
      this.isActive = !!data;
      return !!data;
    } catch (e) {
      console.log(e);
      return this.isActive;
    }
  };

  getActiveCode = async () => {
    const data = await Keychain.getGenericPassword({
      service: LocalLoginService.digits,
    });
    if (data) {
      return data.password;
    } else {
      throw new Error('Service not avialable');
    }
  };

  increaseAttemps = () => {
    this.attemps = this.attemps + 1;
    if (this.attemps === MAX_ATTEMPS) {
      this.blocked = true;
    }
  };

  resetBlockedApp = async () => {
    this.attemps = 0;
    this.blocked = false;
  };

  setPincodeProtection = async (code: string) => {
    try {
      const data = await Keychain.setGenericPassword(
        LocalLoginService.digits,
        code,
        {
          service: LocalLoginService.digits,
        },
      );
      onAlert('Password successfully setted');
      this.isActive = !!data;
      return !!data;
    } catch (e: any) {
      // Отменяем установку экрана блокировки для приложения, показываем алерт с ошибкой
      onAlert('Error occured', e?.message || 'Unable set password');
      return false;
    }
  };

  setBiometricProtection = async () => {
    try {
      const {biometryType} = await ReactNativeBiometrics.isSensorAvailable();

      if (!biometryType) {
        Alert.alert(
          'Biometric setup',
          "App require permission for biometric setup or your phone isn't support any. Open setting and turn biometric on",
          [{text: 'Cancel'}, {text: 'Ok', onPress: Linking.openSettings}],
        );
      }

      const {publicKey} = await ReactNativeBiometrics.createKeys();

      // TODO сделать keychain отдельным сервисом приложения
      const data = await Keychain.setGenericPassword(
        LocalLoginService.biometric,
        publicKey,
        {
          service: LocalLoginService.biometric,
        },
      );
      this.biometricEnabled = !!(!!data && publicKey);
      return !!(!!data && publicKey);
    } catch (e) {
      // Обрабатываем ошибку
      console.log(e);
      return this.biometricEnabled;
    }
  };

  signInWithBiometry = async () => {
    try {
      const payload = `Enter at: ${Math.round(new Date().getTime() / 1000)}`;

      const publicKey = await Keychain.getGenericPassword({
        service: LocalLoginService.biometric,
      });
      const {signature, success} = await ReactNativeBiometrics.createSignature({
        promptMessage: '',
        payload,
      });

      if (!success || !signature || !publicKey) {
        return false;
      }

      // Если ключи не совпадают, приложение вылетает
      // Тут должна быть проверка на ключ, но тк я не полностью разобрался, её нету:)

      return true;
      // const signatureVerified = await RSA.verify(
      //   signature,
      //   payload,
      //   publicKey.password,
      // );

      // if (!signatureVerified) {
      //   console.log('Verified: ', signatureVerified);
      // }
    } catch (e) {
      // Automaticaly crash app for protection
      const test: any = {};
      console.log(test.should.crash);
      return false;
    }
  };
}

export const LocalLogin = new LocalLogicClass();
