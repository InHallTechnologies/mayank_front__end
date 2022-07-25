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
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [results, setResults] = useState([])
  const [finalLikabe, setFinalLikable] = useState(0)

  const handleClick = () => {
    const element = document.createElement('input');
    element.setAttribute('type', 'file')
    element.accept = '.mp4'
    element.onchange = (event) => {
      const {name}  =(event.target.files[0]);
      if (name.includes("office")) {
        setResults([
          "This is the speaking rate you should use 150-160 wpm for more engagement",
          "Increase the length of the video. Minimum 5 - 6 min",
          "Dim the lighting"
        ])
        var randomnumber = (Math.random() * (70 - 65 + 1)) + 65;
        setFinalLikable(randomnumber)
      
      }else if (name.includes('childrens')) {
        setResults([
          "This is the speaking rate you should use 120-140 wpm for more engagement",
          "Increase the length of the video. Minimum 2 - 3 min",
        ])
        var randomnumber = (Math.random() * (50 - 60 + 1)) + 60;
        setFinalLikable(randomnumber)
      }else {
        setResults([
          "This is the speaking rate you should use 150-160 wpm for more engagement",
          "Increase the length of the video. Minimum 5 - 6 min",
          "Dim the lighting"
        ])
        var randomnumber = (Math.random() * (80 - 70 + 1)) + 70;
        setFinalLikable(randomnumber)
      }
      setVideoFile(URL.createObjectURL(event.target.files[0]))
    };
    element.click();
    setTimeout(() => {
      setUploadVideo(true)

    }, 1000)
  }

  console.log(finalLikabe)

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
          uploadVideo && videoFile
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
          <p>The video is {finalLikabe}% likable to user</p>
          <Button onClick={_ => setShowSuggestion(true)}>Give Suggestion</Button>
          {
            showSuggestion
            ?
            <ul>
              <li>This is the speaking rate you should use 150-160 wpm for more engagement</li>
              <li>Increase the length of the video. Minimum 5 - 6 min</li>
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
