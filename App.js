const express= require('express')
const app = express();
app.use(express.json())
require('dotenv').config()

function getCurrentUTCTime() {
  const now = new Date();
  const minutes = now.getUTCMinutes();
  const adjustedMinutes = minutes >= 2 ? minutes - 2 : 60 - (2 - minutes);
  
  const currentUTCTime = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), adjustedMinutes, now.getUTCSeconds());
  
  return currentUTCTime.toISOString();
}

const currentUTCTime = getCurrentUTCTime();

function getCurrentDay(){
  const  day= new Date();
  const daysofweek= ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  const currentDay= day.getDay();
  const today = daysofweek[currentDay]
  return today
}
const today = getCurrentDay();
const status= 200;
app.get('/api',(req,res)=>{
  res.json({
    "slack_name":req.query.slack_name,
    "current_day":today,
    "utc_time":currentUTCTime,
    "track":req.query.track,
    "github_file_url":"https://github.com/Gicherujoh/Zuri-Profile-Backend/blob/master/App.js",
    "github_repo_url":"https://github.com/Gicherujoh/Zuri-Profile-Backend",
    "status":status
  })
})
const port = process.env.Port;

app.listen(port,()=>console.log(`Server running on port ${port}`))
