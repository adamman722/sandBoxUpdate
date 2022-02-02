import React, { PureComponent, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import styled from "styled-components";
function SnackBar() {
  const [point, setPoint] = useState(null);
  const [firstClick, setFirstClick] = useState(false);
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center"
  });
  let pictureUrls = [];

  // const GetPhoto = async () => {
  //   let toArray = [];

  //   try {
  //     const url = `https://api.unsplash.com/photos/?client_id=W2tVvVn2jO5f0zLOSjjgbJkTFnwDQuzqe9Lb_QgUJdU`;
  //     const res = await axios.get(url);
  //     toArray = res.data;
  //     console.log(toArray);
  //     toArray.map((data) => {
  //       pictureUrls = data.urls.regular;
  //       console.log(pictureUrls);
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   GetPhoto();
  // }, []);

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
    point === null
      ? setPoint(0)
      : setPoint((prev) => {
          let newPoint = prev + 1;
          return newPoint;
        });
    setFirstClick(true);

    setTimeout(() => {
      setFirstClick(false);
      setPoint(null);
    }, 30000);
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const verticalPosition = ["top", "bottom"];
  const horizontalPosition = ["center", "right", "left"];

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  console.log();
  const buttons = (
    <React.Fragment>
      <Button
        onClick={handleClick({
          vertical: `${verticalPosition[getRandomInt(2)]}`,
          horizontal: `${horizontalPosition[getRandomInt(3)]}`
        })}
      >
        Click me NOW
      </Button>
    </React.Fragment>
  );

  let newBackGround = () => {
    let number = Math.floor(Math.random() * 10);
    return { backgroundImage: `url(${pictureUrls[number]})` };
  };

  setInterval(newBackGround, 500);

  const action = <React.Fragment>{buttons}</React.Fragment>;

  return (
    <div>
      {firstClick ? (
        <p style={{ padding: "27px 20px 0px 5px", fontWeight: "bold" }}>
          Points so far...{point}
        </p>
      ) : null}

      {firstClick ? (
        <p style={{ fontWeight: "bold" }}>Ah Ah Ah...😜 can't click me again</p>
      ) : (
        buttons
      )}
      <Snackbar
        autoHideDuration={1500}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Click me quick loser...."
        key={vertical + horizontal}
        action={action}
        sx={{ color: "pink" }}
      />
    </div>
  );
}

export default SnackBar;
