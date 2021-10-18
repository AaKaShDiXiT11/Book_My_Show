


import React from "react";
import { Route } from "react-router-dom";

//Layout
import DefaultLayout from "../Layout/Default.layout";

const DefaultHOC = ({component: Component,...rest }) =>{
  return (
    <>
    <Route
    {...rest}

     component={(props)=>(
       <DefaultLayout>
       <Component {...props}/>
       </DefaultLayout>
     )

     }
     />
    </>
  )
};

export default DefaultHOC;
