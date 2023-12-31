import React, { useState } from "react";
import { Alert, Box, Button, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import image from "../../assets/note-7181089-5807265.png";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { AddAPhoto } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AddTask, EditTask } from "../../utils/api";
import DetailPage from './DetailPage'

const RightContainer = ({ data, addTask }) => {
  const todoTasks = useSelector(store => store.data)
  const user = useSelector(store => store.user)
  const [edit, setEdit] = useState(false)
  const dispatch = useDispatch()
  const handleChange = (e) => {
    addTask({ ...data, [e.target.name]: e.target.value });
  };
  const handleEdit = async (status = false) => {
    const { index, ...taskData } = data
    const prev = todoTasks
    console.log(!!status)
    taskData.status = !!status
    taskData.author = user._id
    if (prev[index]) {
      prev[index] = taskData
      await EditTask(taskData).then(res => dispatch({ type: 'dispatch_data', payload: prev }))
    } else {
      await AddTask(taskData).then(res => dispatch({ type: 'dispatch_data', payload: [...prev, res.data.data] }))
    }
    setEdit(false)
    addTask('')
  }
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    addTask({ ...data, image: file });
  }
  return (
    <>
      <Grid
        container
        direction={"column"}
        sx={{
          p: '9%',
          height: "100%",
          width: "100%",
          pt: { xs: '5vh', sm: data ? "5vh" : "20vh" },
        }}
        alignItems={"center"}
      >
        {data ? edit ? (
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Create Task
            </Typography>
            <Grid container spacing={3} mt={4}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  required
                  id="title"
                  name="title"
                  label="Task Title"
                  value={data.title || ""}
                  onChange={handleChange}
                  fullWidth
                  autoComplete="Title"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Typography>Priority level</Typography>
                <RadioGroup
                  row
                  name="priority"
                  value={data.priority || ''}
                  onChange={handleChange}
                >
                  <FormControlLabel value="3" control={<Radio />} label="High" />
                  <FormControlLabel value="2" control={<Radio />} label="Medium" />
                  <FormControlLabel value="1" default control={<Radio />} label="Low" />
                </RadioGroup>
              </Grid>


              <Grid item xs={12}>
                <TextField
                  id="description"
                  name="description"
                  label="Short Description *"
                  value={data.description || ""}
                  onChange={handleChange}
                  fullWidth
                  autoComplete="Description"
                  multiline
                  rows={3}
                  helperText="Short Description (about 10-20 words)"
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <label htmlFor='input-image'>
                  <Box
                    htmlFor='input-image'
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
                  >
                    {data?.image ? (
                      <img
                        style={{ width: 200, height: 120, padding: 22 }}
                        src={typeof (data.image) == 'object' ? URL.createObjectURL(data.image) : `${import.meta.env.VITE_BaseURL}/uploads/${data.image}`}
                      />
                    ) : (
                      <React.Fragment>
                        <AddAPhoto />
                        <Typography sx={{ mt: 1, fontSize: 13 }}>
                          Upload Thumbnail
                        </Typography>
                      </React.Fragment>
                    )}
                    <input
                      id="input-image"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleFileSelect}
                    />
                  </Box>
                </label>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      defaultValue={dayjs()}
                      name='date'
                      value={dayjs(data.date) || dayjs()}
                      onChange={(date) => addTask({ ...data, date })}
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
              <Grid item xs={12} sm={6}>
                <Alert color="secondary" severity="success" sx={{ mt: 1, fontSize: 13 }}>
                  <ul style={{ margin: "0", padding: "0" }}>
                    <li> Make your thumbnail 1280 by 720 pixels (16:9 ratio)</li>
                    <li>Ensure that your thumbnail is less than 2MB</li>
                    <li>Use a JPG, PNG, or JPEG file format</li>
                  </ul>
                </Alert>
              </Grid>
              <Grid item container xs={12} sm={6} alignItems="flex-end" justifyContent="flex-end">
                <Button onClick={() => {
                  setEdit(false)
                  addTask('')
                }}>Discard</Button>
                <Button color='info' onClick={() => handleEdit(false)}>save</Button>
              </Grid>
            </Grid>
          </React.Fragment>
        ) :
          <DetailPage data={data} edit={setEdit} setData={handleEdit} />
          : (
            <div className="create-container" onClick={() => addTask({})}>
              <img width={300} height={300} src={image} />
              <Typography variant="h6" gutterBottom >
                Create a Task
              </Typography>
            </div>
          )}
      </Grid>
    </>
  );
};

export default RightContainer;
