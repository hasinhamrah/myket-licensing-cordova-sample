var AndroidLicensePlugin = {
    check: function(successCallback, errorCallback) {
        cordova.exec(
             successCallback, 
             errorCallback, 
	         "AndroidLicensePlugin",
	         "check",
	         []);
     }
}
module.exports = AndroidLicensePlugin;

    /**
     * LICENSED means that the server returned back a valid license response
     */
module.exports.LICENSED = 0x0100;
    /**
     * NOT_LICENSED means that the server returned back a valid license response
     * that indicated that the user definitively is not licensed
     */
module.exports.NOT_LICENSED = 0x0231;
    /**
     * RETRY means that the license response was unable to be determined ---
     * perhaps as a result of faulty networking
     */
module.exports.RETRY = 0x0123;
    /**
     * MYKET_NOT_INSTALLED means Myket is not installed
     */
module.exports.MYKET_NOT_INSTALLED = 0x0300;
    /**
     * MYKET_NOT_SUPPORTED means that Myket version not support
     */
module.exports.MYKET_NOT_SUPPORTED = 0x0301;