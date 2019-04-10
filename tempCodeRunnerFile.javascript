const a = new Buffer('test');
console.log(a);
const b = a.toString('base64');
console.log(b);
console.log(new Buffer(b));
