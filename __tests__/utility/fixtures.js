export const mockPostPreexisting = {
  url: 'https://api.bely.me/links',
  method: 'POST',
  body: {url: 'https://preexisting.com'},
  response: {
    url: 'https://preexisting.com',
    slug: 'rkZp',
    short_url: 'http://bely.me/rkZp',
  },
};

export const mockGet = {
  url: 'https://api.bely.me/links',
  method: 'GET',
  response: [
    {url: 'Rrrr', slug: '31RR', short_url: 'http://bely.me/31RR'},
    {url: 'Zxcvzxcv', slug: '5yn8', short_url: 'http://bely.me/5yn8'},
    mockPostPreexisting.response,
    {url: 'Vvvvv', slug: '68oR', short_url: 'http://bely.me/68oR'},
    {url: 'Asdva', slug: '8283', short_url: 'http://bely.me/8283'},
    {url: 'B', slug: 'opX', short_url: 'http://bely.me/opX'},
    {url: 'AvdasdvaVdasdva', slug: 'gJYk', short_url: 'http://bely.me/gJYk'},
    {url: 'K', slug: 'LMr', short_url: 'http://bely.me/LMr'},
    {url: 'V', slug: 'MOG', short_url: 'http://bely.me/MOG'},
    {url: 'Ac', slug: 'OVr', short_url: 'http://bely.me/OVr'},
    {url: 'Sdvsv', slug: 'VgX', short_url: 'http://bely.me/VgX'},
    {url: 'Nmm', slug: 'Xmg', short_url: 'http://bely.me/Xmg'},
    {url: 'Nnnnnnnn', slug: 'Zq5', short_url: 'http://bely.me/Zq5'},
    {url: 'Iiiiii', slug: '2zz', short_url: 'http://bely.me/2zz'},
    {url: 'Asdv', slug: '4xmx', short_url: 'http://bely.me/4xmx'},
    {url: 'Avsdavavdasv', slug: '7381', short_url: 'http://bely.me/7381'},
    {url: 'Asdf', slug: '9r6D', short_url: 'http://bely.me/9r6D'},
    {url: 'A', slug: 'nn7', short_url: 'http://bely.me/nn7'},
    {url: 'Vdasdva', slug: '0RqL', short_url: 'http://bely.me/0RqL'},
    {url: 'E', slug: 'ryp', short_url: 'http://bely.me/ryp'},
    {url: 'D', slug: 'wM8', short_url: 'http://bely.me/wM8'},
    {url: 'Asdfasfd ', slug: 'jRQv', short_url: 'http://bely.me/jRQv'},
    {url: 'Aa', slug: 'yQn', short_url: 'http://bely.me/yQn'},
    {url: 'Asdfasdfzcxvxcv', slug: 'kRQ6', short_url: 'http://bely.me/kRQ6'},
    {url: 'Asdvasdv', slug: 'lYQM', short_url: 'http://bely.me/lYQM'},
    {url: 'Asf', slug: 'mZRG', short_url: 'http://bely.me/mZRG'},
    {url: 'Asvdasdv', slug: 'n5Q7', short_url: 'http://bely.me/n5Q7'},
    {url: 'Addsavaava', slug: 'o2RX', short_url: 'http://bely.me/o2RX'},
    {url: 'F', slug: 'JGg', short_url: 'http://bely.me/JGg'},
    {url: 'https://Asdf.asdf', slug: 'pYwV', short_url: 'http://bely.me/pYwV'},
    {url: 'Xc', slug: 'NQv', short_url: 'http://bely.me/NQv'},
    {url: 'Xcvxcv', slug: 'PX4', short_url: 'http://bely.me/PX4'},
    {url: 'Xcvxcvxcv', slug: 'QZ9', short_url: 'http://bely.me/QZ9'},
    {url: 'Zx', slug: 'R2E', short_url: 'http://bely.me/R2E'},
    {url: 'Asvasdv', slug: 'Wkx', short_url: 'http://bely.me/Wkx'},
    {url: 'Cvc', slug: 'Yo2', short_url: 'http://bely.me/Yo2'},
  ],
};

export const mockPost = {
  url: 'https://api.bely.me/links',
  method: 'POST',
  body: {url: 'https://Testtest.com'},
  response: {
    url: 'https://Testtest.com',
    slug: 'qxRp',
    short_url: 'http://bely.me/qxRp',
  },
};

export const mockDelete = {
  url: 'begin:https://api.bely.me/links/',
  method: 'DELETE',
  body: {url: 'https://Testtest.com'},
  response: {
    type: 'default',
    status: 204,
    ok: true,
    statusText: '',
    headers: {
      map: {
        'x-runtime': '0.081628',
        nel: '{"report_to":"cf-nel","max_age":604800}',
        'x-request-id': '261f4078-ec1f-4577-8561-e53254fdb299',
        server: 'cloudflare',
        'alt-svc':
          'h3-27=":443"; ma=86400, h3-28=":443"; ma=86400, h3-29=":443"; ma=86400, h3=":443"; ma=86400',
        'cache-control': 'no-cache',
        via: '1.1 vegur',
        'cf-cache-status': 'DYNAMIC',
        date: 'Sat, 31 Jul 2021 21:13:22 GMT',
        'cf-ray': '6779d48c6cec1cde-EWR',
        'report-to':
          '{"endpoints":[{"url":"https:\\/\\/a.nel.cloudflare.com\\/report\\/v3?s=9zIl2yhlC8LRIdsHWi2ISPwEjWFoqXOPKoL5I6u2G7YemzfN8kckhepv%2BY3UdLCy78VG3oD5DBqRp43xbzMCyWUYX1a0t0MCpJs5PiEdqGnZ4U3Y%2F7niSZLs9hcwjg%3D%3D"}],"group":"cf-nel","max_age":604800}',
        'expect-ct':
          'max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"',
        vary: 'Origin',
        'content-type': 'text/plain',
      },
    },
    url: 'https://api.bely.me/links/qxRp',
    bodyUsed: false,
    _bodyInit: {
      _data: {
        size: 0,
        offset: 0,
        blobId: '8C991C4A-CB1E-4E76-8187-0E373381121B',
        type: 'text/plain',
        name: 'qxRp.txt',
        __collector: {},
      },
    },
    _bodyBlob: {
      _data: {
        size: 0,
        offset: 0,
        blobId: '8C991C4A-CB1E-4E76-8187-0E373381121B',
        type: 'text/plain',
        name: 'qxRp.txt',
        __collector: {},
      },
    },
  },
};

export default null;
