import {getPageParam, getUrlParam, updateUrlParams} from "./utils"; // Replace 'your-module' with the actual module path

describe("URL Parameter Utilities", () => {
    beforeEach(() => {
        // Mock the window.location object
        delete global.window.location;
        global.window = Object.create(window);
        global.window.location = {
            search: "",
            pathname: "/example",
            replaceState: jest.fn(),
        };
        jest.spyOn(window.history, "replaceState").mockImplementation(() => {});

    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("updateUrlParams", () => {
        it("should update the URL parameters correctly", () => {
            global.window.location.search = "?param1=value1";

            updateUrlParams({param2: "value2", param3: null});

            const expectedUrl = "/example?param1=value1&param2=value2";
            expect(global.window.history.replaceState).toHaveBeenCalledWith(null, "", expectedUrl);
        });

        it("should remove URL parameters with null or undefined values", () => {
            global.window.location.search = "?param1=value1&param2=value2";

            updateUrlParams({param1: null, param2: undefined});

            const expectedUrl = "/example";
            expect(global.window.history.replaceState).toHaveBeenCalledWith(null, "", expectedUrl);
        });
    });

    describe("getUrlParam", () => {
        it("should return the value of the specified URL parameter", () => {
            global.window.location.search = "?param1=value1&param2=value2";

            const result = getUrlParam("param1");

            expect(result).toEqual("value1");
        });

        it("should return null for non-existing URL parameters", () => {
            global.window.location.search = "";

            const result = getUrlParam("param1");

            expect(result).toBeNull();
        });
    });

    describe("getPageParam", () => {
        it("should return the parsed integer value of the \"page\" URL parameter", () => {
            global.window.location.search = "?page=5";

            const result = getPageParam();

            expect(result).toEqual(5);
        });

        it("should default to 1 when \"page\" URL parameter is not provided", () => {
            global.window.location.search = "";

            const result = getPageParam();

            expect(result).toEqual(1);
        });

        it("should return NaN when \"page\" URL parameter is not a valid integer", () => {
            global.window.location.search = "?page=abc";

            const result = getPageParam();

            expect(result).toBeNaN();
        });
    });
});
