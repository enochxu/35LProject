import { Spinner } from "react-bootstrap";
import React from "react";

const Loading = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
  }

  return (
    <div>
      <Spinner style={style} animation="border"/>
    </div>
  );
}

export default Loading;