# DeguApp

DeguApp is an application designed for beer tasting enthusiasts to rate beers during tastings.

## Features

- **Adding Beers**: Users can add new beers to the app's database.
- **Beer Rating**: Users can rate beers based on their taste and experience.
- **Creating Sessions**: Users can create shared tasting sessions with friends.
- **Review Overview**: Users can view reviews from all users.
- **User Average Rating**: Users can see the average rating of each beer.

## Technologies Used

- **Backend API**:
  - Node.js
  - Express.js
  - Nork
  - TypeScript
  - MongoDB (for database storage)

- **Android and Web App**:
  - Expo

## Getting Started

To get started with DeguApp, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://git.filiprojek.cz/fr/deguapp.git
   ```

2. Install dependencies:

   ```bash
   # frontend
   cd deguapp/frontend
   npm install

   # backend
   cd deguapp/api
   npm install
   ```

3. Will be added in the future:)

5. Open the app in your browser or Android emulator and start exploring!

## Local builds
### Android

```bash
cd frontend/
npm i

export ANDROID_HOME=$HOME/.Android/Sdk/
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools

echo "EXPO_PUBLIC_API_URL=https://degu.filiprojek.cz/api/v1" > .env

npx expo prebuild

# edit gradle.properties and add info about signing key
# copy signing key to android/app/[keyname].keystore
# edit android/app/build.gradle

npx react-native build-android --mode=release

bundletool build-apks --bundle=./frontend/android/app/build/outputs/bundle/release/app-release.aab --output ./deguapp.apks --ks <upload-key.keystore> --ks-key-alias <upload-key-alias>

bundletool install-apks --apks=./deguapp.apks
```

#### Resources:

- https://github.com/expo/eas-cli/issues/1300
- https://reactnative.dev/docs/signed-apk-android#generating-the-release-aab

### Server

```bash
cd api/
npm i
npm run build
```

## Contributing

Contributions are welcome! If you'd like to contribute to DeguApp, please fork the repository and submit a pull request with your changes.
Use the upstream of the project, which can be found at https:/git.filiprojek.cz/fr/deguapp. **GitHub repository is just a mirror!**

## License

This project is licensed under the GNU GPLv3 License - see the [LICENSE](LICENSE) file for details.

