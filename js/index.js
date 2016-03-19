"use strict";
const needle = require('needle');
const HttpProxyAgent = require('http-proxy-agent');
const HttpsProxyAgent = require('https-proxy-agent');
class Hook {
    constructor(options = {}) {
        this.options = options;
        this.defaults(Object.assign({
            user_agent: 'curl 7.43.0 (x86_64-pc-linux-gnu) libcurl/7.43.0 GnuTLS/3.3.15 zlib/1.2.8 libidn/1.28 librtmp/2.3',
            timeout: 30000,
            follow: 10,
            http_code_throw: true
        }, this.options));
    }
    defaults(options) {
        return Object.assign(this.options, options);
    }
    request(method, url, data = null, options = {}) {
        options = this._updateOptions(options, url);
        return new Promise((resolve, reject) => {
            needle.request(method, url, data, options, (error, response) => {
                if (error)
                    throw error;
                if (response.statusCode != 200 && options.http_code_throw) {
                    error = new Error(response.statusCode + ' ' + response.statusMessage);
                    error.response = response;
                    throw error;
                }
                resolve(response);
            });
        });
    }
    stream(method, url, data, options, callback) {
        options = this._updateOptions(options, url);
        return needle.request(method, url, data, options, callback);
    }
    head(url, options) {
        return this.request('head', url, null, options);
    }
    get(url, data, options) {
        if (!options) {
            options = data;
            data = null;
        }
        return this.request('get', url, data, options);
    }
    post(url, data, options) {
        return this.request('post', url, data, options);
    }
    put(url, data, options) {
        return this.request('put', url, data, options);
    }
    patch(url, data, options) {
        return this.request('patch', url, data, options);
    }
    delete(url, data, options) {
        return this.request('delete', url, data, options);
    }
    _updateOptions(options, url) {
        options = Object.assign({}, this.options, options);
        if (options.proxy_agent) {
            if (/^https:\/\//.test(url))
                options.agent = new HttpsProxyAgent(options.proxy_agent);
            else
                options.agent = new HttpProxyAgent(options.proxy_agent);
        }
        return options;
    }
}
Hook.needle = needle;
exports.Hook = Hook;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Hook;