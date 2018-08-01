window.onload = function() { 
var xhttp = false;
const shiftArray = ["1st", "2nd"];
const stageArray = ["HV-FRF2", "HV4-ASSY-B", "HV5-BBOND1",
                    "HV5-ASSY-F", "HV-FSBOND1", "HV6QX-INI",
                    "HV6QX-PBI", "HV-CLEAN", "HV-ENCAPQC", 
                    "HV-ENCAP2", "HV-SOLDER", "HV5-LIDTAC",
                    "HV6QX-FIN", "HV-UNDERFL", "HV-ROUTER",
                    "HV-FINQC", "HV-FINLQC"]
function xRequest(stage, url) {
    xhttp = false;

    xhttp = new XMLHttpRequest();

    if (!xhttp) {
        alert('Cannot create an XMLHTTP instance');
        return false;
    }
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            getXml(stage, this);
        }
    };
    xhttp.open('GET', url + ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime(), true);
    xhttp.send(null);
}
xRequest(stageArray[2], 'EfficiencyDashboard.xml');
function getXml(stage, xml) {
    var xmldoc = xml.responseXML;
    var partCount = 0;   
    hourNode = xmldoc.getElementsByTagName("HOUR");    
    titleNode = xmldoc.getElementsByTagName("TITLE");
    stageNode = xmldoc.getElementsByTagName("STAGE");
    shiftNode = xmldoc.getElementsByTagName("SHIFT");
    for (let i = 0; i < hourNode.length; i++) {
        let hourNodeValue = hourNode[i].childNodes[0].nodeValue;
        let titleNodeValue = titleNode[i].childNodes[0].nodeValue;
        let stageNodeValue = stageNode[i].childNodes[0].nodeValue;
        let shiftNodeValue = shiftNode[i].childNodes[0].nodeValue;
    if (hourNodeValue == 3 && shiftNodeValue === "1st" && stageNodeValue === stage) { 
            partCount++;
        }
    }      
    document.getElementById("RFAActual").innerHTML = partCount;
}
}
