// تحسين تحميل البايلود مع إعادة المحاولة وتأخير
function loadPayload(maxRetries = 3) {
    let retryCount = 0;
    
    function tryLoad() {
        return new Promise((resolve, reject) => {
            // تأخير أولي قبل بدء التحميل
            setTimeout(() => {
                fetch('./goldhen.bin')
                    .then(res => {
                        if (!res.ok) {
                            throw new Error(`HTTP error! status: ${res.status}`);
                        }
                        return res.arrayBuffer();
                    })
                    .then(arr => {
                        try {
                            // تأخير قبل تحويل البيانات
                            setTimeout(() => {
                                try {
                                    window.pld = new Uint32Array(arr);
                                    // تأخير قبل اعتبار العملية ناجحة
                                    setTimeout(() => resolve(), 300);
                                } catch(e) {
                                    handleError(e);
                                }
                            }, 200);
                        } catch(e) {
                            handleError(e);
                        }
                    })
                    .catch(handleError);
            }, 100);
        });

        function handleError(err) {
            console.error(`Load attempt ${retryCount + 1} failed:`, err);
            if (retryCount < maxRetries) {
                retryCount++;
                console.log(`Retrying payload load... Attempt ${retryCount}`);
                // زيادة وقت الانتظار مع كل محاولة
                setTimeout(() => tryLoad().then(resolve).catch(reject), 500 * retryCount);
            } else {
                reject(err);
            }
        }
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