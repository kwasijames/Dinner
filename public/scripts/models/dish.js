// Represents a dish on the Menu
var Dish = Backbone.Model.extend({
	urlRoot: "/dishes",
	initialize: function(){
		console.log("A dish is added to Menu");
		this.on('change: name', function(){
			console.log("Made a change to dish");
		});
	},

	defaults: {
		name: "",
		image_url: "",
		price: "",
	}
});