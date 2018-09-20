'use strict';

let cards = [];
const suites = ['&spades;', '&clubs;', '&hearts;', '&diams;'];
const decks = 6;
const types = ['A', 'K', 'Q', 'J', 10, 9, 8, 7, 6, 5, 4, 3, 2];
const left_to_right = [4, 6, 2, 1, 3, 7, 5];
let deal_order = [];
let number_of_players;
let messagetimeout;

let card_round = 1;

let temp_obj;

for (let i = 0; i < decks; i++) {
	for (let j = 0; j < suites.length; j++) {
		for (let k = 0; k < types.length; k++) {
			temp_obj = {
				Type: types[k],
				Suite: suites[j]
			}
			cards.push(temp_obj);
		}
	}
}

function clear_required() {
	$("input").change(function () {
		$(this).removeClass("required");
	});

	$("input").on('input', function () {
		$(this).removeClass("required");
	});
}
clear_required();

function shuffle(array) {
	let currentIndex = array.length,
		temporaryValue, randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

shuffle(cards);

console.log(cards);

function set_players() {
	let pass = true;
	let player_names = [];


	if ($("#player_name").val() === '') {
		$("#player_name").addClass('required');
		count++;
	} else {
		player_names.push($("#player_name").val());
	}

	if (pass) {
		$('#players_modal').css('display', 'none');

		number_of_players = $("#players_select").val();

		player_names.push('Tom');
		player_names.push('Meryl');
		player_names.push('Winnie');
		player_names.push('Alfred');
		player_names.push('Henry');
		player_names.push('Sky');

		player_names = player_names.slice(0, number_of_players);

		set_table(player_names);
	} else {
		showmessage('Please fill in your name.');
	}
}


//GAME
//==============================================================================================

function set_table(players) {

	$('.player_spot').empty();

	const element = $('<div class="center_holder"><p>Dealer</p></div>');
	$('#dealer-div').append(element);

	for (let i = 0; i < number_of_players; i++) {
		const element = $('<div class="center_holder"><p>' + players[i] + '</p></div>');
		const spot = i + 1;
		$('#spot-' + spot).append(element);
	}
	deal_initial();
}

function get_card() {
	const type = cards[0].Type;
	const suite = cards[0].Suite;
	let color;
	if (
		suite === '&spades;' ||
		suite === '&clubs;'
	) {
		color = '#303030';
	} else {
		color = '#ef5350';
	}

	cards = cards.slice(1);
	const card = $('<div class="card" style="color:' + color + '"><span class="card-top-left">' + type +
		'<span class="top-left-icon">' + suite + '</span></span>' +
		'<span class="center_icon"><i class="fas fa-space-shuttle"></i></span>' +
		'<span class="card-bottom-right">' + type +
		'<span class="bottom-right-icon">' + suite + '</span></span></div>');

	return card;
}

function deal_initial() {


	const card = get_card();
	setTimeout(function () {
		{
			$('#dealer-div').append(card);
		}
	}, 250);

	deal_order = [];

	for (let value of left_to_right) {

		if (value <= number_of_players) {
			deal_order.push(value);
		}

	}

	for (let i = 0; i < number_of_players; i++) {

		const spot = i + 1;
		const time = 250 * (spot + 1);
		const card = get_card();

		setTimeout(function () {
			{
				$('#spot-' + deal_order[i]).append(card);
			}
		}, time);

	}

}

function hidemessage() {
	$('#divalert').css("display", "none");
}

function showmessage(message, type = 'warning', time = 7500) {

	clearTimeout(messagetimeout);

	$('#divalert').removeClass();
	$('#divalerttext').html(message);
	$('#divalert').addClass("alert " + type);
	$('#divalert').css("display", "inline-block");

	if (time != 0) {
		messagetimeout = setTimeout(function () {
			{
				hidemessage();
			}
		}, time);
	}

} //end showmessage