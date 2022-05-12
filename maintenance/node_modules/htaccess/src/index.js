#!/usr/bin/env node
const fs = require("fs");

{
  const htaccess = fs.createWriteStream(".htaccess");
  htaccess.on("error", function (err) {
    console.error(err.message);
  });
  const content =
    '<IfModule mod_rewrite.c>\n  RewriteEngine On\n  RewriteBase /\n  RewriteRule ^index.html$ - [L]\n  RewriteCond %{REQUEST_FILENAME} !-f\n  RewriteCond %{REQUEST_FILENAME} !-d\n  RewriteRule . /index.html [L]\n  RewriteCond %{HTTPS} !=on\n  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301,NE]\n  Header always set Content-Security-Policy "upgrade-insecure-requests;"\n</IfModule>';
  htaccess.write(content);
  htaccess.end();

  console.log(".htaccess successfully created");
}
