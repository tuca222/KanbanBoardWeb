import { useEffect, useState } from "react"
import authentication from "../../api/auth";
import { redirect } from "react-router-dom";


const RedirectComponet = () => {

  useEffect(() => {
    const getRedirectAuthentication = async () => {
      try {
        const response = await authentication.initial();
        if (response.data.authenticated === true){
          return <redirect to ='/users/:userId/boards'/>
        } else {
          return <redirect to ="/Login"/>
        }
      } catch (error) {
        console.log(Error.message);
      }
    }
    getRedirectAuthentication()
  }, []);  
}

export default RedirectComponet;