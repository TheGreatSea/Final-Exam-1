function errorHandler(req, res) {
    console.log("I am using the middleware.")
    statusCode = req.statusCode;
    switch (statusCode) {
        case 404:
            res.statusMessage = "Movie or Actor does not exist";
            return res.status(404).end();
        case 406:
            res.statusMessage = "Id is missing in the body pf the request";
            return res.status(406).end();
        case 409:
            res.statusMessage = "ID and movie_ID do not match";
            return res.status(409).end();
        case 403:
            res.statusMessage = "You need to send both firstName and lastName of the actor to remove from the movie list";
            return res.status(403).end();
        default:
            res.statusMessage = "Unkown error";
            return res.status(400).end();
    }
}

module.exports = errorHandler;