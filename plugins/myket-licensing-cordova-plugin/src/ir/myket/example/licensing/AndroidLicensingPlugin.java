package ir.myket.example.iab;

import android.content.Context;
import android.provider.Settings.Secure;

import com.google.android.vending.licensing.AESObfuscator;
import com.google.android.vending.licensing.LicenseChecker;
import com.google.android.vending.licensing.LicenseCheckerCallback;
import com.google.android.vending.licensing.MyketServerManagedPolicy;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * @Hadi Lashkari Ghouchani
 */
public class AndroidIabPlugin extends CordovaPlugin {
    private static final String BASE64_PUBLIC_KEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCmQ7Akv2d49KQXaXwMkuQFoIyQyKT4FXL3OUe+CxYlfQZRJr9+oHeBtmvqIojj0U/UGuVtghsHX8vBgqW4t4UeiKaQDzm+GNgfDSGktjoFZBQLT4MLp5vJzOK2Xuh0GRcUFW6aXhsZY5EJK4UFzYwbRu4aNHdurfCCycke8o/SywIDAQAB";

    // Generate your own 20 random bytes, and put them here.
    private static final byte[] SALT = new byte[]{
            -46, 65, 30, -128, -103, -57, 74, -64, 51, 88, -95, -45, 77, -117, -36, -113, -11, 32, -64,
            89
    };

    public CallbackContext callbackContext;


    private LicenseCheckerCallback mLicenseCheckerCallback;
    private LicenseChecker mChecker;


    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        this.callbackContext = callbackContext;
        if ("check".equals(action)) {
            //callbackContext.success("hi ho");
            startCheck();
            return true;
        }
        return false;  // Returning false results in a "MethodNotFound" error.
    }

    private void startCheck() {
        Context context = this.cordova.getActivity().getApplicationContext();

        // Try to use more data here. ANDROID_ID is a single point of attack.
        String deviceId = Secure.getString(context.getContentResolver(), Secure.ANDROID_ID);

        // Library calls this when it's done.
        mLicenseCheckerCallback = new MyLicenseCheckerCallback();
        // Construct the LicenseChecker with a policy.
        mChecker = new LicenseChecker(
                context, new MyketServerManagedPolicy(context,
                new AESObfuscator(SALT, context.getPackageName(), deviceId)),
                BASE64_PUBLIC_KEY);
        doCheck();
    }

    private void doCheck() {
        mChecker.checkAccess(mLicenseCheckerCallback);
    }

    public class MyLicenseCheckerCallback implements LicenseCheckerCallback {

        // this function is never called 
        public void allow(int policyReason) {
            cordovaSuccess(policyReason, true);
        }

        // this function is never called 
        public void dontAllow(int policyReason) {
            cordovaSuccess(policyReason, false);
        }

        public void applicationError(int errorCode) {
            callbackContext.error("applicationError, errorCode: " + errorCode);
        }

        private void cordovaSuccess(int policyReason, boolean allow) {
            JSONObject jo = new JSONObject();
            try {
                jo.put("policyReason", policyReason);
                jo.put("allow", allow);
                callbackContext.success(jo);
            } catch (JSONException e) {
                callbackContext.error("error building JSONObject for rawData");
            }
        }
    }
}
