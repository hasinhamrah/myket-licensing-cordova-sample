/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        
        onSuccessCallback = function(data) { 
                if (data.allow) {
                    navigator.notification.alert(
                        "می‌توانید از برنامه استفاده نمایید",
                        null,
                        "صدور مجوز",
                        "باشه"
                    );
                } else {
                    switch(data.policyReason){
                        case AndroidLicensePlugin.NOT_LICENSED:
                            navigator.notification.alert(
                                "شما مجوز استفاده از را ندارید. لطفا ابتدا برنامه را از مایکت خریداری نمایید",
                                function (button) {
                                    navigator.app.exitApp();
                                },
                                "صدور مجوز",
                                "باشه"
                            );
                            break;
                        case AndroidLicensePlugin.RETRY:
                            navigator.notification.alert(
                                "مشکلی به وجود آمده است، اتصال دستگاه خود به اینترنت را بررسی کنید و مجددا تلاش نمایید",
                                function (button) {
                                    AndroidLicensePlugin.check(
                                        onSuccessCallback, onErrorCallback
                                    );
                                },
                                "صدور مجوز",
                                "تلاش مجدد"
                            );
                            break;
                        case AndroidLicensePlugin.MYKET_NOT_INSTALLED:
                            navigator.notification.alert(
                                "برای استفاده از این برنامه، باید برنامه‌ی مایکت را روی دستگاه خود نصب کنید",
                                function (button) {
                                    navigator.app.exitApp();
                                },
                                "صدور مجوز",
                                "باشه"
                            );
                            break;
                        case AndroidLicensePlugin.MYKET_NOT_SUPPORTED:
                            navigator.notification.alert(
                                "برای استفاده از این برنامه، باید برنامه‌ی مایکت را روی دستگاه خود بروز نمایید",
                                function (button) {
                                    navigator.app.exitApp();
                                },
                                "صدور مجوز",
                                "باشه"
                            );
                            break;
                    }
                }
            };
            
        onErrorCallback = function(errorString) { alert("error: " + errorString);};
        
        AndroidLicensePlugin.check(
            onSuccessCallback, onErrorCallback
        );
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();