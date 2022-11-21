import express from 'express';
 
const app: express.Application = express();
const port = 8080;

const server=app.listen(port, () => {
    console.log(`TypeScript with Express
         http://localhost:${port}/`);
});

//parse json using express
app.use(express.json())
app.use(express.urlencoded({extended: false}))

export let movies=[
    {
        id: 1,
        name: 'ready player 1'
    },
    {
        id:2,
        name:'moana'
    },
    {
        id:3,
        name:'venom'
    }
]

//get list of all movies
app.get('/movies',(req,res)=>{
    res.json(movies)
})
 
app.get('/', (req, res) => {
    res.send("TypeScript With Express");
});


//add new movie details to the list
app.post('/movies',(req,res)=>{
    const movie=req.body
    console.log(movie)
    movies.push(movie)
    res.send("New movie is added to the list")
})

//get list of movies by id
app.get('/movies/:id',(req,res)=>{
    const id: number=parseInt(req.params.id)
    console.log('hi')
    console.log(id)
    let flag=false
    for(let movie of movies){
        console.log(movie.id)
        if (movie.id==id){
            flag=true
            res.json(movie)
            return
        }
    }
    if(flag==false)
        res.status(404).send('Movie not found')
})

//deleting app by id
app.delete('/movies/:id',(req,res)=>{
    const id:number=parseInt(req.params.id)
    movies=movies.filter((movie)=>{
        if(movie.id!=id){
            return true
        }
        else{
            return false
        }
    })
    res.send('Movie successfully deleted')
})
 


module.exports=app;