import React from "react";
import IconButton from "@mui/material/IconButton";
import { Close, CheckCircleOutline } from "@mui/icons-material";
import { Typography, styled } from "@mui/material";
import dayjs from 'dayjs';

function CustomStatus(props) {

  const { status, date = dayjs() } = props;
  const live = dayjs(date) > dayjs()
  const text = status ? 'done' : live ? 'live' : 'expired'
  const CardStatus = styled(Typography)({
    textAlign: "right",
    fontSize: "11px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <IconButton sx={{ display: 'flex', flexDirection: 'column',margin:1,width:10 }}>
        {status ? <CheckCircleOutline sx={{ width: '25px', height: '25px' }} style={{ color: "green" }} /> :
          live ? <div style={{ marginBottom: 7 }} className="dot-flashing"></div> :
            <Close sx={{ width: '25px', height: '25px' }} style={{ color: "red" }} />
        }
        <CardStatus>{text}</CardStatus>
      </IconButton>
    </div>
  );
}

export default CustomStatus;
