// const http = require('http'),
//       fs = require('fs'),
//       express = require('express'),
//       bodyParser = require('body-parser'),
// React = require('react'),
//  ReactDOMServer = require('react-dom/server');
import http from 'http';
import fs from 'fs';
import compressible from 'compressible';
import compression from 'compression';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../src/App';

const app = express();

// compress responses
app.use(compression({ threshold: 0, filter: shouldCompress }));
app.use(express.static("./build"));

const shouldCompress = (req, res) => {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        console.log('no compression');
        return false
    }

    console.log('with compression');
    // fallback to standard filter function
    return compression.filter(req, res)
}

const server = http.Server(app);
const port = process.env.port || 4000;

app.get('/', function (req, res) {
    fs.readFile('index.html', function (err, data) {
        const root = ReactDOMServer.renderToString(<App />);

        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }

        // Following console log statements don't work currently.
        // 
        console.log('text/html: ', compressible('text/html'));
        console.log('text/css: ', compressible('text/css'));
        console.log('application/javascript: ', compressible('application/javascript'));
        
        res.setHeader('Cache-Control', 'no-cache, no-store');

        res.writeHead(200, { 'content-encoding': 'gzip' });
        res.end(data.replace('<div id="root"></div>', `<div id="root">${root}</div>`));
    });
});

server.listen(port, function (_) {
    console.log('listening on *: ' + port);
});
