var pp = require('prettyjson');
var _ = require('lodash');
var Q = require('kew');
var mach = require('mach');
var config = require('../config');

var db = config.DB;
var tables = config.tables;

// moneyeyes
var H = require('../H');

function CardGet() {
	return Q.fcall(function(){
		return [
			{
			id: 1,
			name: 'foo',
			description: 'lorem'
		}, {
			id: 2,
			name: 'bar',
			description: 'baaz'
		}
		];
	}).then(mach.json);
}


function CardGetChildren(){
	return 200;
}


function CardCount(){
	return 200;
}


function CardUpVote(){
	return 200;
}


function CardStar(){
	return 200;
}


function CardUnstar(){
	return 200;
}


function CardAddLabel(){
	return 200;
}


function CardRemoveLabel(){
	return 200;
}


function CardClearLabels(){
	return 200;
}


function CardAct(){
	return 200;
}

function CardCreate(){
	return 200;
}

function CardUpdate(){
	return 200;
}


function CardRemove(){
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




