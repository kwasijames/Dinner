//////////////////////////////
// View a single Dish model //
/////////////////////////////

var DishView = Backbone.View.extend({
	tagName: "div", // set the view to a new div
	className: "dishes col-sm-4",
	template: _.template($("#menu-list-template").html()),

	events: {

		"click #editButton": "editDish",
		"click #deleteButton": "deleteDish",
		"click #updateButton": "updateDish"
	},

	///////////////////////////////////////////////////////////
	//  UpdateDish update the edit fields and the database  //
	/////////////////////////////////////////////////////////

	updateDish: function() {
		// grab name, image and price from the edit form
		var newName = this.$("#newName" + this.model.id).val();
		var newImage_url = this.$("#newImage_url" + this.model.id).val();
		var newPrice = this.$("#newPrice" + this.model.id).val();
		// update the model with the above values
		this.model.set({name: newName, image_url: newImage_url, price: newPrice});

		// save the model to the database and trigger sync
		this.model.save();

	},

	///////////////////////////////////
	// editDish renders an edit form //
	//////////////////////////////////

	editDish: function(){
		this.$(".menu").hide();
		this.$(".editForm").show();
	},

	///////////////////////////////////////////////////////////////
	// deleteDish deletes dish from database and remove dish from page //
	//////////////////////////////////////////////////////////////
	
	deleteDish: function() {
		this.model.destroy();
		this.remove();
	},

	render: function() {
		// render the model associated with this view
		this.$el.html(this.template({
			dish: this.model.toJSON()
		}));

		//$(this.el).html("<div id="id1" class="nice"> Some stuff </div>");

		return this;
	}

}); // end of DishView

///////////////////////////////////////////////
// Menu view to render a collecton of dishes //
//////////////////////////////////////////////

var MenuView = Backbone.View.extend({
	el: ".menu", // attach to the div with a class of menu

	initialize: function() {
		this.listenTo(this.collection, "sync remove", this.render);
	},

	// render the list of dishes
	render: function() {
		var menu = this.$el;
		//menu.addClass("dishes");
		menu.html("");
		// iterate over each element in the collection and render a DishView
		this.collection.each(function(dish) {
			menu.append(new DishView({
				model: dish
			}).render().$el);
		});

		return this;
	}
}); // end of MenuView

//////////////////////////
// add dish to the menu //
/////////////////////////

var AddDishView = Backbone.View.extend({
	el: ".add-dish-form",

	//listen for the edit-dish-form
	events: {
		"click button.add-dish": "saveDish"
	},

	// create a new dish with data from form
	saveDish: function() {

		var nameField = this.$("#newDishName");
		var imageField = this.$("#newDishImageUrl");
		var priceField = this.$("#newDishPrice");
		var name = nameField.val();
		var image_url = imageField.val();
		var price = priceField.val();

		menu.create({
			name: name,
			image_url: image_url,
			price: price
		});

		// resets text fields
		nameField.val("");
		imageField.val("");
		priceField.val("");
		//$(".menu").html("");
	}

}); // end of AddDishView



var dishView = new DishView({
	collection: menu
});
var menuView = new MenuView({
	collection: menu
});
var addDishView = new AddDishView({
	collection: menu
});