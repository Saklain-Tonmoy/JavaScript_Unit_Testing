const fs = require("fs");
const u = require("umbrellajs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

jest.dontMock("fs");

json = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../language.txt")));

describe("fetch list", function () {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
  });

  // Specifying JEST timeouts for Asynchronous Callback. Default is 5000ms.
  beforeAll(async () => {
    jest.setTimeout(10000);
  });

  afterEach(() => {
    // restore the original func after test
    jest.resetModules();
    fetch.resetMocks();
  });


  it("get same items from json", function (done) {
    fetch.mockResponse(JSON.stringify(json));
    const { getItem } = require("../scripts/main.js");

    getItem()
      .then((res) => {
        console.log(res);
        expect(res.length).toEqual(json.length);
      })
      .catch((err) => console.log(err));
      done();
  });

  it('show text if failure', function (done) {
      fetch.mockReject(new Error('Cannot found'));
      const {getItem} = require('../scripts/main.js');

      getItem()
      .catch(err => console.log(err));
      done();
  });
});
