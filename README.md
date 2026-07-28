<!-- For Start Server -->

npx expo start

<!-- For Android Build: -->

npx eas-cli build --platform android --profile preview

<!-- For IOS Build  -->

npx eas-cli build --platform ios --profile preview

<!-- Deploy is app store -->

npx eas-cli build --platform ios --profile production

npx eas-cli submit --platform ios --latest
