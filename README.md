## Usable example of implementation app protection with passcode and biometrics

All logic located at `src/services/LocalLogin.tsx`


This example use [react-native-keychain](https://github.com/oblador/react-native-keychain) to store protected data and [react-native-biometrics](https://github.com/SelfLender/react-native-biometrics) for biometric usage.

Veritification of biometric is going on client side with RSA algorythm (publicKey stored at keychain store).

| Passcode usage  | Biometrics and passcode reset |
| --------------- | --------------- |
| <img src="https://user-images.githubusercontent.com/60893275/154602590-fdb53f90-77f3-43ef-810b-db178bbada35.gif" alt="Passcode usage example" width="260" height="500"/> | <img src="https://user-images.githubusercontent.com/60893275/154603332-4ee04924-04da-429b-b3c7-9c9922eb50d1.gif" alt="Biometrics usage and passcode reset example" width="260" height="500"/> | 
