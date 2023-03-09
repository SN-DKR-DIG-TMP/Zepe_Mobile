"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var utils_service_1 = require("./utils.service");
describe('UtilsService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(utils_service_1.UtilsService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=utils.service.spec.js.map
