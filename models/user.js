var pool = require('./connection');

// requisição dz bibliotecxa de incripitação.
var bcrypt = require('bcrypt');

// 
var salt = 10;

module.exports.getAllUsers = async function(){

    // faz tudo que ta dentro do try e se n conseguir vai armazenar o erro dentro da variavel erro
    try {
        
        let sql = 'select * from utilizador';

        //
        let result = await pool.query(sql);

        let users = result;

        return {

            status : 200, result : users
        };

    } catch (error) {
        
        console.log(error);

        return {

            status: 500, result: error
        };
    }
}

module.exports.newUser = async function(user){

    //
    let password = bcrypt.hashSync(user.password,salt);
    try {
        
        let sql = '';
        let values = [];

        if(user.type == 1){

            sql = 'with ins1 as (insert into utilizador (nome, apelido, genero, birthday, email, telefone, password) values ($1, $2, $3, $4, $5,$6, $7)returning user_id), ins2 as (insert into explicador(fk_utilizador_id, fk_rank_id, type) select user_id, $8, $9 from ins1 returning explicador_id) insert into morada(endereço, cidade, codigo_postal, fk_pais_id, fk_user_id) select $10,$11,$12,1,user_id from ins1'

            values = [user.nome,user.apelido,user.genero,user.data,user.email,user.telefone,password,1,user.type, user.endereço, user.cidade, user.codigo_postal,]

        } else if(user.type == 2){

            sql = 'with upd as (insert into utilizador (nome, apelido, genero, birthday, email, telefone, password) values ($1, $2, $3, $4, $5,$6, $7)returning user_id)insert into aluno(fk_utilizador_id, type) select user_id, $8 from upd'

            values = [user.nome,user.apelido,user.genero,user.data,user.email,user.telefone,password,user.type,]
        }


        let result = await pool.query(sql,values);

        return {

            status : 200, result : result
        };

    } catch (error) {

        console.log(error);

        return {

            status: 500, result: error
        };
    }
}

module.exports.loginUser = async function (user) {

    try {

      let sql = 'Select * from utilizador where email = $1';

      let result = await pool.query(sql, [user.email]);

      let passwordb = result.rows[0].password;

      let valor = bcrypt.compareSync(user.password, passwordb);

      if (result.rows.length > 0 && valor)
        return { status: 200, result: result.rows[0] };
      else return { status: 401, result: { msg: "Wrong email or password" } };
      
    } catch (error) {
      console.log(error);
      return { status: 500, result: { msg: "Wrong username or password" } };
    }

};


