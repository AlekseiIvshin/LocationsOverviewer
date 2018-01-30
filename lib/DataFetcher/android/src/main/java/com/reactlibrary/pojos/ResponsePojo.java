package com.reactlibrary.pojos;

import java.util.List;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class ResponsePojo {

    @SerializedName("locations")
    @Expose
    public List<LocationPojo> locations = null;
    @SerializedName("updated")
    @Expose
    public String updated;

}