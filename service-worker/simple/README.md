1. - The first time a user visits our web page, we install the Service Worker and add our offline HTML page into the browsers cache
2. - Then, if a user tries to navigate to another web page, but isn't connected to the internet, we can then return the cached offline HTML page as a response instead
3. - But, if the user tries to navigate to another web page and has connectivity, we simply continue as normal


In order to test this functionality, you can use the built-in Developer Tools in Chrome. 
Start by navigating to your web page, and once the Service Worker has installed head over to 
the Network tab and change the throttling to Offline.