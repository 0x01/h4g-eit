var pp = require('prettyjson');
var _ = require('lodash');
var Q = require('kew');
var mach = require('mach');
var config = require('../config');

var db = config.DB;
var tables = config.tables;

// moneyeyes
var H = require('../H');

function CardGet(req){
	return 200
}


function CardGetChildren(req){
	return 200;
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
	return 200;
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
	create: CardCreate,
	update: CardUpdate,
	remove: CardRemove,
};




