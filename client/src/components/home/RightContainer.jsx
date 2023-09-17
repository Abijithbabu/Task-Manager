import React, { useState } from "react";
import { Alert, Box, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import image from "../../assets/note-7181089-5807265.png";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { AddAPhoto } from "@mui/icons-material";

const RightContainer = () => {
  const [task, setTask] = useState("");
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Grid
        container
        direction={"column"}
        sx={{
          margin: 0,
          height: "100%",
          width: "100%",
          pt: task ? "5vh" : "25vh",
          pr: "5vh",
        }}
        alignItems={"center"}
      >
        {task ? (
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Create Task
            </Typography>
            <Grid container spacing={3} mt={4}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="title"
                  name="title"
                  label="Task Title"
                  value={task.title || ""}
                  onChange={handleChange}
                  fullWidth
                  autoComplete="Title"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker 
                defaultValue={dayjs()}
                name='date'
                value={task.date || ''}
                onChange={(date) => setTask({ ...task, date })}
                disablePast
                slotProps={{
                  textField: {
                    helperText: 'Last date of submission',
                  },
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
   
              <Grid item xs={12}>
                <TextField
                  id="description"
                  name="shortdescription"
                  label="Short Description *"
                  value={task.shortdescription || ""}
                  onChange={handleChange}
                  fullWidth
                  autoComplete="Description"
                  multiline
                  rows={3}
                  helperText="Short Description (about 10-20 words)"
                />
              </Grid>
               
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: 200,
              height: 100,
              cursor: "pointer",
              backgroundColor: "#212121",
              "&:hover": {
                backgroundColor: "#424242",
                opacity: [0.9, 0.8, 0.7],
              },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
            // onClick={handleFileSelect}
          >
            {task?.image ? (
              <></>
              // <img
              //   style={{ width: 240, height: 135, padding: 22 }}
              //   src={typeof(task.image) == 'object'? URL.createObjectURL(task.image) : `${process.env.REACT_APP_BaseURL}/${data.image}`} 
              // />
            ) : (
              <React.Fragment>
                <AddAPhoto/>
                <Typography sx={{ mt: 1, fontSize: 13 }}>
                  Upload Thumbnail
                </Typography>
              </React.Fragment>
            )}
            {/* <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            /> */}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>Priority level</Typography>
          <RadioGroup
            name="priority"
            value={task.priority || ''}
            onChange={handleChange}
          >
            <FormControlLabel value="High" control={<Radio />} label="High" />
            <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
            <FormControlLabel value="Low" default control={<Radio />} label="Low" />
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
        <Alert color="primary" severity="info" sx={{ mt: 3, fontSize: 13 }}>
          <ul style={{ margin: "0", padding: "0" }}>
            <li> Make your thumbnail 1280 by 720 pixels (16:9 ratio)</li>
            <li>Ensure that your thumbnail is less than 2MB</li>
            <li>Use a JPG, PNG, or JPEG file format</li>
          </ul>
        </Alert>
        </Grid>
            </Grid>
          </React.Fragment>
        ) : (
          <>
            <img width={300} height={300} src={image} />
            <Typography variant="h6" gutterBottom onClick={() => setTask({})}>
              Create a Task
            </Typography>
          </>
        )}
      </Grid>
    </>
  );
};

export default RightContainer;
