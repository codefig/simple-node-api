const bcrypt = require('bcrypt');


async function makeSalt(){
    let salt = await bcrypt.genSalt(5)
    let hashed = await bcrypt.hash('1234', salt);
    console.log(hashed);
}

makeSalt();