var fs = require('fs')
var { parseString, Builder } = require('xml2js')
var androidManifestPath = 'docs/android_files/app/src/main/AndroidManifest.xml'
var envFileFullPath = '../env'

var insertCredentialsOnNativeFiles = async _ => {
    var { GOOGLE_MAP_API_KEY } = require(envFileFullPath)

    fs.readFile(androidManifestPath, 'utf-8', (err, androidManifestString) => {
        if (err) throw err

        parseString(androidManifestString, (err, androidManifestJson) => {
            if (err) throw err

            androidManifestJson.manifest.application[0]['meta-data'][0]['$']['android:value'] = GOOGLE_MAP_API_KEY
            //console.log('RESULTS => ', JSON.stringify(androidManifestJson))
            var builder = new Builder()
            var xml = builder.buildObject(androidManifestJson)
            fs.writeFile(androidManifestPath, xml, (err, data) => {
                if (err) throw err
            })
        })
    })
}

var copyNativeFilesToNativeFolders = async _ => {
    let copyFiles = [
        { o: 'docs/android_files/app/build.gradle', d: 'android/app/build.gradle' },
        { o: 'docs/android_files/app/src/main/java/com/app/MainApplication.java', d: 'android/app/src/main/java/com/app/MainApplication.java' },
        { o: 'docs/android_files/app/src/main/java/com/app/MainActivity.java', d: 'android/app/src/main/java/com/app/MainActivity.java' },
        { o: androidManifestPath, d: 'android/app/src/main/AndroidManifest.xml' },
        { o: 'docs/ios_files/Podfile', d: 'ios/Podfile' },
        { o: 'node_modules/react-native-background-fetch/ios/RNBackgroundFetch/RNBackgroundFetch+AppDelegate.m', d: 'ios/app/RNBackgroundFetch+AppDelegate.m' },

    ]

    copyFiles.map(files => {
        fs.copyFile(files.o, files.d, err => {
            if (err) throw err
            //else console.log('');
        })
    })
}

let main = async () => {
    insertCredentialsOnNativeFiles()
    copyNativeFilesToNativeFolders()
}
main()
