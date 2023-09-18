import * as React from "react";
import {
  Grid,
  IconButton,
  Typography,
  useTheme,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Stack,
  styled,
  InputBase,
  alpha,
} from "@mui/material";
import {
  Delete,
  EditNote,
  FilterList,
  Image,
  SearchOff,
} from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux'

const LeftContainer = ({editTask}) => {
  const todoTasks = useSelector(store => store.data)
  const dispatch = useDispatch()
  const theme = useTheme();
  const themeColor = theme.palette.primary.main;
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha("#000", 0.05),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    border: 20,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    color: themeColor,
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));
  const handleDelete = (index)=>{
    const data = todoTasks.filter((item,x)=>index!==x)
    dispatch({type:'dispatch_data',payload:data})
  }
  return ( 
    <>
      <Grid
        container
        direction={"column"}
        sx={{ margin: 0, height: "100%", width: "100%" }}
        alignItems={"center"}
      >
        <Typography md={10} sx={{ marginTop: 2, marginBottom: 2 }}>
          List of tasks
        </Typography>
        <Grid container sx={{ width: "100%", maxWidth: 360 }}>
          <Grid item lg={10} md={10} sm={10} xs={10}>
            <Search>
              <SearchIconWrapper>
                <SearchOff />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Grid>
          <IconButton>
            <FilterList />
          </IconButton>
        </Grid>
        <List sx={{ width: "100%", maxWidth: 360 }}>
          {todoTasks.map((data, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <Stack direction={"row"} spacing={0.1}>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    sx={{ color: themeColor }}
                    onClick={()=>editTask({...data,index})}
                  >
                    <EditNote />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    sx={{ color: themeColor }}
                    onClick={()=>handleDelete(index)}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Stack>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <Image />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={data.title}
                secondary={`${data.description.substring(0, 20)} ${data.description.length > 20 ? `...` : ``
                  }`}
              />
            </ListItem>
          ))}
        </List>
      </Grid>
    </>
  );
};

export default LeftContainer;
