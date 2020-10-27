const Promise = require('bluebird')

class Keypairs {
  constructor(store) {
    this.store = store
  }

  checkAsync(keypath, format) {
    if (!keypath) return null

    const { s3, options } = this.store
    const Bucket = options.S3.bucketName
    return s3.getObjectAsync({
      Bucket,
      Key: keypath
    }).then(body => {
      const content = body.Body.toString()
      return format === 'jwk'
        ? { privateKeyJwk: JSON.parse(content) }
        : { privateKeyPem: content }
    }).catch(error => {
      return null
    })
  }

  setAsync(keypath, keypair, format) {
    const key = format === 'jwk'
      ? JSON.stringify(keypair.privateKeyJwk, null, '  ')
      : keypair.privateKeyPem

    const { s3, options } = this.store
    const { ACL, bucketName: Bucket, ServerSideEncryption } = options.S3
    return s3.putObjectAsync({
      ACL,
      Bucket,
      ServerSideEncryption,
      Key: keypath,
      Body: key
    }).then(() => keypair)
  }
}

module.exports = Keypairs
