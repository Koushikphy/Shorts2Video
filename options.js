var clickedEl = null;

document.addEventListener("contextmenu", function(event){
    let currentURL = this.location.href
    // console.log(currentURL)
    if(currentURL.includes('flipkart')){
        clickedEl = event.target.style.backgroundImage.match(/url\(["']?([^"']*)["']?\)/)[1]
        //.split(',')[0].slice(4, -1).replace(/"/g, "");
        clickedEl = clickedEl.replace("178/178","1160/1160")  // the main page preview
        clickedEl = clickedEl.replace("248/248","1160/1160") // user images list preview

        
    } else if(currentURL.includes('amazon')){
        
        let elem = event.target;
        let classes = elem.classList;
        if(classes.contains("cr-lightbox-navigator-container")){
            // from the full image, there is none than the following class
            clickedEl = document.querySelector(".cr-lightbox-main-image-container img").src;

        } else if (classes.contains("cr-thumbnail-preview-tile")){
            // from gallery of user images
            url = elem.style.background.match(/url\(["']?([^"']*)["']?\)/)[1] 
            //.split(',')[0].slice(4, -1).replace(/"/g, "");
            clickedEl = url.replace("._SY256","") // remove this part to get the full image

        } else if(elem.tagName =="IMG"){
            // main web page preview
            url = elem.src;
            // base name 
            let splitted = url.split("._")
            if(splitted.length==2){
                let base = splitted[0]
                let extn = splitted[1].split('.')[1]
                clickedEl = `${base}.${extn}`
            }else{  
                clickedEl = null
            }

            // regex can be used \._[\w,_]+

        } else{
            clickedEl = null
        }

    } else{
        clickedEl = null
    }
    console.log("clicked element ---- ", clickedEl)
}, true);




chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request == "getClickedEl") {
        sendResponse(clickedEl);
    }
});