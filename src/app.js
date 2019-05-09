const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../teamplates/views');
const partialsPath= path.join(__dirname,'../teamplates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('',(req,res)=>{
    res.render('index',{
        title:'Hello nodejs',
        content:'Nội dung',
        name:'damnx'
    })
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'Hello About',
        content:'Nội dung about',
        name:'damnx'
    })
});



app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Hello About',
        content:'Nội dung help',
        name:'damnx',
        link:'/'
    })
});

app.get('/products',(req,res)=>{
    const query = req.query;
    if(!query && !query.search){
        res.send({
            status:1,
            messageError:'You must provide a search term',
            products:[]
        });
    }
    res.send({
        status:0,
        messageError:'',
        products:query
    });
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'error 404',
        errrorMessage:'Help article not found',
        name:'Damnx'
    })
});

app.get('*',(req,res)=>{
    res.render('404',{
        title:'error 404',
        errrorMessage:'404 page',
        name:'Damnx'
    })
})


app.listen(8000,()=>{
    console.log('server iss up on port 800');
});

