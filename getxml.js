var xhttp = false;
const shiftArray = ["1st", "2nd"];
const stageArray = ["HV-FRF2", "HV4-ASSY-B", "HV5-BBOND1",
                    "HV5-ASSY-F", "HV-FSBOND1", "HV6QX-INI",
                    "HV6QX-PBI", "HV-CLEAN", "HV-ENCAPQC", 
                    "HV-ENCAP2", "HV-SOLDER", "HV5-LIDTAC",
                    "HV6QX-FIN", "HV-UNDERFL", "HV-ROUTER",
                    "HV-FINQC", "HV-FINLQC"]
function xRequest(stage, part, url) {
    xhttp = false;

    xhttp = new XMLHttpRequest();

    if (!xhttp) {
        alert('Cannot create an XMLHTTP instance');
        return false;
    }
    xhttp.onload = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            getXml(stage, part, this);
        }
    };
    xhttp.open('GET', url + ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime(), true);
    xhttp.send(null);
}
var plan = 200;
document.getElementById(stageArray[0] + "Plan").innerHTML = plan;
function getXml(stage, part, xml) {
    var xmldoc = xml.responseXML;
    var partCount = 0;   
    stageNode = xmldoc.getElementsByTagName("STAGE");
    partNode = xmldoc.getElementsByTagName("PARTNAME");
    reworkNode = xmldoc.getElementsByTagName("REWORKCODES");
    for (let i = 0; i < stageNode.length; i++) {
        let stageNodeValue = stageNode[i].childNodes[0].textContent;
        let partNodeValue = partNode[i].childNodes[0].textContent;
        if (partNodeValue === part && stageNodeValue === stage) { 
            partCount++;            
        }
    }  
    countReworkCodes(stage, reworkNode);
    var effPercentage = partCount / plan * 100;
    document.getElementById(stage + "Eff").innerHTML = effPercentage.toFixed(2) + "%";
    document.getElementById(stage).innerHTML = partCount;
    
}
function countReworkCodes(stage, nodeArg) {
    let reworkCount = 0;
    for (let i = 0; i < nodeArg.length; i++) {
        let reworkNodeValue = reworkNode[i].childNodes[0].nodeValue;
        if (reworkNodeValue) {
            reworkCount++;
            // while (stage) {
            //     reworkCount--;
            // }
        }
        
        document.getElementById(stage + "Rejects").innerHTML = reworkCount;
    }
}


xRequest(stageArray[0], '100088507', 'EfficiencyDashboard.xml');
