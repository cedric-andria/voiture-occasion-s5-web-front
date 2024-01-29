/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// import Index from "views/Index.js";
// import Profile from "views/examples/Profile.js";
// import Maps from "views/examples/Maps.js";
// import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
// import Tables from "views/examples/Tables.js";
// import Icons from "views/examples/Icons.js";
import CategorieVoiture from "views/vaovao/CategorieVoiture.js";
import MarqueVoiture from "views/vaovao/MarqueVoiture.js";
import ListeAnnonce from "views/examples/ListeAnnonce";
// import InsertModele from "views/examples/InsertModele";
import ModeleVoiture from "views/vaovao/ModeleVoiture";
import Statistique from "views/vaovao/Statistique";

var routes = [
  // {
  //   path: "/index",
  //   name: "Dashboard",
  //   icon: "ni ni-tv-2 text-primary",
  //   component: <Index />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: <Maps />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: <Profile />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: <Tables />,
  //   layout: "/admin",
  // },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: <Register />,
  //   layout: "/auth",
  // },
  {
    path: "/CategorieVoiture",
    name: "Gestion de Categorie",
    icon: "ni ni-bullet-list-67 text-purple",
    component: <CategorieVoiture />,
    layout: "/admin",
  },
  {
    path: "/MarqueVoiture",
    name: "Gestion de marque",
    icon: "ni ni-tag text-purple",
    component: <MarqueVoiture />,
    layout: "/admin",
  },
  {
    path: "/ListeAnnonce",
    name: "Validation Annonce",
    icon: "ni ni-paper-diploma text-pink",
    component: <ListeAnnonce />,
    layout: "/auth",
  },
  // {
  //   path: "/InsertModele",
  //   name: "Gestion Modele",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: <InsertModele />,
  //   layout: "/auth",
  // },
  {
    path: "/ModeleVoiture",
    name: "Modele de Voiture",
    icon: "ni ni-bus-front-12 text-purple",
    component: <ModeleVoiture />,
    layout: "/admin",
  },
  {
    path: "/Statistique",
    name: "Statistique de vente",
    icon: "ni ni-chart-bar-32 text-blue",
    component: <Statistique />,
    layout: "/admin",
  },
];
export default routes;
