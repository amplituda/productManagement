(function(){
	'use strict';

	/**
	* common.services Module
	*
	* Description
	*/
	angular
		.module('common.services')
		.factory('productResource',
			['$resource', function ($resource) {
				return $resource('/api/products/:productId');
			}]);
}());