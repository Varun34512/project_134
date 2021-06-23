img="" ;
status="" ;
objects=[] ;
sound="" ;

function preload() {
    song=loadSound("alert_alert.mp3") ;
}

function setup() {
    canvas = createCanvas(380,380) ;
    canvas.center() ;
    video= createCapture(VIDEO) ;
    video.size(380,380) ;
    video.hide() ;
    objectDetector= ml5.objectDetector('cocossd', modelLoaded) ;
    document.getElementById("status").innerHTML="Status : Detecting Baby" ;
}

function draw(){
    image(video,0,0,380,380) ;
    if (status!="") {
        r= random(255) ;
        g= random(255) ;
        b= random(255) ;
        objectDetector.detect(video, gotResult) ;
        for (i =0 ; i<objects.length ; i++) {
            if(objects[i].label=="person"){
            sound.stop();
            document.getElementById("status").innerHTML="Baby Detected" ;
            fill(r,g,b) ;
            percent = floor(objects[i].confidence*100) ;
            text(objects[i].label + " " + percent + "%" ,objects[i].x +15 , objects[i].y + 15 ) ;
            noFill() ;
            stroke(r,g,b) ;
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height) ;
        }
        else{
            document.getElementById("status").innerHTML="Baby Not Detected" ;
            sound.play();
        }
        if(objects.length<0){
            document.getElementById("status").innerHTML="Baby Not Detected" ;
            sound.play(); 
        }
    }
    }
    
}

function modelLoaded() {
    console.log("model is loaded") ;
    status=true ;
    }

function gotResult(error,results) {
    if (error) {
        console.log(error) ;
    } else {
        console.log(results) ;
        objects=results ;
    }
}