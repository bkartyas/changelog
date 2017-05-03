describe('AutorefreshController', function() {
	beforeEach(module('changelog.controllers'));
	var $controller;

	beforeEach(inject(function(_$controller_){
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$controller = _$controller_;
	}));

	describe('$scope.percent', function() {
		it('initialize percentage to 0', function() {
			var $scope = {};
			var controller = $controller('AutorefreshController', { $scope: $scope, $interval: setInterval, ChangelogApi: null });

			expect( $scope.percent ).toEqual(0);
		});
	});
});

describe('EventListController', function() {
	beforeEach(module('changelog.controllers'));
	var $controller;

	beforeEach(inject(function(_$controller_){
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$controller = _$controller_;
	}));

	describe('$scope.percent', function() {
		it('wait to be percentage more than 10%', function() {
			var $scope = {};
			var loadFn = function () {};
			var successFn = function () {};
			var controller = $controller('EventListController', { $scope: $scope, ChangelogApi: {
				loading: function(loadfn) {
					loadFn = loadfn;
				},
				success: function (successfn) {
					successFn = successfn;
				}
			} });

			expect( $scope.loading ).toEqual(false);

			loadFn();
			expect( $scope.loading ).toEqual(true);


			successFn('testEvents');
			expect( $scope.loading ).toEqual(false);
			expect( $scope.events ).toEqual('testEvents');

		});
	});
});