import * as React from "react";
import Grid from "@mui/material/Grid";
import LeftContainer from "./LeftContainer";
import RightContainer from "./RightContainer";

export default function SpacingGrid() {
  return (
    <Grid
      sx={{ margin: 0, height: "100vh", width: "100%",pt:8 }}
      container
      direction={"row"}
    >
      <Grid item xs={12} sm={5.5} md={5} lg={3.5}>
        <LeftContainer />
      </Grid>
      <Grid item xs={12} sm={6.5} md={7} lg={8.5}>
        <RightContainer />
      </Grid>
    </Grid>
  );
}
