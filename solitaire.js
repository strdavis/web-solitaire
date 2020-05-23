/*
* MIT License
*
* Copyright (c) 2020 Spencer Davis
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/




// Javascript solitaire.




// Load images.
const CARD_IMAGES = new Array(52).fill(null).map(()=> (new Image()));
const DECK_RESET                = new Image();
const CARD_BACK                 = new Image();
const COLUMN_MARKER           	= new Image();
const WIN_PILE_MARKER_SPADES    = new Image();
const WIN_PILE_MARKER_CLUBS     = new Image();
const WIN_PILE_MARKER_HEARTS    = new Image();
const WIN_PILE_MARKER_DIAMONDS  = new Image();

CARD_IMAGES[0].src	= 'images/cards/aceSpades.png';
CARD_IMAGES[1].src  	= 'images/cards/2Spades.png'
CARD_IMAGES[2].src  	= 'images/cards/3Spades.png';
CARD_IMAGES[3].src  	= 'images/cards/4Spades.png';
CARD_IMAGES[4].src  	= 'images/cards/5Spades.png';
CARD_IMAGES[5].src  	= 'images/cards/6Spades.png';
CARD_IMAGES[6].src      = 'images/cards/7Spades.png';
CARD_IMAGES[7].src  	= 'images/cards/8Spades.png';
CARD_IMAGES[8].src  	= 'images/cards/9Spades.png';
CARD_IMAGES[9].src  	= 'images/cards/10Spades.png';
CARD_IMAGES[10].src 	= 'images/cards/jackSpades.png';
CARD_IMAGES[11].src 	= 'images/cards/queenSpades.png';
CARD_IMAGES[12].src 	= 'images/cards/kingSpades.png';
CARD_IMAGES[13].src 	= 'images/cards/aceClubs.png';
CARD_IMAGES[14].src 	= 'images/cards/2Clubs.png';
CARD_IMAGES[15].src 	= 'images/cards/3Clubs.png';
CARD_IMAGES[16].src 	= 'images/cards/4Clubs.png';
CARD_IMAGES[17].src 	= 'images/cards/5Clubs.png';
CARD_IMAGES[18].src 	= 'images/cards/6Clubs.png';
CARD_IMAGES[19].src 	= 'images/cards/7Clubs.png';
CARD_IMAGES[20].src 	= 'images/cards/8Clubs.png';
CARD_IMAGES[21].src 	= 'images/cards/9Clubs.png';
CARD_IMAGES[22].src 	= 'images/cards/10Clubs.png';
CARD_IMAGES[23].src 	= 'images/cards/jackClubs.png';
CARD_IMAGES[24].src 	= 'images/cards/queenClubs.png';
CARD_IMAGES[25].src 	= 'images/cards/kingClubs.png';
CARD_IMAGES[26].src 	= 'images/cards/aceHearts.png';
CARD_IMAGES[27].src 	= 'images/cards/2Hearts.png';
CARD_IMAGES[28].src 	= 'images/cards/3Hearts.png';
CARD_IMAGES[29].src 	= 'images/cards/4Hearts.png';
CARD_IMAGES[30].src 	= 'images/cards/5Hearts.png';
CARD_IMAGES[31].src 	= 'images/cards/6Hearts.png';
CARD_IMAGES[32].src 	= 'images/cards/7Hearts.png';
CARD_IMAGES[33].src 	= 'images/cards/8Hearts.png';
CARD_IMAGES[34].src     = 'images/cards/9Hearts.png';
CARD_IMAGES[35].src 	= 'images/cards/10Hearts.png';
CARD_IMAGES[36].src 	= 'images/cards/jackHearts.png';
CARD_IMAGES[37].src 	= 'images/cards/queenHearts.png';
CARD_IMAGES[38].src 	= 'images/cards/kingHearts.png';
CARD_IMAGES[39].src 	= 'images/cards/aceDiamonds.png';
CARD_IMAGES[40].src 	= 'images/cards/2Diamonds.png';
CARD_IMAGES[41].src 	= 'images/cards/3Diamonds.png';
CARD_IMAGES[42].src 	= 'images/cards/4Diamonds.png';
CARD_IMAGES[43].src 	= 'images/cards/5Diamonds.png';
CARD_IMAGES[44].src 	= 'images/cards/6Diamonds.png';
CARD_IMAGES[45].src 	= 'images/cards/7Diamonds.png';
CARD_IMAGES[46].src 	= 'images/cards/8Diamonds.png';
CARD_IMAGES[47].src 	= 'images/cards/9Diamonds.png';
CARD_IMAGES[48].src 	= 'images/cards/10Diamonds.png';
CARD_IMAGES[49].src 	= 'images/cards/jackDiamonds.png';
CARD_IMAGES[50].src 	= 'images/cards/queenDiamonds.png';
CARD_IMAGES[51].src 	= 'images/cards/kingDiamonds.png';

DECK_RESET.src               	= 'images/misc/deckReset.png';
CARD_BACK.src                	= 'images/misc/cardBackPattern1.png';
COLUMN_MARKER.src           	= 'images/misc/emptyCardPile.png';
WIN_PILE_MARKER_SPADES.src     	= 'images/misc/emptyCardPileSpades.png';
WIN_PILE_MARKER_CLUBS.src      	= 'images/misc/emptyCardPileClubs.png';
WIN_PILE_MARKER_HEARTS.src     	= 'images/misc/emptyCardPileHearts.png';
WIN_PILE_MARKER_DIAMONDS.src   	= 'images/misc/emptyCardPileDiamonds.png';




// Globals
let canvas = document.getElementById("tttCanvas");
let context = canvas.getContext("2d");

const CANVAS_WIDTH = context.canvas.clientWidth;
const CANVAS_HEIGHT = context.canvas.clientHeight;

const SPADES 		= 0;
const CLUBS 		= 1;
const HEARTS 		= 2;
const DIAMONDS 		= 3;
const BLACK 		= 0;
const RED 		= 1;
const FACE_DOWN 	= 0;
const FACE_UP		= 1;
const SINGLE_DEAL 	= 0;
const TRIPLE_DEAL 	= 1;
const CARD_WIDTH 	= 90;
const CARD_HEIGHT       = 135;

const FACE_DOWN_CARD_OFFSET 	= 5;
const FACE_UP_CARD_OFFSET 	= 20;
const DEAL_PILE_CARD_OFFSET 	= 25;
const DROP_THRESHOLD		= 30;

var deck 	= null;
var dealPile 	= null;
var winPiles	= null;
var columns	= null;
var locations 	= null;
var hand 	= null;
var dealType	= null;




// Prototypes.
function Card(value, suit, faceImage){
    this.value = value;
    this.suit = suit;
    this.faceImage = faceImage;
    this.backImage = CARD_BACK;
    this.x = 0;
    this.y = 0;
    this.w = CARD_WIDTH;
    this.h = CARD_HEIGHT;
    this.orientation = FACE_UP;

    if (suit == SPADES || suit == CLUBS) { this.colour = BLACK; }
    if (suit == HEARTS || suit == DIAMONDS) { this.colour = RED; }
}




Card.prototype.detectClicks = function(){
    if (hand.x > this.x &&
        hand.y > this.y &&
	hand.x < this.x + this.w &&
	hand.y < this.y + this.h){
	    hand.setDragOffset(this.x - hand.x, this.y - hand.y);
	    return true;
    }
    else{
	return false;
    }	
}




Card.prototype.draw = function(){
    if (this.orientation == FACE_UP){
	context.drawImage(this.faceImage, this.x, this.y, this.w, this.h);
    }
    else{
	context.drawImage(this.backImage, this.x, this.y, this.w, this.h);
    }
}




Card.prototype.setPos = function(x, y){
    this.x = x;
    this.y = y;
}




Card.prototype.setOrientation = function(orientation){
    this.orientation = orientation;
}




function Pile(x = 0, y = 0, markerImage = null){
    Array.call(this);

    this.x = x;
    this.y = y;
    this.anchorX = x;
    this.anchorY = y;
    this.markerW = CARD_WIDTH;
    this.markerH = CARD_HEIGHT;
    this.markerImage = markerImage;
}
Pile.prototype = new Array();




Pile.prototype.detectClicks = function(){
    if (this.length > 0){
	if (this[this.length - 1].detectClicks()){
	    return this.length - 1;
	}
    }
    
    return -1;
}




Pile.prototype.detectDrops = function(card){
    var dropDistanceX = Math.abs(this.anchorX - card.x);
    var dropDistanceY = Math.abs(this.anchorY - card.y);

    if (dropDistanceX < DROP_THRESHOLD && dropDistanceY < DROP_THRESHOLD){
	return true;
    }
    else{
	return false;
    }
}




Pile.prototype.validateDrop = function(card){
    if (this.length > 0){
	var targetCard = this[this.length - 1];

	if (targetCard.value != card.value + 1){
            return false;
	}

	if (targetCard.colour == card.colour){
	    return false;
	}
    }

    return true;
}




Pile.prototype.push = function(cards, orientation = FACE_UP){
    for (var i = 0; i < cards.length; i++){
    var card = cards[i];

    card.setOrientation(orientation);
    card.setPos(this.anchorX, this.anchorY);

    Array.prototype.push.call(this, card);
    }
}




Pile.prototype.pop = function(){
    var card = Array.prototype.pop.call(this);

    return [card];
}




Pile.prototype.popFromIndex = function(index){
    var endSegment = [];

    // From index to end of pile, copy items to new array.
    for (var i = index; i < this.length; i++){
	endSegment.push(this[i]);
    }

    // Clear copied items from pile.
    var itemsToClear = this.length;
    for (var i = index; i < itemsToClear; i++){
        this.pop();
    }
    // Return new array;
    return endSegment;
}




Pile.prototype.draw = function(){
    if (this.markerImage){
	context.drawImage(this.markerImage, this.x, this.y, this.markerW, this.markerH);
    }

    // Draw all cards.
    for (var i = 0; i < this.length; i++){
	this[i].draw();
    }
}




function Deck(x, y, deckResetImage){
    Pile.call(this, x, y, deckResetImage);

    // Populate deck.
    for (var i = 0; i < 52; i++){
	var value = (i % 13) + 1
	var suit = Math.floor(i / 13)
	var image = CARD_IMAGES[i];

	var card = new Card(value, suit, image);
	this.push([card], FACE_DOWN);
    }
}
Deck.prototype = new Pile();




Deck.prototype.detectClicks = function(){
    if (hand.x > this.x &&
	hand.y > this.y &&
	hand.x < this.x + this.markerW &&
	hand.y < this.y + this.markerH){
	    return true;
    }
    else{
	return false;
    }
}




Deck.prototype.shuffle = function(){
    var currentIndex = this.length;
    var temp, randomIndex;

    while (0 !== currentIndex) {
	randomIndex = Math.floor(Math.random() * currentIndex);
	currentIndex -= 1;

	temp = this[currentIndex];
	this[currentIndex] = this[randomIndex];
	this[randomIndex] = temp;
    }
}




function DealPile(x, y){
    Pile.call(this, x, y);

    this.cardOffsetX = DEAL_PILE_CARD_OFFSET;
}
DealPile.prototype = new Pile();




DealPile.prototype.pop = function(){
    // Move the anchor to the appropriate position for the next push().
    // This code accounts for the various possible positions
    // of cards that have been spread in a triple-deal.
    if (this.length == 0 || this.length == 1){
	this.anchorX = this.x;
    }
    else{
	var topCard = this[this.length - 1];
	var cardBelow = this[this.length - 2];

	if (topCard.x == cardBelow.x){    
            this.anchorX = this.x
	}
	else{
	    this.anchorX = topCard.x;
	}
    }

    return Pile.prototype.pop.call(this);
}




DealPile.prototype.spreadTopCards = function(numberToReveal){
    var startIndex = this.length - numberToReveal;
    var endIndex = this.length - 1;
    var modifier = 0;

    for (var i = startIndex; i <= endIndex; i++){
        this[i].x = this.x + (modifier * this.cardOffsetX);
	modifier++;
    }

    var topCard = this[endIndex];
    this.anchorX = topCard.x + this.cardOffsetX;
}




DealPile.prototype.unspreadCards = function(){
    for (var i = this.length - 1; i >= 0; i--){
        this[i].x = this.x;
        this[i].y = this.y;
    }

    this.anchorX = this.x;
    this.anchorY = this.y;
}




function WinPile(x, y, suit, markerImage){
    Pile.call(this, x, y, markerImage);

    this.suit = suit;
}
WinPile.prototype = new Pile();




WinPile.prototype.validateDrop = function(card){
    if (card.suit != this.suit){
	return false;
    }

    if (this.length == 0 && card.value != 1){
	return false;
    }

    if (this.length > 0){
        var targetCard = this[this.length - 1];
	if (targetCard.value != card.value - 1){
	    return false;
	}
    }

	return true;
}




function Column(x, y){
    Pile.call(this, x, y);

    this.faceUpCardOffsetY = FACE_UP_CARD_OFFSET;
    this.faceDownCardOffsetY = FACE_DOWN_CARD_OFFSET;
    this.markerImage = COLUMN_MARKER;
}
Column.prototype = new Pile();




Column.prototype.detectClicks = function(){
    if (this.length > 0){
        var clickIndex = -1;
        for (var i = this.length - 1; i >= 0; i--){
	    if (this[i].detectClicks()){
	        clickIndex = i;
		break;
	    }
	}
    }

    return this.processClicks(clickIndex);
}




Column.prototype.processClicks = function(clickIndex){
    if (clickIndex > -1){
	var card = this[clickIndex];

	if (card.orientation == FACE_UP){
	    return clickIndex;
	}

	// If exposed face-down card has been clicked, turn it over.
	if (card.orientation == FACE_DOWN && clickIndex == this.length - 1){
	    card.setOrientation(FACE_UP);
	    this.updateAnchorPos();
	}
    }

    return clickIndex;
}




Column.prototype.validateDrop = function(card){
    if (this.length > 0){
	var targetCard = this[this.length - 1];

	if (targetCard.value != card.value + 1){
	    return false;
	}

	if (targetCard.colour == card.colour){
	    return false;
	}
    }
    else if (card.value != 13){
	return false;
    }

    return true;
}




Column.prototype.push = function(cards, orientation = FACE_UP){
    for (var i = 0; i < cards.length; i++){
	var card = cards[i];

	card.setOrientation(orientation);
	card.setPos(this.anchorX, this.anchorY);

	Array.prototype.push.call(this, card);

	this.updateAnchorPos();
    }
}




Column.prototype.popFromIndex = function(index){
    var temp = Pile.prototype.popFromIndex.call(this, index);

    this.updateAnchorPos();

    return temp;
}




Column.prototype.updateAnchorPos = function(){
    if (this.length > 0){
        var topCard = this[this.length - 1];

        if (topCard.orientation == FACE_UP){
	    this.anchorY = topCard.y + this.faceUpCardOffsetY;
        }
        else{
	    this.anchorY = topCard.y + this.faceDownCardOffsetY;
        }
    }
    else{
        this.anchorY = this.y;	
    }
}




// Hand = cursor + dragged cards.
function Hand(){
    Pile.call(this);

    this.dragOffsetX;
    this.dragOffsetY;
    this.cardOffsetY = FACE_UP_CARD_OFFSET;
    this.pickupLocation = -1;
}
Hand.prototype = new Pile();




Hand.prototype.push = function(cards){
    Pile.prototype.push.call(this, cards);

    // Set positions of pushed cards.
    this.setPos();
}




Hand.prototype.setPos = function(pos = new Point(this.x, this.y)){
    this.x = pos.x;
    this.y = pos.y;

    for (var i = 0; i < this.length; i++){
	var card = this[i];

	var cardX = this.x + this.dragOffsetX;
	var cardY = this.y + this.dragOffsetY + (i * this.cardOffsetY);

	card.setPos(cardX, cardY);
    }
}




Hand.prototype.setDragOffset = function(x, y){
    this.dragOffsetX = x;
    this.dragOffsetY = y;
}




function Point(x, y){
    this.x = x;
    this.y = y;
}




// Event listeners.
tttCanvas.addEventListener('mousedown', function mouseDownOnCanvas (pos) {
    hand.setPos(computeCursorPosition(pos));

    if (deck.detectClicks()){
	deal();
    }
    else{
	// Scan locations for clicks. 
	// Transfer cards to hand if pickup detected.
	for (var i = 0; i < locations.length; i++){
	    var clickIndex = locations[i].detectClicks();

	    if (clickIndex > -1){
		hand.push(locations[i].popFromIndex(clickIndex));
		hand.pickupLocation = i;
		break;
	    }
	}
    }

    render();
}); 




tttCanvas.addEventListener('dblclick', function doubleClickOnCanvas (pos) {
    hand.setPos(computeCursorPosition(pos));

    // Scan locations for double-clicks.
    // Attempt transfer to win-pile if detected.
    for (var i = 0; i < locations.length; i++){
	var location = locations[i];

	if (location.length > 0){
	    var clickIndex = location.detectClicks();

	    // If top card was double-clicked. . .
	    if (clickIndex == location.length - 1){
		winPileTransfer(i, location[clickIndex]);
	    }
	}
    }

    render();
});




document.addEventListener('mouseup', function mouseUpOnCanvas (pos) {
    hand.setPos(computeCursorPosition(pos));

    if (hand.length > 0){
	var dropOK = false;
	var bottomCardInHand = hand[0];

	// Scan locations for drops, perform drop if detected.
	// Deal pile (location 0) does not accept drops, so scan begins at location 1.
	for (var i = 1; i < locations.length; i++){
	    if (locations[i].detectDrops(bottomCardInHand) && 
		locations[i].validateDrop(bottomCardInHand)){
		    locations[i].push(hand.popFromIndex(0));
		    dropOK = true;
		    break;
	    }
	}

        // If drop unsuccessful, return cards to pickup location.
	if (!dropOK && hand.pickupLocation > -1){
	    locations[hand.pickupLocation].push(hand.popFromIndex(0));
	}
    }

    render();
}); 




document.addEventListener('mousemove', function mouseMoveOnCanvas (pos) {
    hand.setPos(computeCursorPosition(pos));

    render();
}); 




newGameButton.onclick = function () {
    newGame();
}




dealTypeSelectButton.onclick = function () {
    if (dealType == SINGLE_DEAL) {
        dealType = TRIPLE_DEAL;
	dealTypeSelectButton.innerHTML = "<b>triple deal</b>";
    } else {
	dealType = SINGLE_DEAL;
	dealTypeSelectButton.innerHTML = "<b>single deal</b>";
    }
}



// Functions.
function winPileTransfer(location, card){
    for (var i = 0; i < winPiles.length; i++){
        if (winPiles[i].validateDrop(card)){
	    winPiles[i].push(locations[location].pop());
	    break;
	}
    }

    render();
}




function computeCursorPosition(pos){
    var canvasRect = tttCanvas.getBoundingClientRect();

    var x = (pos.clientX - canvasRect.left);
    var y = (pos.clientY - canvasRect.top);

    return new Point(x, y);
}




function deal(){
    if (deck.length == 0){
	recoverDealPile();
	return;
    }

    var dealSize = getDealSize();

    dealPile.unspreadCards();
    dealPile.push(deck.popFromIndex(deck.length - dealSize));
	
    if (dealType == TRIPLE_DEAL){
	dealPile.spreadTopCards(dealSize);
    }
}




function getDealSize(){
    var dealSize = 0;
    while (dealSize < 3 && dealSize < deck.length){
	dealSize++;

	if (dealType == SINGLE_DEAL){
	    break;
	}
    }

    return dealSize;
}




function recoverDealPile(){
    dealPileInitialLength = dealPile.length;
    for (var i = 0; i < dealPileInitialLength; i++){
        deck.push(dealPile.pop(), FACE_DOWN);
    }
}




function recoverAllCards(){
    for (var i = 0; i < locations.length; i++){
	deck.push(locations[i].popFromIndex(0), FACE_DOWN);
    }
}




// Rendering.
function render(){
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	
    deck.draw();

    for (var i = 0; i < locations.length; i++){
	locations[i].draw();
    }

    hand.draw();
}




// New game.
function newGame(){
    recoverAllCards();

    deck.shuffle();

    // Deal columns
    for (var i = 0; i < columns.length; i++){
	for (var j = 0; j < i; j++){
	    columns[i].push(deck.pop(), FACE_DOWN);

	}

	columns[i].push(deck.pop());
    }

    render();	
}




// Initialization.
function init(){
    deck = new Deck(10, 10, DECK_RESET);
	
    dealPile = new DealPile(120, 10);
	
    winPiles = [
	new WinPile(340, 10, SPADES, WIN_PILE_MARKER_SPADES),
	new WinPile(450, 10, CLUBS, WIN_PILE_MARKER_CLUBS),
	new WinPile(560, 10, HEARTS, WIN_PILE_MARKER_HEARTS),
	new WinPile(670, 10, DIAMONDS, WIN_PILE_MARKER_DIAMONDS)
    ];

    columns = [
	new Column(10, 160),
	new Column(120, 160),
	new Column(230, 160),
	new Column(340, 160),
	new Column(450, 160),
	new Column(560, 160),
	new Column(670, 160)
    ];
	
    locations = [
	dealPile,
	winPiles[0],
	winPiles[1],
	winPiles[2],
	winPiles[3],
	columns[0],
	columns[1],
	columns[2],
	columns[3],
	columns[4],
	columns[5],
	columns[6]
    ];

    hand = new Hand();

    dealType = TRIPLE_DEAL;

    newGame();
}




// Start game.
init();