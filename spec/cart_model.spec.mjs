import CartModel from "../src/CartModel.mjs";
import MockApi from "../src/MockApi.mjs";
import EventEmitter from "../src/EventEmitter.mjs";




const model = new CartModel(new MockApi(), new EventEmitter());
console.log(model)

describe(`CartModel.fetch`, () => {
    it(`получение данных`, () => {
        model.fetch()
        expect(model.list.length).toBeGreaterThan(0);
    });
});

describe(`CartModel.add`, () => {
    it(`ввод данных`, () => {
        let test = model.list.length
        model.add('test_string')
        expect(model.list.length).toBeGreaterThan(test);
    });
});

describe(`CartModel.remove`, () => {
    it(`удаление данных`, () => {
        model.fetch()
        let test = model.list.length
        model.remove(2)
        expect(model.list.length).toBeLessThan(test);
    });
});