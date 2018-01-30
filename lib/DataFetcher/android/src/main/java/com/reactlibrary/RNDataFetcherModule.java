
package com.reactlibrary;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableNativeMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.reactlibrary.pojos.LocationPojo;
import com.reactlibrary.pojos.ResponsePojo;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;

import org.json.JSONException;

import java.io.IOException;

public class RNDataFetcherModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private final OkHttpClient client;

    public RNDataFetcherModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.client = new OkHttpClient();
    }

    private static ReadableMap mapToMap(ResponsePojo responsePojo) {
        WritableMap mainResult = new WritableNativeMap();
        WritableArray locationsArray  = new WritableNativeArray();
        WritableMap locationMap;
        for (LocationPojo location : responsePojo.locations) {
            locationMap = new WritableNativeMap();
            locationMap.putString("name", location.name);
            locationMap.putDouble("lat", location.lat);
            locationMap.putDouble("lng", location.lng);
            locationsArray.pushMap(locationMap);
        }
        mainResult.putArray("locations", locationsArray);

        mainResult.putString("updated", responsePojo.updated);

        return mainResult;
    }

    @Override
    public String getName() {
        return "RNDataFetcher";
    }

    @ReactMethod
    public void fetch(String url, Promise promise) {
        Request request = new Request.Builder().url(url).build();
        try {
            Response response = client.newCall(request).execute();

            ResponsePojo result = new Gson().fromJson(response.body().string(), ResponsePojo.class);

            promise.resolve(mapToMap(result));
        } catch (IOException e) {
            promise.reject("data_fetching", "Can't fetch data", e);
        } catch (JsonSyntaxException e) {
            promise.reject("data_fetching", "Wrong data format", e);
        }
    }
}