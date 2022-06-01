import './App.css';
import { Button, ChakraProvider, Divider, Text } from '@chakra-ui/react';
import videoFile from './assets/production ID 5199631.mp4'
import FFMPEG from "react-ffmpeg";
import { useEffect, useRef, useState } from 'react';

function App() {

  const video = useRef();
  const [list, setList] = useState([]);
  const [showRsult, setShowResult] = useState(false);
  const [uploadVideo, setUploadVideo] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false)

  const handleClick = () => {
    const element = document.createElement('input');
    element.setAttribute('type', 'file')
    // element.onchange = handleFile;
    element.click();
    setTimeout(() => {
      setUploadVideo(true)

    }, 20000)
  }


  useEffect(() => {
    if (uploadVideo){
      let count = 0
      const hello = setInterval(() => {
        var canvas = document.createElement('canvas');
        canvas.width = 240;
        canvas.height = 180;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(video.current, 0, 0, canvas.width, canvas.height);
        var dataURI = canvas.toDataURL('image/jpeg');
        count ++;
        if (count >= 3) {
          clearInterval(hello)
        }
        setList(list => [...list, dataURI])
      }, 3000)
    }
    
  }, [uploadVideo])

 

  return (
    <div className="App">
      <div className='navigation-container'>
        <Text fontSize={'2xl'}>Course quality detection</Text>
        <Button size={'sm'} onClick={handleClick}>Upload New </Button>
      </div>
      <Divider />
      <div style={{display:"flex", justifyContent:'center', alignItems:'center'}}>
        {
          uploadVideo
          ?
          <video ref={video} style={{height:'512px', marginTop:'20px'}} autoPlay  >
            <source src={videoFile} />
          </video>
          :
          null
        }
        
      </div>
      <Button onClick={_ => setShowResult(true)}>Predict Result</Button>
      {
        (showRsult)
        ?
        <>
          <p>The video is 73.6% likable to user</p>
          <Button onClick={_ => setShowSuggestion(true)}>Give Suggestion</Button>
          {
            showSuggestion
            ?
            <ul>
              <li>This is the speaking rate you should use 150-160 wpm for more engagement</li>
              <li>Reduce the length of the video</li>
              <li>Dim the lighting</li>
            </ul>
            :
            null
          }
          
        </>
        :
        null
        
      }

      
      <div className='snapshots'>
        {
          list.map(item => <img src={item} key={item} alt="Test" />)
        }
      </div>
    </div>
  );
}

export default () => {
  return(
    <ChakraProvider>
      <App />
    </ChakraProvider>
  )
};
