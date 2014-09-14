var pp = require('prettyjson');
var _ = require('lodash');
var Q = require('kew');
var mach = require('mach');
var config = require('../config');

var db = config.DB;
var tables = config.tables;

// moneyeyes
var H = require('../H');


function guid() {
    function _p8(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}

var CardController = 
{

// 	function get_cards(key) {
// 	return db
// 		.newSQueryBuilder(tables.cards)
// 		.filterAttributeEquals('key', "2")
// 		.execute()
// 		.then(_.property('result'))
// 		.then(H.map(
// 			    function(card){
// 			        return {
// 			            id: card.key,
// 			            description: card.description,
// 			            name: card.name,
// 			            tags: card.tags,
// 			            children: get_cards(card.key)
// 			        };
// 			    })
// 			    .value()
// 			)
// 		;

// }

	GetChildren: function (id){
		return	db
			.newScanBuilder(tables.cards)
			.filterAttributeContains("child_of", id)
			.execute()
			.then(_.property('result'))
			// .then(
			// 	H.map(
			// 	    function(card){
			// 	        return {
			// 	            id: card.key,
			// 	            description: card.description,
			// 	            name: card.name,
			// 	            tags: card.tags,

			// 	        };
			// 		    }
			// 		)
			// 	    .value()
			// 	)
			.then(mach.json);
	},

	List: function (filters){
		return	db
			.newScanBuilder(tables.cards)
			.execute()
			.then(_.property('result'))
			// .then(
			// 	H.map(
			// 	    function(card){
			// 	        return {
			// 	            id: card.key,
			// 	            description: card.description,
			// 	            name: card.name,
			// 	            tags: card.tags,
			// 	            children: CardController.GetChildren(card.key)
			// 	        };
			// 		    }
			// 		)
			// 	    .value()
			// 	)
			.then(mach.json);
	},

	Delete: function (id){

	},

	UpdateOrCreate: function (params){
		if (!params.contains("id")){
			params.id = guid();
		}

		var builder = db.newUpdateBuilder(tables.cards);
		builder = builder.setHashKey("key", params.id);
		builder = builder.enableUpsert();

		for (var key in params) {
			value = params[key]
			if (key == "id"){ key = "key"; }

			builder = builder.putAttribute(key, value);

		}

		return builder
				.execute()
				.then(_.property('result'))
				.then(mach.json);
	},



}

function CardGet(req){
	return CardController.List(0);
}


function CardGetChildren(req){
	id = req.params.id;
	console.log(id);
	if (id){
		console.log(CardController.GetChildren(id));
		return CardController.GetChildren(id);
	}
	else
	{
		return 404;
	}
}


function CardCount(req){
	return 200;
}


function CardUpVote(req){
	return 200;
}


function CardStar(req){
	return 200;
}


function CardUnstar(req){
	return 200;
}


function CardAddLabel(req){
	return 200;
}


function CardRemoveLabel(req){
	return 200;
}


function CardClearLabels(req){
	return 200;
}


function CardAct(req){
	return 200;
}

function CardCreate(req){
	params = req.params;
	return CardController.UpdateOrCreate(params);
}

function CardUpdate(req){
	return 200;
}


function CardRemove(req){
	return 200;
}




exports.Cards = {
	list: CardGet,
	children: CardGetChildren,
	count: CardCount,
	upvote: CardUpVote,
	star: CardStar,
	unstar: CardUnstar,
	addlabel: CardAddLabel,
	removelabel: CardRemoveLabel,
	clearlabels: CardClearLabels,
	act: CardAct,
	update: CardUpdate,
	remove: CardRemove,
};




