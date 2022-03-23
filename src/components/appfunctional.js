// import React, { useState, useEffect } from 'react';
// import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
// import Header from './Header';
// import Diary from './Diary';
// import Tips from './Tips';
// import Register from './Register';
// import Login from './Login';
// import NavBar from './NavBar';
// import ProtectedRoute from './ProtectedRoute';
// import * as auth from '../auth.js';
// import * as calData from '../data';
// import './styles/App.css';

// const App = () => {

//   const [loggedIn, setLoggedIn] = useState(false);


//   const history = useHistory();

//   const handleTokenCheck = () => {
//     if (localStorage.getItem('jwt')) {
//       const jwt = localStorage.getItem('jwt');
//       // we're checking the user's token
//       auth.checkToken(jwt).then((res) => {
//         let calGoal = 0;
//         // we're finding the selected user's total calories
//         // from the list of possible goals
//         calData.calData.forEach((goal) => {
//           if (goal.id === res.en_cal_goal) {
//             // the selected user's goal
//             calGoal = goal.calGoal;
//           }
//         })
//         if (res) {
//           // if a goal is found, add it to the state
//           this.setState({
//             loggedIn: true,
//             calGoal
//           }, () => {
//             history.push("/diary");
//           });
//         }
//       });
//     }
//   }

//   const handleLogin = (calGoal) => {
//     this.setState({
//       loggedIn: true,
//       calGoal
//     })
//   }

//   const handleLogout = () => {
//     setLoggedIn(false);
//   }

//   useEffect(() => {
//     handleTokenCheck();
//   }, [])

//   return (
//     <>
//       <Header />
//       <main className="content">
//         {loggedIn && <NavBar handleLogout={handleLogout} />}
//         <Switch>
//           <ProtectedRoute path="/diary" calGoal={calGoal} loggedIn={loggedIn} component={Diary} />
//           <ProtectedRoute path="/tips" loggedIn={loggedIn} component={Tips} />
//           <Route path="/register">
//             <Register />
//           </Route>
//           <Route path="/login">
//             <Login handleLogin={handleLogin} />
//           </Route>
//           <Route exact path="/">
//             {loggedIn ? <Redirect to="/diary" /> : <Redirect to="/login" />}
//           </Route>
//         </Switch>
//       </main>
//     </>
//   );
// }

// export default App;