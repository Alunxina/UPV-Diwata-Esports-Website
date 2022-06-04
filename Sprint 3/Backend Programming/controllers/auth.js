const { DEC8_BIN } = require("mysql/lib/protocol/constants/charsets");
const mysql = require("mysql");

const webdb = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});
exports.register = (req,res) => {
    console.log(req.body);

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;

    webdb.query('SELECT email FROM users WHERE email =?', [email], (error, results) =>{
        if (error){
            console.log(error);
        }

        if(results.length > 0){
            return res.render('error',{
            })
        }else if(password !== passwordConfirm){
            return res.render('error',{
            });
        }
    });

    webdb.query('INSERT INTO users SET ?', {name: name, email:email, password:password}, (error, results) => {
        if(error){
            console.log(error);
        }else{
            console.log(results);
            return res.render('finish',{
                message: 'Succesfully created an account!'
            });
        }
    })

}