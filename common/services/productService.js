(function () {
    "use strict";

    var productService = function () {

        var calculateMarginPercent = function(price, cost)
        {
            var margin = 0;
            if(price && cost)
            {
                margin = (100 * (price - cost)) / price;
            }
            margin = Math.round(margin);
            return margin;
        };

        var calculateMarginAmount = function (price, cost) {
            var margin = 0;

            if(price && cost)
            {
                margin = price - cost;
            }
            return margin;
        };

        var calculatePriceFromPercent = function (cost, percent)
        {
            var price = cost;

            if(price && cost)
            {
                price = cost + (cost * percent / 100);
                price = Math.round(price * 100) / 100;
            }
            return price;
        };

        var calculatePriceFromAmount = function(cost, amount)
        {
            var price = cost;
            if(cost && amount)
            {
                price = cost + amount;
                price = (Math.round(price * 100)) / 100;
            }
            return price;
        };

        return {
            calculateMarginPercent: calculateMarginPercent,
            calculateMarginAmount: calculateMarginAmount,
            calculatePriceFromPercent: calculatePriceFromPercent,
            calculatePriceFromAmount: calculatePriceFromAmount
        };
    };

    angular
        .module("common.services")
        .factory("productService", productService);
}());