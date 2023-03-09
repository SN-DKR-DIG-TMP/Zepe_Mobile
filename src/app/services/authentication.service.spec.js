"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var authentication_service_1 = require("./authentication.service");
describe('AuthenticationService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(authentication_service_1.AuthenticationService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=authentication.service.spec.js.map