'use strict';
import * as scrypt from 'scrypt';

// 用户名合法性
const validateId = str => {
  return /^[a-zA-Z0-9\-_\u4e00-\u9fa5]+$/i.test(str);
};

// 使用scrypt加密
const scryptEncryption = async pass =>
  scrypt.kdf(pass, { N: 1, r: 1, p: 1 }).then(
    result => result.toString('base64'),
    err => {
      console.log(err);
    },
  );

// 加密验证
const scryptVerify = async (pass, encryPass) =>
  scrypt.verifyKdf(new Buffer(encryPass, 'base64'), new Buffer(pass)).then(
    result => result,
    err => {
      console.log(err);
    },
  );

// scrypt hash for token
const scryptHash = async (key, salt) =>
  scrypt.hash(key, { N: 16, r: 1, p: 1 }, 64, salt).then(
    result => result.toString('hex'),
    err => {
      console.log(err);
    },
  );

export { validateId, scryptEncryption, scryptVerify, scryptHash };
