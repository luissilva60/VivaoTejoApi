window.onload = async function() {
    let cais;
    let html;
    var caisGeoJson;
    const api_url='https://cors-anywhere.herokuapp.com/https://vivaotejo.herokuapp.com/api/cais/1'
    async function getCais(){
        const response=await fetch(api_url);
        const data=await response.json ();
        //const { geojson } = data;
        console.log(data);
        console.log(data.geojson[1]);

    }
    getCais();

}

/*function createCaisHTML(cais) {
    return "(cais id)= " + cais.cais_id + ";" +
        "(cais nome)= " + cais.cais_name + ";" +
        "(cais spot)= " + cais.cais_spot;
}

function showCais(id) {
    console.log("setItem->caisId = " + id);
    sessionStorage.setItem("caisId", id);
    window.location = "mapateste.html";
}*/