import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Button, ButtonGroup, LinearProgress } from '@mui/material';

const Widget = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 700,
  height:500,
  maxWidth: '100%',
  margin: 'auto',
  marginTop:31,
  position: 'relative',
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
  backdropFilter: 'blur(40px)',
}));

const CoverImage = styled('div')({
  width: 200,
  height: 100,
  objectFit: 'cover',
  overflow: 'hidden',
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: 'rgba(0,0,0,0.08)',
  '& > img': {
    width: '100%',
  },
});

export default function MusicPlayerSlider({data,edit,setData}) {
  const theme = useTheme();
  const [countdown, setCountdown] = React.useState(0);

  React.useEffect(() => {
      const targetTimestamp = data?.status ? new Date().getTime() : new Date(data?.date).getTime();
      const intervalId = setInterval(() => {
          const currentTime = new Date().getTime();
          const remainingTime = targetTimestamp - currentTime;

          if (remainingTime <= 0) {
              clearInterval(intervalId);
              setCountdown(0);
          } else {
              setCountdown(remainingTime);
          }
      }, 1000);
      return () => {
          clearInterval(intervalId);
      };
  }, [data.date]);

  const formatTime = (milliseconds) => {
      const seconds = Math.floor(milliseconds / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);

      return `${String(hours).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  };

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Widget>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CoverImage>
            <img
              alt="no Image"
              src={typeof (data.image) == 'object' ? URL.createObjectURL(data.image) : `http://localhost:3000/uploads/${data.image}`}
              />
          </CoverImage>
          <Box sx={{ ml: 1.5, minWidth: 0 }}>
            <Typography  color="text.secondary" fontWeight={500}>
              {data.title}
            </Typography>
            <Typography >
              <b>{data.description}</b>
            </Typography>

          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 7,
          }}
        >
          { data.status?<h1>Congratulations!</h1> : <><h2>Time Remaining :</h2>&nbsp;&nbsp;<h1> {formatTime(countdown)}</h1></>}

        </Box>
        <Stack spacing={2} direction="row" sx={{ mt: 3, px: 1 ,mb:3, alignItems:'center',justifyContent:'center'}} alignItems="center">
        {countdown ? 
    <Stack sx={{ width: '100%', color: 'grey.500',mt:3 }} spacing={2}>
      <LinearProgress color="inherit" />
    </Stack>    
    : data.status ? <h5 style={{'color':'green'}}>Task Completed</h5>:<h5 style={{'color':'red'}}>Task Expired</h5>}    
    </Stack>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            m: 1,
          }}
        >
        <h6>Priority :&nbsp;{data.priority===1 ? 'high': data.priority === 2 ? 'medium' : 'low'}</h6>
        <h6>Last date :&nbsp;&nbsp;{new Date(data.date).toDateString()}</h6>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            m: 5,
          }}
        >
      <ButtonGroup variant="text" aria-label="text button group">
        <Button onClick={()=>edit(true)}>Resechdule</Button>
        { !!countdown && <Button onClick={()=>setData(true)}>Mark as Done</Button>}
        <Button onClick={()=>edit(true)}>Edit</Button>
      </ButtonGroup>
        </Box>
      </Widget>
    </Box>
  );
}
