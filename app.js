function chunk(arr, size) {
    var newArr = [];
    for (var i=0; i<arr.length; i+=size) {
        newArr.push(arr.slice(i, i+size));
    }
    return newArr;
}

(function(){
    var app = angular.module('symphony', []);
    app.controller('scController', ['$http', function($http){
        store = this;
        store.products = [];
        store.final_product = [];
        $http.get('http://sneakpeeq-sites.s3.amazonaws.com/interviews/ce/feeds/store.js').success
        (function (data) {
            for (i in data.products) {
                store.products.push([data.products[i].mainImage.ref,
                    data.products[i].defaultPriceInCents/100, data.products[i].name]);
            }
            // create list of lists of length 3
            store.final_product = chunk(store.products,3);
        });
    }]);
})();
