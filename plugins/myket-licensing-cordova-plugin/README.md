Cordova Plugin to extract Android License Information
===============================

Cordova/Phonegap (build) plugin for android server based license validation.

This plugin uses the Myket License Verification Library to request the paid apps license information from the play store. You can use this information to send it to your server for license verification and only grand those users access whose license information is valid.

Please see [this article] (http://android-developers.blogspot.de/2010/09/securing-android-lvl-applications.html) for why you should do that.

You can use the information retrieved by this plugin to feed [this php license verification library] (https://code.google.com/p/android-market-license-verification/).

Please note that you do NOT need to include you Public Key in the app since you will validate the license response on your server.

## Installation

### index.html

Add js import after your cordova.js / phonegap.js import
```html
<script type="text/javascript" src="AndroidLicensePlugin.js"></script>
```

### main.js

In your onDeviceReady you may start the license check with the following code.

```js
AndroidLicensePlugin.check(
        function(data) { alert( JSON.stringify(data));},
        function(errorString) { alert("error: " + errorString);}
        );
```

## Return Values

If the retrieval of the license information was successful the success callback will be called. Please note that a successful retrieval does NOT always mean that the app has a valid license! The list of possible policyReason in success callback is available in AndroidLicensePlugin.js.
```js
data = {
        policyReason: 0x0100,
        allow: true, // the result of Myket policy
        } 
```

If the retrieval was not successful the error callback will be called. This will happen in emulator, when the market app can not be reached, or there is not internet connection. Usually this means that you what to retry the request after a certain amount of time.

## Installation
This plugin is based on [plugman](https://github.com/apache/cordova-plugman). To install it to your app,
simply execute plugman as follows;

```sh
plugman install --platform android --project [TARGET-PATH] --plugin [PLUGIN-PATH]/platforms/android

where
        [TARGET-PATH] = path to folder containing your cordova/phonegap project
        [PLUGIN-PATH] = path to folder containing this plugin
```

Alternatively this plugin can be installed using the Cordova/Phonegap CLI.


```sh
cordova plugin add https://github.com/hasinhamrah/myket-licensing-cordova-plugin.git
```

After Installation you can use src/ir/myket/example/licensing/AndroidLicensePlugin.java class to set your BASE64_PUBLIC_KEY, which myket developer panel would give you.

## Additional Resources

[Securing Android LVL Applications](http://android-developers.blogspot.de/2010/09/securing-android-lvl-applications.html)

[Android Market License Verification in PHP] (https://code.google.com/p/android-market-license-verification/)

## Authors ##

Hadi Lashkari Ghouchani

## License ##

The MIT License

Copyright (c) 2016 Hadi Lashkari Ghouchani

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
