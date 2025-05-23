// تحسين تحميل البايلود مع إعادة المحاولة
function loadPayload(maxRetries = 3) {
    let retryCount = 0;
    
    function tryLoad() {
        return new Promise((resolve, reject) => {
            fetch('./goldhen.bin')
                .then(res => {
                    res.arrayBuffer()
                        .then(arr => {
                            try {
                                window.pld = new Uint32Array(arr);
                                resolve();
                            } catch(e) {
                                if (retryCount < maxRetries) {
                                    retryCount++;
                                    console.log(`Retrying payload load... Attempt ${retryCount}`);
                                    setTimeout(() => tryLoad().then(resolve).catch(reject), 500);
                                } else {
                                    reject(e);
                                }
                            }
                        })
                        .catch(err => {
                            if (retryCount < maxRetries) {
                                retryCount++;
                                console.log(`Retrying payload load... Attempt ${retryCount}`);
                                setTimeout(() => tryLoad().then(resolve).catch(reject), 500);
                            } else {
                                reject(err);
                            }
                        });
                })
                .catch(err => {
                    if (retryCount < maxRetries) {
                        retryCount++;
                        console.log(`Retrying payload load... Attempt ${retryCount}`);
                        setTimeout(() => tryLoad().then(resolve).catch(reject), 500);
                    } else {
                        reject(err);
                    }
                });
        });
    }

    return tryLoad();
}

// بدء تحميل البايلود
loadPayload().then(() => {
    console.log("Payload loaded successfully");
}).catch(err => {
    console.error("Failed to load payload after retries:", err);
});

function CalcTime(dur){
    hrs=Math.floor(dur/1000/60/60);
    min=Math.floor(dur/1000/60-hrs*60);
    sec=Math.floor(dur/1000-min*60);
    mil=dur.toString().slice(-3);
    if (min!=0){
        ShowDuration=" - WK Exploited In : "+min+" minute"+(min==1?"":"s")+", "+sec+" second"+(sec==1?"":"s");
    } else {
        ShowDuration=" - Exploited In: "+sec+" second"+(sec==1?"":"s");
    }
}

function StartTimer(){
    StartTime=Date.now();
}

function EndTimer(){
    EndTime=Date.now();
    CalcTime(EndTime=Date.now()-StartTime);
    document.title+=ShowDuration;
}