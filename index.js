const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');

app.get('/',(req,res)=>{
    res.json({
        mensaje:'ingresaste a mi api'
    })
})

app.post('/acceso',validarToken,(req,res)=>{
    jwt.verify(req.token,'secretkey',(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                mensaje:'accediste a un lugar restringido',
                authData
            })
        }
    })
})

app.post('/login',(req,res) =>{
    const user = {
        id : 1,
        usuario: "cmayta",
        email : "cesarmayta@gmail.com"
    }

    jwt.sign({user},'secretkey',{expiresIn: '30s'},(err,token)=> {
        res.json({
            token
        })
    })
})

function validarToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    }else{
        res.sendStatus(403);
    }
}
app.listen(5000,()=> console.log(`servidor http://localhost:5000`))