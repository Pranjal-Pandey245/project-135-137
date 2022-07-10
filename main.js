status="";
text="";
objects=[];

function setup(){
    canvas= createCanvas(300,300);
    canvas.position(600,400);
    video= createCapture(VIDEO);
    video.size(300, 300);
    video.hide();
}

function start(){
    objectDetector= ml5.objectDetector('cocossd', modalLoaded);
    document.getElementById("status").innerHTML= "Status: Detecting objects";
    text= document.getElementById("input").value;
}

function modalLoaded(){
    console.log("moddal loaded!");
    status= true;
}

function draw(){
    image(video, 0, 0, 480, 480)

    if(status!=""){

        objectDetector.detect(video, gotResult);

        for(i=0; i<objects.length; i++){
            percent= floor(objects[i].confidence*100);

            fill('red');
            stroke('red');
            
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            
        }

        if(objects[i].label== text){
            document.getElementById("status_object").innerHTML= objects[i].label+ " found";
            synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(objects[i].label + " found");
            synth.speak(utterThis);
            video.stop();
            objectDetector.detect(gotResult);
        }
        else{
            document.getElementById("status_object").innerHTML= text+ " not found";
        }
    }
}

function gotResult(error, results){
       if(error){
        console.error(error);
       }
    else{
        console.log(results);
        objects=results;
    }
}
