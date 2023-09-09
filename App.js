const express= require('express')
const app = express();
app.use(express.json())
require('dotenv').config()




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
  const now = new Date();
  const currentUTCTime = now.toISOString().split('.')[0]+'Z';
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

