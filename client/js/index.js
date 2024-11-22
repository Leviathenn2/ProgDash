/**
 * @author Leviathenn
 */

function changeImage(iconElement,itemObj, content){
    fetch("logoconf.json").then((xres)=>{
    
        xres.json().then((res)=>{
            
            let imgElement = document.createElement("img")
            imgElement.className = iconElement.className;
            imgElement.src = res[content]
            imgElement.width = 20;
            imgElement.height = 20;
            for (let index = 0; index < iconElement.attributes.length; index++) {
                const attr = iconElement.attributes.item(index);
                imgElement.setAttribute(attr.name,attr.value);
            }
            
            itemObj.replaceChild(imgElement, iconElement)
        }).catch((err)=>{
            alert(err)
        })
    }).catch((err)=>{
        alert(err)
    })
}
async function fetchImageSrc(content){
    return new Promise((resolve, reject)=>{
        fetch("logoconf.json").then((xres)=>{
    
            xres.json().then((res)=>{
                resolve(res[content]);
            }).catch((err)=>{
                alert(err)
            })
        }).catch((err)=>{
            alert(err)
        })
    })
}
document.addEventListener("DOMContentLoaded",()=>{
    let sideitems = []
    document.querySelectorAll(".sideitem").forEach((item)=>{
        sideitems.push(item);
    })
    sideitems.map((v,i,a)=>{
        v.style.top = `${(i+1)*40}px`
    });
    
    document.querySelectorAll(".dashitem").forEach((itemObj)=>{
        /***
         * @type {Element[]} iconList
         */
        let iconList = [];
        itemObj.querySelectorAll("#itemicon").forEach((v)=>{iconList.push(v)});
        iconList.map((iconElement,i,v)=>{
            let content = iconElement.textContent.split("%")[1].split("%")[0];
            if(content != "ICON_NONE"){
                
                iconElement.textContent = ""
                fetch("logoconf.json").then((xres)=>{
    
                    xres.json().then((res)=>{
                        
                        let imgElement = document.createElement("img")
                        imgElement.className = iconElement.className;
                        imgElement.src = res[content]
                        imgElement.width = 20;
                        imgElement.height = 20;
                        try{
                            if(iconElement.hasAttribute("action")){
                                imgElement.setAttribute("action",iconElement.getAttribute("action"))
                            }
                            if(iconElement.hasAttribute("powerbutton")){
                                imgElement.setAttribute("powerbutton","")
                            }
                        }catch{

                        }
                        itemObj.replaceChild(imgElement, iconElement)
                    }).catch((err)=>{
                        alert(err)
                    })
                }).catch((err)=>{
                    alert(err)
                })
            }else{
                itemObj.querySelector(".icon").textContent = ""
            }
        })
    })
    
    try {
        document.querySelector("body").addEventListener("click",async (ev)=>{
            try {
               
                if(ev.target.hasAttribute("powerbutton") && ev.target.hasAttribute("pending") != true){
                    let element = ev.target;
                    
                    let action = element.getAttribute("action").split("%")[1].split("%")[0];
                    let containerId = element.parentElement.hasAttribute("containerId") ? element.parentElement.getAttribute("containerId") : "notfound"
                    if(action == "POWER_OFF"){
                        element.src = await fetchImageSrc("SPINNER_WAITING");
                        ev.target.setAttribute("pending",true);
                        fetch(`https://musical-space-cod-97qv5vx6vvq7c7p6j-3030.app.github.dev/status/${containerId}`).then((xres)=>{
                            xres.json().then(async (res)=>{
                                alert(res.response)
                                if(res["response"] == false){
                                    element.src = await fetchImageSrc("POWER_OFF");
                                    element.setAttribute("action","%POWER_OFF%");
                                }else{
                                    element.src = await fetchImageSrc("POWER_ON");
                                    element.setAttribute("action","%POWER_ON%");
                                }
                            }).catch(async (err)=>{
                                alert(err)
                                element.src = await fetchImageSrc("POWER_OFF");
                                element.setAttribute("action","%POWER_OFF%");
                            })
                        }).catch(async (err)=>{
                            alert(err)
                            element.src = await fetchImageSrc("POWER_OFF");
                            element.setAttribute("action","%POWER_OFF%");

                        });
                    }else if(action == "POWER_ON"){
                        element.src = await fetchImageSrc("POWER_OFF");
                        element.setAttribute("action","%POWER_OFF%");
                    

                    }
                }
        } catch (error){
            alert(error)
        }
       })
    } catch (error) {
        alert(error)
    }
});