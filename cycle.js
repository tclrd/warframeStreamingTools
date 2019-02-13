let nitainActive;
window.setInterval(function(){
    fetch('https://api.warframestat.us/pc/cetusCycle')
    .then(res => res.json())
    .then(data => process(data,"Cetus"));
    fetch('https://api.warframestat.us/pc/vallisCycle')
    .then(res => res.json())
    .then(data => process(data,"Vallis"));
    fetch('https://api.warframestat.us/pc/alerts')
    .then(res => res.json())
    .then(data => filterAlerts(data));
    function process(data, zone){
        var zoneTime = data;
        if(data.isDay){
            icon = "sun";
        }else{
            icon = "moon";
        }
            $(`#${zone.toLowerCase()}-day-night`).html(`
                <div class="time-icon" style="background-image:url(./images/${icon}.png)"></div>
                <div class="timer">${zone}: ${zoneTime.shortString}</div>
            `);
    }
    function filterAlerts(alerts){
        for (let alert of alerts){
            if (alert.rewardTypes[0] === "nitain"){
                nitainActive = true;
                $(`#nitain-alert`).html(`
                <div class="alert-icon" style="background-image:url(./images/nitain.png)"></div>
                <div class="alert-info">${alert.mission.type} | ${alert.mission.node} ${alert.eta}</div>
            `);
            break;
            }else{
                $(`#nitain-alert`).html(`
                <div class="alert-icon""></div>
                <div class="alert-info"></div>
            `);
            nitainActive = false;
            }
            
        };
    }
},10000);

window.setInterval(function(){
        $(`#cetus-wrapper`).addClass("animate");
        setTimeout(function(){ $(`#cetus-wrapper`).removeClass("animate") }, 30000);
    sleep(30000).then(function(){
        $(`#vallis-wrapper`).addClass("animate");
        setTimeout(function(){ $(`#vallis-wrapper`).removeClass("animate") }, 30000);
        sleep(30000).then(function(){
            if(nitainActive){
                $(`#nitain-wrapper`).addClass("animate");
                setTimeout(function(){ $(`#nitain-wrapper`).removeClass("animate") }, 30000);
            }
        });
    });

},360000)

function sleep(ms)
{
    return(
        new Promise(function(resolve, reject)
        {
            setTimeout(function() { resolve(); }, ms);
        })
    );
}