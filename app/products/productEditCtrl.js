(function() {
	'use strict';

	angular.module('productManagement')
		.controller('ProductEditCtrl', ['product',
			"productService", '$state', ProductEditCtrl
		]);

	function ProductEditCtrl(product, productService,  $state) {
		var vm = this;

        vm.product = product;
		vm.priceOption = "percent";

		vm.marginPercent = function () {
            return productService.calculateMarginPercent(vm.product.price, vm.product.cost);
        };

        /* Calculate the price based on a markup */
        vm.calculatePrice = function () {
            var price = 0;

            if (vm.priceOption == 'amount') {
                price = productService.calculatePriceFromAmount(
                    vm.product.cost, vm.markupAmount);
            }

            if (vm.priceOption == 'percent') {
                price = productService.calculatePriceFromPercent(
                    vm.product.cost, vm.markupPercent);
            }
            vm.product.price = price;
        };

		if (vm.product && vm.product.productId) {
			vm.title = 'Edit: ' + vm.product.productName;
		} else {
			vm.title = 'New Product';
		}

        // open calendar
		vm.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			vm.opened = !vm.opened;
		};

		vm.submit = function(valid) {
			if (valid)
            {
                vm.product.$save(function (data) {
                    toastr.success("Saved Successfully!!!");
                });
            }
            else
            {
                alert("Please fix the error!!");
            }
		};

		vm.cancel = function() {
			$state.go('productList');
		};

		//Search
		vm.addTags = function(tags) {
			if (tags) {
				var array = tags.split(',');
				vm.product.tags = vm.product.tags ? vm.product.tags.concat(array) : array;
				vm.newTags = "";
			} else {
				alert("Please enter one or more tags separated by commas");
			}
		};

		vm.removeTag = function  (idx) {
			vm.product.tags.splice(idx, 1);
		};
	}
}());