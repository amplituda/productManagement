(function () {
    "use strict";

    var priceAnalytics = function ($scope, products, productService, $filter) {

        $scope.title = "Price Analytics";



        // Computed property
        for (var i = 0; i < products.length; i++) {
            products[i].marginPercent =
                productService.calculateMarginPercent(products[i].price,
                                                        products[i].cost);
            products[i].marginAmount =
                productService.calculateMarginAmount(products[i].price,
                                                        products[i].cost);
        }

        //$filter is a builtin service to filter data.
        //here I am ordering the data
        var orderedProductsAmount = $filter("orderBy")(products, "marginAmount");
        //here I am limiting the data and only returning top 5 rows
        var filteredProductsAmount = $filter("limitTo")(orderedProductsAmount, 5);

        //loops through the products and populates an arrays containing x, y coordinates
        //x=> productname
        //y=> cost, price, margin amount
        var chartDataAmount = [];

        for (i = 0; i < filteredProductsAmount.length; i++) {
            chartDataAmount.push({
                x: filteredProductsAmount[i].productName,
                y: [filteredProductsAmount[i].cost,
                    filteredProductsAmount[i].price,
                    filteredProductsAmount[i].marginAmount]
            });
        }

        $scope.dataAmount = {
            series: ["Cost", "Price", "Margin Amount"],
            data: chartDataAmount
        };




        //ac-config data
        $scope.configAmount = {
            title: "Top $ Margin Products",
            tooltips: true,
            labels: false,
            mouseover: function () { },
            mouseout: function () { },
            click: function () { },
            legend: {
                display: true,
                position: "right"
            }
        };

        var orderedProductsPercent = $filter("orderBy")(products, "marginPercent");
        var filteredProductsPercent = $filter("limitTo")(orderedProductsPercent, 5);

        var chartDataPercent = [];
        for ( i = 0; i < filteredProductsPercent.length; i++) {
            chartDataPercent.push({
                x: filteredProductsPercent[i].productName,
                y: [filteredProductsPercent[i].marginPercent]
            });
        }

        $scope.dataPercent = {
            series: ["Margin %"],
            data: chartDataPercent
        };

        $scope.configPercent = {
            title: "Top % Margin Products",
            tooltips: true,
            labels: false,
            mouseover: function () { },
            mouseout: function () { },
            click: function () { },
            legend: {
                display: true,
                position: "right"
            }
        };
    };

    angular.module("productManagement")
            .controller("PriceAnalyticsCtrl",
                ["$scope", "products", "productService", "$filter", priceAnalytics]);
}());