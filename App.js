const express= require('express')
const app = express();
app.use(express.json())
require('dotenv').config()
function getCurrentUTCTimeWithValidation() {
  const currentTime = new Date().getTime(); // Get current time in milliseconds
  const twoSeconds = 2 * 1000; // Convert 2 seconds to milliseconds

  // Check if the current time is within the validation window
  if (Math.abs(currentTime - Date.now()) <= twoSeconds) {
    const utcTime = new Date().toISOString(); // Get current time in ISO format (UTC)
    return utcTime;
  } else {
    return "Time validation failed"; // Validation failed
  }
}
const currentUTCTime = getCurrentUTCTimeWithValidation();
function getCurrentDay(){
  const  day= new Date();
  const daysofweek= ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  const currentDay= day.getDay();
  const today = daysofweek[currentDay]
  return today
}
const today = getCurrentDay();
const status= 200;
app.get('/profile',(req,res)=>{
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