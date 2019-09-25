### INSTALL 
- npm i

### RELINK LIBS
- rm -rf node_modules ios android &&
  npm i &&
  react-native upgrade --legacy &&
  react-native link &&
  cd ios && pod install && cd .. &&
  cp documentation/android_files/build.gradle android/app/build.gradle && 
  cp documentation/android_files/MainActivity.java android/app/src/main/java/com/app/MainActivity.java

### RUN SERVER (CONSOLE 1)
-npm start

### RUN APP (CONSOLE 2)
-npm ios