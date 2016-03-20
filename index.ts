import * as needle from 'needle'
const HttpProxyAgent = require('http-proxy-agent')
const HttpsProxyAgent = require('https-proxy-agent')

export class Hook {
  static needle = needle

  constructor(public options: HookOptions = {}, public logger?) {
    this.defaults(Object.assign({
      user_agent: 'curl 7.43.0 (x86_64-pc-linux-gnu) libcurl/7.43.0 GnuTLS/3.3.15 zlib/1.2.8 libidn/1.28 librtmp/2.3',
      timeout: 30000,
      follow: 10,
      http_code_throw: true
    }, this.options))
  }

  defaults(options?: HookOptions): HookOptions {
    return Object.assign(this.options, options)
  }

  request(method: string, url: string, data: any = null, options: HookOptions = {}): Promise<any> {
    options = this._updateOptions(options, url)
    return new Promise((resolve, reject) => {
      const log: any = { date: new Date(), method, url }
      const rejected = (error) => {
        log.error = error
        log.type = 'error'
        if (this.logger) this.logger(log)
        reject(error)
      }
      const resolved = (response) => {
        log.statusCode = response.statusCode
        log.type = 'info'
        if (this.logger) this.logger(log)
        resolve(response)
      }
      needle.request(method, url, data, options, (error: any, response) => {
        if (error) {
          return rejected(error)
        }
        if (response.statusCode != 200 && options.http_code_throw) {
          error = new Error(response.statusCode + ' ' + response.statusMessage)
          error.response = response
          return rejected(error)
        }
        resolved(response)
      })
    })
  }

  stream(method: string, url: string, data?: any, options?: HookOptions, callback?: Needle.Callback): Needle.ReadableStream {
    options = this._updateOptions(options, url)
    return needle.request(method, url, data, options, callback)
  }

  head(url: string, options?: HookOptions) {
    return this.request('head', url, null, options)
  }
  get(url: string, data?: any, options?: HookOptions) {
    if (!options) {
      options = data; data = null
    }
    return this.request('get', url, data, options)
  }
  post(url: string, data: any, options?: HookOptions) {
    return this.request('post', url, data, options)
  }
  put(url: string, data: any, options?: HookOptions) {
    return this.request('put', url, data, options)
  }
  patch(url: string, data: any, options?: HookOptions) {
    return this.request('patch', url, data, options)
  }
  delete(url: string, data: any, options?: HookOptions) {
    return this.request('delete', url, data, options)
  }

  private _updateOptions(options: HookOptions, url: string) {
    options = Object.assign({}, this.options, options)
    if (options.proxy_agent) {
      if (/^https:\/\//.test(url)) options.agent = new HttpsProxyAgent(options.proxy_agent)
      else options.agent = new HttpProxyAgent(options.proxy_agent)
    }
    return options
  }
}

export default Hook

export interface RequestOptions {
  timeout?: number;
  read_timeout?: number;
  open_timeout?: number;
  follow?: number;
  follow_max?: number;
  follow_set_cookies?: boolean;
  follow_set_referer?: boolean;
  follow_keep_method?: boolean;
  follow_if_same_host?: boolean;
  follow_if_same_protocol?: boolean;
  multipart?: boolean;
  proxy?: string;
  agent?: string;
  proxy_agent?: string;
  headers?: HttpHeaderOptions;
  auth?: string; // auto | digest | basic (default)
  json?: boolean;

  // These properties are overwritten by those in the 'headers' field
  compressed?: boolean;
  cookies?: { [name: string]: any; };
  // Overwritten if present in the URI
  username?: string;
  password?: string;

  http_code_throw?: boolean;
}

export interface ResponseOptions {
  decode?: boolean;
  decode_response?: boolean;
  parse?: boolean;
  parse_response?: boolean;
  parse_cookies?: boolean;
  output?: any;
}

export interface HttpHeaderOptions {
  cookies?: { [name: string]: any; };
  compressed?: boolean;
  accept?: string;
  connection?: string;
  user_agent?: string;

  // Overwritten if present in the URI
  username?: string;
  password?: string;
}

export interface TLSOptions {
  pfx?: any;
  key?: any;
  passphrase?: string;
  cert?: any;
  ca?: any;
  ciphers?: any;
  rejectUnauthorized?: boolean;
  secureProtocol?: any;
}

export interface HookOptions extends RequestOptions, ResponseOptions, HttpHeaderOptions, TLSOptions {
}
