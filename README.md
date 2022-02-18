## Usable example of implementation app protection with passcode and biometrics

All logic located at `src/services/LocalLogin.tsx`

This example use [react-native-keychain](https://github.com/oblador/react-native-keychain) to store protected data and [react-native-biometrics](https://github.com/SelfLender/react-native-biometrics) for biometric usage.

Veritification of biometric is going on client side with RSA algorythm (publicKey stored at keychain store).
