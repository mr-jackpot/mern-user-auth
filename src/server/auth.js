var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

const verifyUser = (u, p) => {
  passport.use(
    new LocalStrategy((u, p, done) => {
      User.findOne({ username: u }, (err, u) => {
        if (err) {
          return done(err);
        }
        if (!u) {
          return done(null, false);
        }
        if (!u.verifyPassword(p)) {
          return done(null, false);
        }
        return done(null, user);
      });
    })
  );
  return console.log(req);
};

module.exports = { verifyUser };

// // passport.serializeUser(function(user, done) { //In serialize user you decide what to store in the session. Here I'm storing the user id only.
// //   done(null, user.id);
// // });

// // passport.deserializeUser(function(id, done) { //Here you retrieve all the info of the user from the session storage using the user id stored in the session earlier using serialize user.
// //   db.findById(id, function(err, user) {
// //     done(err, user);
// //     });
// // });

// // passport.use(new LocalStrategy(function(username, password, done) {
// //     db.findOne({'username':username},function(err,student){
// //         if(err)return done(err,{message:message});//wrong roll_number or password;
// //         var pass_retrieved = student.pass_word;
// //         bcrypt.compare(password, pass_retrieved, function(err3, correct) {
// //           if(err3){
// //             message = [{"msg": "Incorrect Password!"}];
// //             return done(null,false,{message:message});  // wrong password
// //           }
// //           if(correct){
// //               return done(null,student);
// //           }
// //         });
// //     });
// // }));

// // app.use(session({ secret: 'super secret' })); //to make passport remember the user on other pages too.(Read about session store. I used express-sessions.)
// app.use(passport.initialize());
// app.use(passport.session());

// app.post('/',passport.authenticate('local',{successRedirect:'/users' failureRedirect: '/'}),
//     function(req,res,next){
// });
