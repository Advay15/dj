music1 = "";
music2 = "";
music3 = "";
music4 = "";
music5 = "";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
function preload()
{
   music1 = loadSound("M1.mp3");
   music2 = loadSound("M2.mp3");
   music3 = loadSound("M3.mp3");
   music4 = loadSound("M4.mp3");
   music5 = loadSound("M5.mp3");
}

function setup() 
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
     poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized!');
}
function draw() 
{
    image(video, 0, 0, 600, 500);
    fill("#42fffb");
    stroke("#42fffb");

    if (scoreLeftWrist > 0.2) 
    {
        circle(leftWristX, leftWristY, 20);
        if(leftWristY > 0 && leftWristY < 100)
        {
            document.getElementById("next").innerHTML="music 1 is playing";
            music1.play();
        }
        else if(leftWristY > 100 && leftWristY < 200)
        {
            document.getElementById("next").innerHTML="music 2 is playing";
            music2.play();
        }
        else if(leftWristY > 200 && leftWristY < 300)
        {
            document.getElementById("next").innerHTML="music 3 is playing";
            music3.play();
        }
        else if(leftWristY > 300 && leftWristY < 400)
        {
            document.getElementById("next").innerHTML="music 4 is playing";
            music4.play();
        }
        else if(leftWristY > 400 && leftWristY < 500)
        {
            document.getElementById("next").innerHTML="music 5 is playing";
            music5.play();
        }
    }
    if (scoreRightWrist > 0.2) 
    {
        circle(rightWristX, rightWristY, 20);
        if(rightWristY > 0 && rightWristY < 100)
        {
            document.getElementById("previous").innerHTML="music 5 is playing";
            music5.play();
        }
        else if(rightWristY > 100 && rightWristY < 200)
        {
            document.getElementById("previous").innerHTML="music 4 is playing";
            music4.play();
        }
        else if(rightWristY > 200 && rightWristY < 300)
        {
            document.getElementById("previous").innerHTML="music 3 is playing";
            music3.play();
        }
        else if(rightWristY > 300 && rightWristY < 400)
        {
            document.getElementById("previous").innerHTML="music 2 is playing";
            music2.play();
        }
        else if(rightWristY > 400 && rightWristY < 500)
        {
            document.getElementById("previous").innerHTML="music 1 is playing";
            music1.play();
        }
    }
}
 function play()
{
    music1.play();
    music1.setVolume(1);
    music1.rate(1);  
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}