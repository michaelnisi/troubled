{
  "title": "Module Map",
  "description": "Accessing C libraries from Swift.",
  "template": "article.jade",
  "date": "2016-03-05",
  "path": "2016/03"
}

Recently, working on an iOS project in Swift, I needed to hash some data to identify certain things in the database. A good algorithm to create unified keys like these is MD5.

A bash script to generate a module map file to use CommonCrypto in a Swift framework:

    #!/usr/bin/env bash

    set -o xtrace

    if [ -n "$SDKROOT" ]; then
      SDK=$SDKROOT
    else
      if [ -n "$1" ]; then
        SDK=$1
      else
        L=`xcodebuild -showBuildSettings | grep SDKROOT`
        ARR=($L)
        SDK=${ARR[2]}
      fi
    fi

    COMMON_CRYPTO="/usr/include/CommonCrypto/CommonCrypto.h"

    sed \
      -e "s;%COMMON_CRYPTO%;$SDK$COMMON_CRYPTO;g" \
      module/module.modulemap.in > module/module.modulemap

    exit 0

Generate MD5 hash in Swift:

    import Foundation
    import CommonCrypto

    func md5Digest(str: String) -> String {
      var digest = [UInt8](count: Int(CC_MD5_DIGEST_LENGTH), repeatedValue: 0)
      if let data = str.dataUsingEncoding(NSUTF8StringEncoding) {
        CC_MD5(data.bytes, CC_LONG(data.length), &digest)
      }
      var digestHex = ""
      for index in 0..<Int(CC_MD5_DIGEST_LENGTH) {
        digestHex += String(format: "%02x", digest[index])
      }
      return digestHex
    }
