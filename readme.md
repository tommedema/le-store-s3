# le-store-s3-no-fs

Store [node-greenlock](https://git.daplie.com/Daplie/node-greenlock) certificates and account information in S3

## Using

```js
const S3 = {
  bucketName: 'letsencrypt'
}

const store = require('le-store-s3-no-fs').create({ S3 })
const challenge = require('le-challenge-s3').create({ S3 })

const instance = LE.create({
  store,
  challenges: { 'http-01': challenge },
  challengeType: 'http-01',
  agreeToTerms (opts, callback) {
    callback(null, opts.tosUrl)
  }
})
instance.register({
  domains: ['awesome.domain'],
  email: 'green@rabbit.candy',
  agreeTos: true,
  rsaKeySize: 2048,
  challengeType: 'http-01'
})
```

## Using with `ACL` and `ServerSideEncryption` params

```js
const S3 = {
  bucketName: 'letsencrypt',
  ACL: 'bucket-owner-full-control',
  ServerSideEncryption: 'AES256'
}

const store = require('le-store-s3-no-fs').create({ S3 })
```

## License

ISC
