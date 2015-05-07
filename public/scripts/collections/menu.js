// Represents a colection of dishes

var Menu = Backbone.Collection.extend({
	model: Dish,
	url: "/dishes"
});

var menu = new Menu();
menu.fetch();