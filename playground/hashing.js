const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = '1234acb';

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash)
  })
})

let hassedPassword = '$2a$10$gxUKmYawvxTvb2i8U9aHTe0SmvZjqzDSQNhvqt5jwaaFU6JBiEZG.'

bcrypt.compare(password, hassedPassword, (err, res) => {
  console.log(res)
})

// let data = {
//   id: 10
// };

// let token = jwt.sign(data, '123abc')
// console.log(token)
// let decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded)
// let message = 'I am user number 3';
//
// let hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Message: ${hash}`)
//
// let data = {
//   id: 4
// };
//
//
// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };
//
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if (token.hash === resultHash) {
//   console.log('Data has not been changed.')
// } else if (token.hash !== resultHash) {
//   console.log('Data has been changed. Do not trust.')
// }
