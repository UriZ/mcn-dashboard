let express = require('express');
let passport = require('passport');
let app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('pages/index')
});


let FacebookTokenStrategy = require('passport-facebook-token');

passport.use(new FacebookTokenStrategy({
        clientID: "1151370004993163",
        clientSecret: "50bb09be87258f04b79883ddb4655512"
    }, function(accessToken, refreshToken, profile, done) {
        return done(error, "ok");

    }
));


app.post('/auth/facebook/token',
    passport.authenticate('facebook-token'),
    function (req, res) {
        // do something with req.user
        res.send(req.user? 200 : 401);
    }
);


app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});