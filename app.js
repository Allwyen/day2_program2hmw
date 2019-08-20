const Express = require("express");
const Mongoose = require('mongoose');

var request = require('request');
var bodyParser = require('body-parser');

//Now creating a object for class Express called app

var app = new Express();

//Adding a middleware.EJS template engine

app.set('view engine','ejs'); 

app.use(Express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

Mongoose.connect("mongodb+srv://mongodb:mongodb@mycluster-ucvz5.mongodb.net/librarydb?retryWrites=true&w=majority");

const BookModel= Mongoose.model("book",{
    btitle:String,
    bauthor:String,
    bpublisher:String,
    bdop:String,
    bdistributer:String,
    bprice:String,
    bdesc:String
});

app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/addbook',(req,res)=>{
    res.render('addbook');
});

books=[{
    'title':'Buried thoughts',
    'author':'Joseph Annamkutty Jose',
    'publisher':'DC Books',
    'DoP':'02-08-2016',
    'distributer':'DC',
    'price':230,
    'desc':'A first thought from Joseph'
},{
    'title':'Deivathinde Charanmar',
    'author':'Joseph Annamkutty Jose',
    'publisher':'DC Books',
    'DoP':'26-05-2019',
    'distributer':'DC',
    'price':190,
    'desc':'A second thought from Joseph'
},{
    'title':'Harry Potter',
    'author':'JK Rowling',
    'publisher':'HP Books',
    'DoP':'15-10-1998',
    'distributer':'HP',
    'price':550,
    'desc':'First book from JK Rowling'
},{
    'title':'Wings Of Fire',
    'author':'APJ Abdul Kalam',
    'publisher':'DC Books',
    'DoP':'26-05-2010',
    'distributer':'DC',
    'price':150,
    'desc':'Initial days of my life by APJ'
},{
    'title':'The Subtle Art Of Not Giving a F**k',
    'author':'Mark Manson',
    'publisher':'DC Books',
    'DoP':'13-02-2011',
    'distributer':'DC',
    'price':320,
    'desc':'Balancing life'
},{
    'title':'Rich Dad Poor Dad',
    'author':'Rober TK',
    'publisher':'DC Books',
    'DoP':'26-05-2019',
    'distributer':'DC',
    'price':290,
    'desc':'A financial knowledge'
},{
    'title':'Balyakalasaghi',
    'author':'Vaikkom M Bhasheer',
    'publisher':'DC Books',
    'DoP':'26-05-2019',
    'distributer':'DC',
    'price':230,
    'desc':'A good thought'
},{
    'title':'Buried thoughts',
    'author':'Joseph Annamkutty Jose',
    'publisher':'DC Books',
    'DoP':'26-05-2019',
    'distributer':'DC',
    'price':230,
    'desc':'A second thought from Joseph'
},{
    'title':'Buried thoughts',
    'author':'Joseph Annamkutty Jose',
    'publisher':'DC Books',
    'DoP':'26-05-2019',
    'distributer':'DC',
    'price':230,
    'desc':'A second thought from Joseph'
},{
    'title':'Buried thoughts',
    'author':'Joseph Annamkutty Jose',
    'publisher':'DC Books',
    'DoP':'26-05-2019',
    'distributer':'DC',
    'price':230,
    'desc':'A second thought from Joseph'
}];



// app.get('/viewbook',(req,res)=>{
//     res.render('viewbook',books);
// });

// app.post('/read',(req,res)=>{
//     var items=req.body;
//     res.render('read',{item:items});
    
// });

app.post('/bookregister',(req,res)=>{
    //var items=req.body;
    //res.render('read',{item:items});

    var book = new BookModel(req.body);
    var result = book.save((error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send("<script>alert('Book Successfully Inserted')</script><script>window.location.href='/addbook'</script>");
        }
    });

});

app.get('/bookall',(req,res)=>{

    var result = BookModel.find((error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    });
});

const APIurl = "http://localhost:3456/bookall";

app.get('/viewbook',(req,res)=>{

    request(APIurl,(error,response,body)=>{
        var data = JSON.parse(body);
        res.render('viewbook',{data:data});
    });
});

app.listen(process.env.PORT || 3456,()=>{
    console.log("Server running on port::3456...");
});