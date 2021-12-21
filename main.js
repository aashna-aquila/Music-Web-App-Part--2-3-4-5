song1="";
song2="";
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
scoreleftwrist=0;
scorerightwrist=0;
songstatus1=0;
songstatus2=0;

function preload()
{
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3")
}

function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotposes);
}

function modelLoaded()
{
    console.log('Posenet has been initialized');
}

function play()
{
    song.play();
    song.rate(1);
    song.setVolume(1);
}

function gotposes(results)
{
if(results.length>0)
{
    console.log(results);
    scoreleftwrist=results[0].pose.keypoints[9].score;
    scorerightwrist=results[0].pose.keypoints[10].score;
    console.log("scoreleftwrist=" + scoreleftwrist + "scorerightwrist=" + scorerightwrist);
    leftwristx=results[0].pose.leftWrist.x;
    leftwristy=results[0].pose.leftWrist.y;
    console.log("leftwristx = "+leftwristx+"leftwristy = "+leftwristy);

    rightwristx=results[0].pose.rightWrist.x;
    rightwristy=results[0].pose.rightWrist.y;
    console.log("rightwristx = "+rightwristx+"rightwristy = "+rightwristy);
}
}

function draw()
{
    image(video,0,0,600,500);
    songstatus1=song1.isPlaying();
    songstatus2=song2.isPlaying();
    fill("#FF0000");
    stroke("#FF0000");
    if(scorerightwrist>0.2)
    {
        circle(rightwristx,rightwristy,20);
        song2.stop();

        if(songstatus1==false)
        {
            song1.play();
            document.getElementById("song").innerHTML="Playing Harry Potter Theme Song";
        }
    }
    if(scoreleftwrist>0.2)
    {
    circle(leftwristx,leftwristy,20);
    song1.stop();

    if(songstatus2==false)
    {
        song2.play();
        document.getElementById("song").innerHTML="Playing Peter Pan Song";
    }
    }
}