var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users");

const verifyUser = (user, pass) => {
  const userPromise = new Promise((resolve, reject) => {
  User.findOne({username: user, password: pass})
  .then(dbProduct => {
    if (dbProduct === null)
      reject(0)
    if (dbProduct !== null)
      resolve(1);
  })})

  const onResolved = (resolvedValue) => console.log(resolvedValue);
  const onRejected = (error) => console.log(error);

  try {
    return userPromise.then(onResolved, onRejected) 
  }
  finally {
    console.log('ree')
  }
     
  // passport.authenticate("local", {
  //   successRedirect: "/succ",
  //   failureRedirect: "/fail",
  //   failureFlash: true,
  // });
};

// passport.use(
//   new LocalStrategy((u, p, done) => {
//     User.findOne({ username: u }, (err, u) => {
//       if (err) {
//         return done(err, console.log("rip error"));
//       }
//       if (!u) {
//         return done(null, false, console.log("incorrect username"));
//       }
//       if (!u.verifyPassword(p)) {
//         return done(
//           null,
//           false,
//           console.log("incorrect password, correct username")
//         );
//       }
//       return done(null, user, console.log("success"));
//     });
//   })
// );

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
