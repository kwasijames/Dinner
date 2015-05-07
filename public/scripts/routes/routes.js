// Represents routes
var DishRoutes = Backbone.Router.extend({
	routes: {
		"": "allDishes",
		"new": "addDish"
	}
})

var dishRoutes = new DishRoutes();

dishRoutes.on('route:allDishes', function() {
	$(".add-dish-form").hide();
	$(".menu").show();
	//menuView.render();
}); // listen for allDishes route

dishRoutes.on('route:addDish', function() {
	$(".menu").hide();
	$(".add-dish-form").show();
	//addDishView.render();
	//$(".menu").html("");
}); // listen for editDish route

Backbone.history.start(); // start listening to the url