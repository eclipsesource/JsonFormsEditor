'use strict';

describe('app.tree module', function() {

    beforeEach(module('app.tree'));

    describe('tree controller', function() {

        var $controller;

        beforeEach(inject(function(_$controller_){
            $controller = _$controller_;
        }));

        it('TreeController should be defined', function() {

            var TreeController = $controller('TreeController');
            expect(TreeController).toBeDefined();

        })
    });
});