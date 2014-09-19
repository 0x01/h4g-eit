# Amsterdam 3rd Place Winner

Break down problem earth into bite-sized actionable chunks that anyone
can work on.
This app will help you come to action, find a (local) action you can do.

![logo](https://s3.amazonaws.com/uploads.hipchat.com/86368/1207634/gYSrpTdPiPwtiL1/FINAL.png)

[earthissuetracker.com](http://earthissuetracker.com) (Prototype)

[Pitch + Demo](https://youtu.be/srji6umPrAQ) –
[Slides](http://earthissuetracker.com/slides1.pdf) –
[Screenshots](https://geekli.st/wires/we-built-earth-issue-tracker-at-geeklist-hack4good-06-in-amsterdam-and-won-3rd-place)

 (after the fact recording due to technical issues; 6 minutes, fits in
 three when not tired)

## Other Pitches/Demo's

- [Amsterdam Local
  Judgement](https://www.youtube.com/watch?v=KLQS_MdfdJ8#t=5m) (Marleen
  + Youri; **3rd place**!)
  - [Global Judgement
	Session](https://www.youtube.com/watch?v=LXV5L6TIeuU#t=20m)
	(computer crashed; Jelle)

## Team

We had a great team, very impressive contributions by everyone.
Every team member contributed discussions which led to our final
concept.
Also below is just an indication of who did what.

- Jelle Herold [jelle@defekt.nl](mailto:jelle@defekt.nl)
  [@statebox](https://twitter.com/statebox) -- team lead, backend
  node.js, frontend angular.js
  - Samy Arous -- backend python, backend node.js
  - Jean-Pierre Pequito
	[@hellojeanpierre](https://twitter.com/hellojeanpierre)
	[https://geekli.st/samnadine](https://geekli.st/samnadine) --
	frontend UX + LESS implementation
	- Ehtimaad Rais [geeklist](https://geekli.st/ehtimaad) -- social
	  media aspects & presentations
	  - Marleen van der Zanden
		[marleenzanden@gmail.com](mailto:marleenzanden@gmail.com) --
		design
		- Youri Broekhuizen
		  [geeklist](https://geekli.st/youribroekhuizen) -- frontend
		  HTML
		  - Daniel Quinn (left project)
			[@searchingfortao](https://twitter.com/searchingfortao) --
			backend python

## Some older bits

- [draft
  presentation.pdf](https://s3.amazonaws.com/uploads.hipchat.com/86368/1208451/qHadurCBW1DOmPG/earth%20issue%20trackers.pdf)
  - [Initial rough
	notes](https://github.com/0x01/h4g-eit-django/blob/master/README.md)
	(old)
	- Abandoned django codebase
	  [here](https://github.com/0x01/h4g-eit-django)

# Concept

We would like to combine top-to-bottom and bottom-to-top approaches in
problem solving.
(inspired by the mathematical concept of a Galois Connection)

Roughly we think NGO's, scientists and activists use a more
'top-to-bottom' approach.  Whereas interested civilians wanting to get
into action would be more bottom-to-top.

We imagine our system helping both parties to make their efforts more
efficient.

The information collected by our system would help with:

- Coordinating and timing campaigns around current public interests.
- Cataloging and mapping current global and local issues
- Capturing motivation created by a campaign, by sending people to
  actionable cards in your campaign (short url: eit.re/my-issue)
- Help people find something local they can do, and make sure it's most
  efficient use of their time (replace lightbulb v.s. fly less)

What is currently worked out is only the 'bottom-up' part of this
application.  We focussed on the UX of it and this is targeted at
everyone.

We imagine that later a moderation and analysis site will be added to it
(reddit+stackoverflow - like).

## cards

Our app is modelled around cards that advertise topics, issues or
actions.

They can be related, in particular cards can have children (smaller
issues).
This gives them a tree like structure so you can navigate up or down.
The leafs of this 'networked forest' would preferably be actions.

### Specific cards

We want to make "coming into action" as easy as possible.

We hope to make special cards for messaging legislators on twitter,
participating in a rally (and get notified), signing petition on avaaz,
etc.

Which specialised cards are needed will become clearer when our database
is more filled.


## starring a card

This expresses interest in the topic, you will receive updates on the
topic.

An event might also be scheduled to happen in the future, one can get
notified of it this way.


## breaking down an issue/topic

If a card has no children (and it's not an action) then somebody can
easily create a child card.

This way everyone can help break down problems.

# Data analysis

The model is very clear and simple. We can do a lot of data analysis on
it in the future:

- time spend on cards,
- paths taken in network,
- topological structure of tags
- full text analysis
- match twitter profiles and cards
- infer connections between cards
- etc.

Without getting into this too much, using data analysis and machine
learning methods we can go a long way in
optimising the experience of working on project Safe the Planet, for
everyone.

# Further questions

## Who get's to break down problems

Anyone can do it.

## How do you avoid showing 1000 actions?

We will rank them on stars and filter by location, but with more data
analytics we can narrow this down even further
and specialise it to what we think you would like to see (based on other
starred cards, who your friends/followers are
and what they starred, etc).

## Why is your page just an image?

Because we had to last minute rewrite a lot of things, given the time
limit we felt that this was the best way to present our concept.

## This sounds like a lot of work, 

The hard problem here is not the programming part, but the conceptual
and user experience/interface part. We managed to involve different
viewpoints and it is my personal conviction that we arrived at something
simple that captures the essence of the system. Now we just need to
implement it. We didn't work on it anymore / fix it, because we might be
disqualified, also I didn't have time ;-).

Furthermore, the technical architecture is setup that we can scale the
system to many users and start collecting data and slowly iterate and
optimise the system.

We will be using Elasticsearch to do the first statistical tricks; ES is
very powerful so we will be able to achieve a lot with the current
system.


# Installation/develop

Setup, no bullshit.

	npm i
	bower i

Obtain `settings.json` (e.g. from me, it has credentials)

Run it

	node server.js

Or better, use auto reload

	gulp develop

# Deploy/setup

debian setup (want to build node + node-modules)

	apt get install build-essential

Also restore sanity

	apt get install vim htop dtach mosh aptitude

run from /opt as system user eit

	mkdir /opt/eit
	adduser --system --home /opt/eit --disabled-login eit
	su -s /bin/bash -l eit

# install node + nvm using git

	mkdir {git,local}
	git clone git://github.com/joyent/node.git git/node
	git clone git://github.com/isaacs/npm.git git/npm
	git clone git://github.com/0x01/h4g-eit git/eit

	cd git/node
	git tag|grep v0.10
	git checkout v0.10.31
	./configure --prefix=/opt/eit/local/
	make install

# also

	# make sure next time we login we have node
	echo "export PATH=~/local/bin:\$PATH" >> ~/.bashrc
	# and also now
	source ~/.bashrc

# now npm

	cd ../npm
	PATH=~/local/bin/:$PATH make install # or `make link` for bleeding edge
	npm i -g npm

# OK now build eit

	cd ~/git/eit
	npm i
	npm i -g bower
	bower i
	npm i -g gulp
	gulp develop
