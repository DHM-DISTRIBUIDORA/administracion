import DomSelector from 'react-native-dom-parser';

type PropsTypes = { key_usuario: string, fecha: string }

const state = {
    url: "https://dhm.servisofts.com/repo/dhm/gpx"
};


export const getGPXDiaUsuario = async ({ key_usuario, fecha }) => {
    return await init(key_usuario, fecha)

}

const init = async (key_usuario, fecha) => {
    let lista = await getLista(key_usuario, fecha);
    if (!lista) return [];
    let json = [];
    for (const file in lista) {
        json = [...json, ...await getGpx(key_usuario, fecha, lista[file])]
    }
    return json;
    //this.setState({data:json})
    //console.log(json);
}

const getLista = (key_usuario, fecha) => {
    var sfecha = fecha.split("-");
    const INSTANCE = this
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        let dia = sfecha[2];
        xhr.open('GET', state.url + "/" + key_usuario + "/" + sfecha[0] + "/" + parseInt(sfecha[1]) + "/" + parseInt(dia) + "/", true);
        xhr.onerror = function () {
            reject()
        }
        xhr.onreadystatechange = function () {
            // Si la solicitud se completó con éxito
            if (xhr.readyState == 4 && xhr.status == 200) {
                // var parser = new DOMParser();

                // var doc = parser.parseFromString(xhr.responseText, 'text/html');
                var doc = new DomSelector(xhr.responseText);
                var links = doc.getElementsByTagName('a');
                var resp = [];
                for (var i = 0; i < links.length; i++) {
                    if (i > 0) {
                        resp.push(links[i]?.attributes?.href);
                    }
                }
                resolve(resp);
                return;
            }

        };
        xhr.send();
    });

}


const getGpx = (key_usuario, fecha, file) => {
    var sfecha = fecha.split("-");

    //var lista = this.getLista("04759652-b279-40ea-817d-dbfbfc39ffa5", "2023-10-26");

    const INSTANCE = this
    return new Promise(resolve => {
        var xhr = new XMLHttpRequest();
        let dia = sfecha[2];
        xhr.open('GET', state.url + "/" + key_usuario + "/" + sfecha[0] + "/" + parseInt(sfecha[1]) + "/" + parseInt(dia) + "/" + file, true);
        xhr.onreadystatechange = function () {
            // Si la solicitud se completó con éxito
            if (xhr.readyState == 4 && xhr.status == 200) {
                var xmlDoc = new DomSelector(xhr.responseText);
                // console.log(xmlDoc)
                var json = [];
                xmlDoc.getElementsByTagName("gpx")[0].children.map((child) => {
                    child.attributes["fecha_on"] = child.firstChild.firstChild.text;

                    json.push(child.attributes);
                })
                resolve(json)
            }
        };
        xhr.send();
    });
}
