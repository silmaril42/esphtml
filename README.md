# ESP-HTML

This is a small JavaScript library to provide a simple way to include sensor values from [ESPEasy](https://github.com/letscontrolit/ESPEasy) devices in an HTML page. \
It is intended to be used for html pages inside your LAN - you should not use it for public web sites!

## Usage

Please see example.html for syntax examples.

Key steps:
* Include `jquery.js` and `esphtml.js` in your HTML page.
* Include another small script to define the list auf EasyESP devices you want to read from.
** Set `ESP_Refresh_Interval_s` here if you want your data to be updated periodically.
* Write your HTML page in any way you like.
* Be sure to call the script on load: `<body onload="ESP_getAllJSON()">`
* To include a value from your ESP simply add a `<span>` tag with `class="ESPvalue"` and some more attributes
that configure exactly what to display here.

That's it!


## Improvements

I am sure this simple library has plenty of room left to improve it.

If you wish to do so, please go ahaead! Fork the repo or submit merge requests. \
You may even try opening an issue - but be warned: I don't intend to support this project very much,
but it might still be worth a try to share ideas this way - you never know who listens ;-)

## License

This software is in the public domain - see LICENSE file or http://unlicense.org/ for details.
