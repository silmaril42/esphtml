var NumJSONFetched = 0;
var ESP_Refresh_Interval_s = -1;

function ESP_getAllJSON() {
  NumJSONFetched = 0;
  for (var i=0; i < ESP_JSONData.length; i++) {
    /* Closure: First we call our own function with parameter i.
       This remembers this value inside it's own variable in it's own context
       an then returns the callback function we really want to call. */
    $.get(ESP_JSONData[i].URL, ESP_InsertJSONData(i));
  }
};

function ESP_InsertJSONData(i) {
  var myi = i;    // remember i in this function's context
  // return the real callback function:
  return function(data) {
    ESP_JSONData[myi].JSON = data;
    NumJSONFetched++;
    if (NumJSONFetched >= ESP_JSONData.length) {
      // When the last data has arrived, call the function to use it.
      ESP_UpdateEspValues();
    }
  }
};

function ESP_UpdateEspValues() {
  var ValueElements = document.getElementsByClassName("ESPvalue");
  for (var i = 0; i < ValueElements.length; i++) {
    ESP_UpdateEspValue(ValueElements[i]);
  }

  /* After finishing everything, set a timer for the next refresh.
     This is no accurate way of timing things, but it makes sure that we don't
     start another run before the previous one is finished.  */
  if (ESP_Refresh_Interval_s >= 0) {
    setTimeout(ESP_getAllJSON, ESP_Refresh_Interval_s * 1000);
  }
};

function ESP_UpdateEspValue(ValID) {
  var ValueText = '';
  var ESPID     = $(ValID).attr('ESP');
  var SensIndex = $(ValID).attr('Sensor');
  var ValIndex  = $(ValID).attr('Value');
  var ValUnit   = $(ValID).attr('unit');
  var JSON = ESP_GetESP_JSONData(ESPID);
  if (JSON) {
    ValueText = JSON.Sensors[SensIndex].TaskValues[ValIndex].Value;
    if (ValUnit != '') {
      ValueText = ValueText + ' ' + ValUnit;
    }
  } else {
    ValueText = 'ERR';
  }
  $(ValID).html(ValueText);
};

function ESP_GetESP_JSONData(ESPID) {
  for (var i=0; i < ESP_JSONData.length; i++) {
    if (ESP_JSONData[i].Name === ESPID) {
      return ESP_JSONData[i].JSON;
    }
  }
  return null;
};
