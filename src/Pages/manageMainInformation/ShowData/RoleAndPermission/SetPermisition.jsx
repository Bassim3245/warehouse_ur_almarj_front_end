import React from "react";
import Permission from "./Permission";
import { useParams } from "react-router";

function SetPermissionToGroup() {
    const {id}=useParams()
  return <Permission label="setPermissionToGroup" GroupId={id}/>
}
export default SetPermissionToGroup;
