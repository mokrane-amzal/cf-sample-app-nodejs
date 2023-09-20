var express = require( 'express')
var log = require('cf-nodejs-logging-support');
var cf_app = require( './app/vcap_application')
var cf_svc = require( './app/vcap_services')

// Set the minimum logging level (Levels: off, error, warn, info, verbose, debug, silly)
log.setLoggingLevel("info");

log.setCustomFields({"app_color": cf_app.get_app_color()})

var app = express()

// Bind to express app
app.use(log.logNetwork);

app.set( 'views', __dirname + '/views')
app.set( 'view engine', 'jade')
app.use( express.static( __dirname + '/public'))

app.get( '/', function ( req, res) {
  res.render( 'pages/index', {
    app_environment:    app.settings.env,
    application_name:   cf_app.get_app_name(),
    app_uris:           cf_app.get_app_uris(),
    app_space_name:     cf_app.get_app_space(),
    app_color:          cf_app.get_app_color(),
    app_index:          cf_app.get_app_index(),
    app_mem_limits:     cf_app.get_app_mem_limits(),
    app_disk_limits:    cf_app.get_app_disk_limits(),
    service_label:      cf_svc.get_service_label(),
    service_name:       cf_svc.get_service_name(),
    service_plan:       cf_svc.get_service_plan()
  })
})

const port = process.env.PORT || 4000
app.listen(port)

// Formatted log message
log.info("Server is listening on port %d", port);
