import SSocket from "servisofts-socket"

export default {
    tbcli: (k: String) => SSocket.api.root + "tbcli/" + k
}