import { makeStyles } from '@mui/styles';
import Helmet from '../components/helmet'
import {useState} from 'react'
const useStyles = makeStyles({
    Racer: {
        width:'80%',
        display:'flex',
        justifyContent:"space-around",
        alignItems:'center',
        flexDirection:'row',
        marginBottom:"10px",
        cursor:"pointer"
    },
    Selected_racer:{
        backgroundColor:"#89729E"
    },
    Racer_number: {
        width:"8%",
    "& p":{
        fontWeight:"700",
    }
    },
    Racer_avatar: {
        width: "30%",
        '& svg':{
            width:"100%",
        }
    },
    Racer_description: {
        width: "60%",
        paddingLeft:"10px",
        "& h1":{
            textAlign:'center',
            marginBottom:"5px",
            fontWeight:"600"
        },
        "& p":{
            textAlign:'center',
        }
    },
    '@media (min-width: 375px)': {
        Racer_avatar: {
            width: "23%",
        
        },
        Racer_description: {
            width: "60%",
        },
    },
    '@media (min-width: 768px)': {
        Racer_avatar: {
            width: "11%",
        
        },
        Racer_description: {
            display:"flex",
            justifyContent:"space-between",
            width: "60%",
            "& h1":{
                textAlign:'left',
                fontSize:"20px"
            },
            "& p":{
                textAlign:'left',
                fontSize:"18px"
            }
        },
    },
    '@media (min-width: 1024px)': {
        Racer_avatar: {
            width: "10%",
        
        },
        Racer_description: {
            display:"flex",
            justifyContent:"space-between",
            width: "60%",
            "& h1":{
                textAlign:'left',
                fontSize:"24px"
            },
            "& p":{
                textAlign:'left',
                fontSize:"22px"
            }
        },
    },
   
  });

const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);

    var n = Math.abs((millis % 60000) / 1000);
    var miliseconds = ((n - Math.floor(n)) * 1000).toFixed(0)
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds + ":" + miliseconds
  }
export default function Racer({data,index, setClickIndex, clickIndex}) {
    const classes = useStyles();
    const [clicked,setClicked] = useState(false)
  return (
    
    <div onClick={() => setClickIndex(index)} className={`${clickIndex == index ? classes.Selected_racer : ""} ${classes.Racer}`}>
    
        <div className={classes.Racer_number}>
            <p>{index != undefined ? index  :""} </p>
        </div>
        <div className={classes.Racer_avatar}>
          <Helmet color={data != undefined ? data.color : "#ccc"}/>    
        </div>

        <div className={classes.Racer_description}>
            <h1>{data != undefined ? data.name : ""}</h1>
            <p><span>{data != undefined ? millisToMinutesAndSeconds(data.time) :""}</span> | <span>{data != undefined ? data.speed : ""}км/ч</span></p>
        </div>
    </div>
  )
}
