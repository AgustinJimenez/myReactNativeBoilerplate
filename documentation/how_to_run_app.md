### INSTALL 
- npm i

### RELINK LIBS
- rm -rf node_modules ios android &&
  npm i &&
  react-native upgrade --legacy &&
  react-native link &&
  cd ios && pod install && cd ..

### RUN SERVER (CONSOLE 1)
-npm start

### RUN APP (CONSOLE 2)
-react-native run-ios --simulator='iPhone 5s'