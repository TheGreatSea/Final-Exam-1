const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const {Movies} = require('./models/movie-model');
const errorHandler = require('./middleware/errorHandler');
const {Actors} = require('./models/actor-model');
const app = express();

app.patch('/api/delete-movie-actor/:movie_ID',jsonParser, (req,res)=>{
    let {id, firstName, lastName} = req.body;
    if (!id){
        req.statusCode = 406;
        app.use(errorHandler);
        /*Error code 406 middleware- Id is missing in the body pf the request*/     
    }
    let movie_ID = req.params.movie_ID;
    if( id != movie_ID){
        req.statusCode = 409;
        app.use(errorHandler);
        /*Error code 409 middleware- id and movie_ID do not match*/
    }
    if(!firstName || !lastName){
        req.statusCode = 403;
        app.use(errorHandler);
        /*Error code 403 middleware - You need to send both firstName and lastName of the actor to remove from the movie list */
    }
    Movies
        .getMovieById(movie_ID)
        .then( response => {
            let exist = false;
            let index = -1;
            for(let i=0; i < response.actors.length ; i++){
                if (response.actors.firstName == firstName && response.actors.lastName == lastName){
                    exist = true;
                    index = i;
                }
            }
            if (exist == false){
                /* Middleware for 404 */
                req.statusCode = 404;
                app.use(errorHandler);
            }
            else{
                let new_actors = response.actors.splice(index,1);
                let newMovie = {
                    movie_ID : response.movie_ID,
                    movie_title : response.movie_title,
                    year : response.year,
                    rating : response.rating,
                    actors : new_actors,
                };
                Movies
                    .removeActorFromMovieList(movie_ID, newMovie)
                    .then( response =>{
                        return res.status(201).json(response);
                    })
                    .catch( err =>{
                        req.statusCode = 404;
                        app.use(errorHandler);
                        /* Middleware */
                    });
            }
        })
        .catch( err => {
            req.statusCode = 404;
            app.use(errorHandler);
            /* Middleware for 404. Move or Actor does not exist */
        })

});

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});