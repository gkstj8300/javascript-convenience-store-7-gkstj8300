import ConvenienceStoreContoller from "./controller/ConvenienceStoreContoller.js";

class App {
    async run() {
        await new ConvenienceStoreContoller().convenienceStoreRun();
    }
}

export default App;
