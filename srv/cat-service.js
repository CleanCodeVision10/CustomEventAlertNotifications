const {
    AlertNotificationClient,
    OAuthAuthentication,
    RegionUtils
} = require('@sap_oss/alert-notification-client');


const CatalogService = (srv) => {
        srv.on('createEvent', async req => {

            // Dummy client with invalid Credentials. Please replace it alert notification service with your instance key details
            const client = new AlertNotificationClient({
                authentication: new OAuthAuthentication({
                    username: 'sb-7c26653c-4aa7-45d1-8df7-87b1f1ded477!b478401|ans-xsuaa!b673', 
                    password: '8882ace7-b65c-4867-918f-c4a7b7adcbe7$kG03aokrw7atJE9YyxwCp5bUbLBHbNTQ2_Y8XCljMT4=',
                    oAuthTokenUrl: 'https://6c05d52ctrial.authentication.us10.hana.ondemand.com/oauth/token?grant_type=client_credentials'
                }),
                region: RegionUtils.US10
            });
            let response = {};
            client.sendEvent({
                "eventType": "This is my Custom Event Type",
                "resource": {
                   "resourceName": "cap-demo-2-srv",
                   "resourceType": "app"
                },
                "severity": "ERROR",
                "category": "ALERT",
                "subject": "Subject of my Custom Event",
                "body": "Body of my Custom Event",
                "tags": {
                   "customTag": "Custom-Event-tag"
                }
             })
           
                .then(event => {
                    response=event;
                    console.log('Custom event sent:', event);
                })
                .catch(error => {
                    response=error;
                    console.error('Error sending event:', error);
                });

                req.reply(response);

        })


}



module.exports = CatalogService