
import { makeStyles } from '@mui/styles';
import {useState, useEffect} from "react"
import Racer from '../components/racer'
import { Waypoint } from 'react-waypoint';

let players = require('../public/racers.json');

const useStyles = makeStyles({
    Racers: {
        display:'flex',
        flexDirection:"column",
        alignItems:'center',
    },
  });

export default function Racers() {

    const classes = useStyles();
    const [racers,setRacers] = useState([])
    const [currentPage,setCurrentPage] = useState(1)
    const [clickIndex, setClickIndex] = useState()
    useEffect(() => {
      
        if(currentPage <= Math.ceil(players.length / 50)){
            setRacers(players.slice(0, currentPage * 50))
        }
        
    },[currentPage])
    return (

        <div className="Shell">
            <div className={classes.Racers}>
                {
                    racers.map((pl,index) => 
                        <Racer clickIndex = {clickIndex} setClickIndex = {setClickIndex} key={index} data={pl} index = {index + 1}/>
                        
                        )
                }
            </div>
            {racers.length > 0 ? 
            <Waypoint
            onEnter={() => {setCurrentPage(currentPage + 1)}}
            
          />
            : ""}
        </div>
       
  )
}
