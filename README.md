# Badminton-Plouzane

## Configure the Dev Environment

* install vagrant and Virtual Box
	* $ vagrant plugin install ruby_dep --plugin-version 1.3.1	
	* $ vagrant plugin install vagrant-fsnotify
	* $ vagrant up --provision

* connect via ssh to 127.0.0.1:2122 vagrant/vagrant
	* $ su
	* $ vagrant/vagrant
	* $ curl -L https://github.com/docker/compose/releases/download/1.8.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
	* $ chmod +x /usr/local/bin/docker-compose
	* $ exit


* In the windows prompt
	* $ vagrant fsnotify

### Backend Server


### WebApp Server


HMR is enabled

## Start The Native Dev Environment (optional)

### Usefull Tools

**Sublime Text :** IDE.

**Source Tree :** Mercurial/Github repository manager.

**Genymotion :** Android Emulator.

**Android sdk :** Android tolls for development.

### Tools installation

#### Sublime Text
Url : [SublimeText](https://www.sublimetext.com/3)

React native package for sublime text : [PackageReactNative](https://github.com/facebookarchive/sublime-react)

#### Source Tree
Url : [SourceTree](https://blog.sourcetreeapp.com/2014/04/07/sourcetree-for-windows-1-5/)

BestSpot4Me GitHub repository : [BestSpot4Me](https://github.com/gartcimore/bestspot4me)

#### Android SDK
Url of the android sdk zip: [AndroidSDK](https://developer.android.com/studio/index.html)

Add ANDROID_HOME=Path/To/Android/sdk to environment variables

Add to windows PATH: Path/To/Android/sdk\tools;Path/To/Android/sdk\platform;Path/To/Android/sdk\platform-tools;

Thanks to Android SDK UI (cmd _android_ on windows command line) install Android7/Android6/Intel x86 Emulator Accelerator/build tool 23.0.1/android support repository 

#### Genymotion
Genymotion is free for personnal use, you just need to create an account on their site to get an access to download links.

Url : [Genymotion](https://www.genymotion.com/)

After installation and after Android SDK configuration, you just have to create a new virtual device. When your virtual device is available you have to enable _Use android SDK tools_ with the path of the Android SDK path. (Parameters -> ADB) .

### How to launch native application

Start the virtual device on Genymotion.

Thanks to a windows cmd line, on the native application folder (BestSpot4Me/client/native), do:
` $ npm install ` after that `mklink /D node_modules\common ..\..\common` to fix react-native issue with npm link (for windows users), and finally `react-native run-android`. 

App is available on the virtual device after a build (the first build is a bit long).

HMR must be available, when a modification is saved on SublimeText, the application is automatcally updated.

if HMR is not available, press F1 on Genymotion virtual device and "enable hot reloading".



