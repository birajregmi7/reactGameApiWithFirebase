// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Home from "../components/Home";
// import SignUp from "../components/SignUp";
// import Login from "../components/Login";
// import { AuthContext } from "../Context/AuthContext";
// import { Protected } from "./Protected";
// function NavBar() {
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: (
//         <Protected>
//           <Home />
//         </Protected>
//       ),
//     },
//     {
//       path: "/home",
//       element: (
//         <Protected>
//           <Home />
//         </Protected>
//       ),
//     },
//     {
//       path: "/login",
//       element: <Login></Login>,
//     },
//     {
//       path: "/signup",
//       element: <SignUp></SignUp>,
//     },
//   ]);

//   return (
//     // <Router>
//     //   <Routes>
//     //     <Route path="/" element={<Login />} />
//     //     <Route path="/login" element={<Login />} />
//     //     <Route path="/signup" element={<SignUp />} />
//     //     <Route
//     //       path="/home"
//     //       element={
//     //         <Protected>
//     //           <Home />
//     //         </Protected>
//     //       }
//     //     />
//     //   </Routes>
//     // </Router>
//     <>
//       <AuthContext>
//         <RouterProvider router={router}></RouterProvider>
//       </AuthContext>
//     </>
//   );
// }

// export default NavBar;
