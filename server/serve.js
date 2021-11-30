// const http = require('http'),
//       fs = require('fs'),
//       express = require('express'),
//       bodyParser = require('body-parser'),
// React = require('react'),
//  ReactDOMServer = require('react-dom/server');
import http from 'http';
import fs from 'fs';
import bodyParser from 'body-parser';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App  from '../src/App';

const app = express();
app.use(express.static("./build"));

const server = http.Server(app);
const port = process.env.port || 4000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', function (req, res) {
    const app = ReactDOMServer.renderToString(<App />);
    fs.readFile('index.html', function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }
        res.writeHead(200);
        res.end(data.replace('<div id="root"></div>', `<div id="root">${app}</div>`));
    });
});

server.listen(port, function (_) {
    console.log('listening on *: ' + port);
});