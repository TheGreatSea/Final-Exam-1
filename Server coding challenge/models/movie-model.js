const mongoose = require( 'mongoose' );

const moviesSchema = mongoose.Schema({
    movie_ID : {
        type : Number,
        unique : true,
        required : true
    },
    movie_title : {
        type : String,
        required : true
    },
    year :  {
        type : Number,
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    actors : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'actors',
        required : true
    }]
});

const moviesCollection = mongoose.model( 'movies', moviesSchema );

const Movies = {
    createMovie : function( newMovie ){
        return moviesCollection
                .create( newMovie )
                .then( createdMovie => {
                    return createdMovie;
                })
                .catch( err => {
                    throw new Error( err );
                });
    },
    getMovieById : function (movie_ID){
        return moviesCollection
                .findOne( {movie_ID} )
                .populate('actors',['firstName','lastName'])
                .then( foundMovie => {
                    return foundMovie;
                })
                .catch( err => {
                    throw new Error( err );
                });
    },
    removeActorFromMovieList : function (id, movie_objt){
        return moviesCollection
                .updateOne({movie_ID : id },movie_objt)
                .then( updatedMovie => {
                    return updatedMovie;
                })
                .catch( err => {
                    throw new Error( err );
                });
    }
    /*
        Your code goes here
    */
}

module.exports = {
    Movies
};

