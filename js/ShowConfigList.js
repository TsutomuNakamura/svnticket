class ShowConfigList {
    constructor() {
        this.configListRoot = document.getElementById("configListRoot");
    }

    connect() {
        this.socket = io.connect('http://localhost:18080');
        this.socket.on("connected", (name) => {});
        this.socket.on("publish", (data) => {
            this.addMessage(data.value);
        });
        this.socket.on("disconnect", () => {});
        return this
    }
    start() {
        this.socket.emit("connected", 'foo');
        return this
    }

    addMessage(msg) {
        var element = document.createElement('div');
        element.innerHTML = new Date().toLocaleTimeString() + ' ' + msg;
        this.configListRoot.appendChild(element);
    }
}
