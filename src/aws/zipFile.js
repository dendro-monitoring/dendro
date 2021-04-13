const fs = require('fs')
var AdmZip = require('adm-zip');

var zip = new AdmZip();

zip.addLocalFile(process.argv[2]);

zip.writeZip(process.argv[2] + '.zip')