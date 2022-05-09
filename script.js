require([
      "esri/config",
      "esri/Map",
      "esri/layers/FeatureLayer",
      "esri/views/MapView",
      "esri/widgets/Legend",
      "dojo/domReady!"
    ], function(esriConfig, Map, FeatureLayer, MapView, Legend) {
  
    esriConfig.apiKey = "AAPK46f57464803c4f51ad1e192af78e31f82ceOIxvtHx2AdmAvfFMB5rMhnid1IlMzs_i3su5KhQVNLfG1_P84UEJ3h1YtpCu6";

    var map = new Map({
        basemap: "arcgis-terrain"
    });
    
    var view = new MapView({
        container: "viewDiv",
        map: map,
        center:[-101, 41],
        zoom: 4
    });

    var template = { // autocasts as new PopupTemplate()
        title: "City: {cbsatitle}",
        content: [{
            type: "fields",
            fieldInfos: [{
                fieldName: "posts_jan2 ",
                label: "Job Postings (January 2020): ",
                visible: true
            }]
         }]
    };
  
    const defaultSym = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        color: "red"
    };
 
    const renderer = {
      type: "simple", // autocasts as new SimpleRenderer()
      symbol: defaultSym,
      visualVariables: [
        {
          type: "size",
          field: "posts_jan2",
          // normalizationField: "TOTPOP_CY",
          legendOptions: {
            title: "Count"
          },
          stops: [
            {
              value: 5000,
              size: 5,
              label: "<5,000"
            },
            {
              value: 50000,
              size: 15,
              label: "<50,000"
            },
            {
              value: 100000,
              size: 25,
              label: "<100,000"
            },
            {
              value: 500000,
              size: 40,
              label: "<500,000"
            }
          ]
        }
      ]
    };
  
    var featureLayer = new FeatureLayer({
        url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/adecce/FeatureServer",
        outFields: ["*"],
       title: "Job Postings in January 2020",
        popupTemplate: template,
        renderer:renderer
    });
  
    map.add(featureLayer);
  
    view.ui.add(
        new Legend({
        view: view
        }),
        "top-right"
    );

});
