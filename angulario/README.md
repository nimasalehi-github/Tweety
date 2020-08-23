You can run the live example / download example that accompanies this guide.

The sample app does not require a data server. It relies on the Angular in-memory-web-api, which replaces the HttpClient module's HttpBackend. The replacement service simulates the behavior of a REST-like backend.

Look at the AppModule imports to see how it is configured.
https://github.com/angular/in-memory-web-api/blob/master/README.md

# https://angular.io/guide/http#setup-for-server-communication

    app/app.module.ts (excerpt)
    app/config/config.service.ts (excerpt)
    app/config/config.service.ts (RxJS imports)



Use the HTTPClient.get() method to fetch data from a server. The asynchronous method sends an HTTP request, and returns an Observable that emits the requested data when the response is received. The return type varies based on the observe and responseType values that you pass to the call.
  
The get() method takes two arguments; the endpoint URL from which to fetch, and an options object that you can use to configure the request.

You can use the options object to configure various other aspects of an outgoing request. In Adding headers, for example, the service set the default headers using the headers option property.

Use the params property to configure a request with HTTP URL parameters, and the reportProgress option to listen for progress events when transferring large amounts of data.

# https://angular.io/guide/http#requesting-data-from-a-server

    assets/config.json
    app/config/config.service.ts (getConfig v.1)
    app/config/config.component.ts (showConfig v.1)
    https://angular.io/guide/http#requesting-a-typed-response
        app/config/config.service.ts (getConfig v.2)
        app/config/config.component.ts (showConfig v.2)
    https://angular.io/guide/http#reading-the-full-response
        app/config/config.component.ts (showConfigResponse)
    https://angular.io/guide/http#making-a-jsonp-request
    https://angular.io/guide/http#requesting-non-json-data
        app/downloader/downloader.service.ts (getTextFile)
        app/downloader/downloader.component.ts (download)




# https://angular.io/guide/http#handling-request-errors

    https://angular.io/guide/http#getting-error-details
        app/config/config.service.ts (handleError)
        app/config/config.service.ts (getConfig v.3 with error handler)
    https://angular.io/guide/http#retrying-a-failed-request
        app/config/config.service.ts (getConfig with retry)

# https://angular.io/guide/http#sending-data-to-a-server

    https://angular.io/guide/http#making-a-post-request
        app/heroes/heroes.service.ts (addHero)
        app/heroes/heroes.component.ts (addHero)
    https://angular.io/guide/http#making-a-delete-request
        app/heroes/heroes.service.ts (deleteHero)
        app/heroes/heroes.component.ts (deleteHero)
        Always subscribe!
    https://angular.io/guide/http#making-a-put-request
        app/heroes/heroes.service.ts (updateHero)
    https://angular.io/guide/http#adding-and-updating-headers
        https://angular.io/guide/http#adding-headers
            app/heroes/heroes.service.ts (httpOptions)
        https://angular.io/guide/http#updating-headers

# https://angular.io/guide/http#configuring-http-url-parameters

# https://angular.io/guide/http#intercepting-requests-and-responses

    https://angular.io/guide/http#write-an-interceptor
        app/http-interceptors/noop-interceptor.ts
    https://angular.io/guide/http#the-next-object
    https://angular.io/guide/http#provide-the-interceptor
        app/http-interceptors/index.ts
        app/app.module.ts (interceptor providers)
    https://angular.io/guide/http#interceptor-order
    https://angular.io/guide/http#handling-interceptor-events
        app/http-interceptors/ensure-https-interceptor.ts (excerpt)
    https://angular.io/guide/http#modifying-a-request-body
        app/http-interceptors/trim-name-interceptor.ts (excerpt)
        https://angular.io/guide/http#clearing-the-request-body-in-a-clone
    https://angular.io/guide/http#setting-default-headers
        app/http-interceptors/auth-interceptor.ts
    https://angular.io/guide/http#using-interceptors-for-logging
        app/http-interceptors/logging-interceptor.ts)
    https://angular.io/guide/http#using-interceptors-for-caching
        app/http-interceptors/caching-interceptor.ts)
    https://angular.io/guide/http#using-interceptors-to-request-multiple-values

# https://angular.io/guide/http#tracking-and-showing-request-progress

    app/uploader/uploader.service.ts (upload request)
    app/uploader/uploader.service.ts (upload body)
    app/uploader/uploader.service.ts (getEventMessage)

# https://angular.io/guide/http#optimizing-server-interaction-with-debouncing

    app/package-search/package-search.component.html (search)
    app/package-search/package-search.component.ts (excerpt)
    https://angular.io/guide/http#using-the-switchmap-operator

# https://angular.io/guide/http#security-xsrf-protection

    https://angular.io/guide/http#configuring-custom-cookieheader-names

# https://angular.io/guide/http#testing-http-requests

    You can run these sample tests / download example in a live coding environment.
    https://angular.io/guide/http#setup-for-testing
        app/testing/http-client.spec.ts (imports)
        app/testing/http-client.spec.ts(setup)
    https://angular.io/guide/http#expecting-and-answering-requests
        app/testing/http-client.spec.ts(httpClient.get)
        https://angular.io/guide/http#custom-request-expectations
        https://angular.io/guide/http#handling-more-than-one-request
    https://angular.io/guide/http#testing-for-errors
