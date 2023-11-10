import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import DashBoard from "./pages/DashBoard/Dashboard";
import Profile from "./pages/Profile/Profile";
import Header from "./components/Header/Header";
import CourseInfo from "./pages/CourseInfo/CourseInfo";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import StudentRoute from "./components/PrivateRoute/StudentRoute";

import AllCourses from "./pages/All-Courses/AllCourses";
import NotFound from "./pages/404NotFoud/NotFound";


const Routing = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user)
  useEffect(() => {
    if (!user) {
      history.push("/login");
    } else {
      dispatch({ type: "SET__USER", payload: user });
    }
  }, []);
  return (
    <Switch>
      <StudentRoute exact path="/">
        <DashBoard />
      </StudentRoute>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      <Route exact path="/all-courses">
        <AllCourses />
      </Route>
      <Route exact path="/course/:courseId">
        <CourseInfo />
      </Route>

      <Route  path="*">
        <NotFound />
      </Route>
    </Switch>
  );
};

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routing />
      </Router>
    </div>
  );
}

export default App;
