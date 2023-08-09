const bcrypt = require('bcrypt');

/* const hashPassword = async (pw) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pw, salt);
    console.log(salt);
    console.log(hash);
}
 */

const hashPassword = async(pw) => {
    const hash = await bcrypt.hash(pw, 12);
    console.log(hash);
}

const login = async(pw, hashedPw) => {
const result = await bcrypt.compare(pw, hashedPw);
if(result){
    console.log('LOGGED YOU IN SUCCESSFULLY')
}else{
    console.log('INCORRECT');
}
}
/* hashPassword('monkey'); */
login('monkey', '$2b$12$0C78kKtEnuugCDGwNFPTou3Va1D9Yfxp4rw0Q09lz34WM9j0bLQj6');
