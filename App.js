const express= require('express')
const app = express();
/*
Create and host an endpoint using any programming language of your choice.
The endpoint should take two GET request query parameters and return specific information in JSON format.
Slack name
Current day of the week
Current UTC time (with validation of +/-2)
Track
The GitHub URL of the file being run
The GitHub URL of the full source code.
A  Status Code of Success
{
  "slack_name": "example_name",
  "current_day": "Monday",
  "utc_time": "2023-08-21T15:04:05Z",
  "track": "backend",
  "github_file_url": "https://github.com/username/repo/blob/main/file_name.ext",
  "github_repo_url": "https://github.com/username/repo",
  "status_code": 200
}
 */

app.use(express.json())

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
    "github_repo_url":"https://github.com/Gicherujoh/Zuri-Profile-Backend",
    "status":status
  })
})

app.listen(5500,()=>console.log('Serverrunning on port 5500'))