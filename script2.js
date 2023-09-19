var velgenEl = document.getElementById("velgen")
var velgEnArr = [];
var a = 0;
function velgenstasjon() {
    var stasjonInputel = document.getElementById("inputStasjon");
    fetch(`https://api.entur.io/geocoder/v1/autocomplete?text=${stasjonInputel.value}`, {
            headers: {
                "ET-Client-Name": "alsta-bussen",
            },
        })
        .then(response => response.json())
        .then(data => {
            for (x = 0; x < data.features.length; x++) {
                if (data.features[x].properties.id.includes("NSR:StopPlace")) {
                    a++
                    var stasjonspelement = document.createElement('p');
                    var stasjonsbutton = document.createElement('button');
                    stasjonspelement.className = "stasjonspelement";
                    stasjonsbutton.className = "stasjonsbutton";
                    stasjonsbutton.setAttribute("id", `${a}`)
                    stasjonsbutton.setAttribute("onclick", "buttonclicked(this.id)")
                    stasjonspelement.textContent = data.features[x].properties.name + ", " + data.features[x].properties.locality;
                    var velgEnArrel = data.features[x].properties.id;
                    stasjonsbutton.textContent = "Velg"
                    stasjonspelement.appendChild(stasjonsbutton);
                    velgenEl.appendChild(stasjonspelement)
                    velgEnArr.push(velgEnArrel);
                    // localStorage.setItem("ID", stasjonsID);
                    // window.location.replace("avganger.html")
                }
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            console.log("Error fetching data.");
        });
    }
function buttonclicked(clicked_id) {
    localStorage.setItem("ID", velgEnArr[clicked_id - 1])
    window.location.replace("avganger.html");
};