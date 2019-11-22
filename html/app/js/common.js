$(function() {

	// Custom JS
	// Выделяем букву "О" в логотипе
	$('.logo-litera').each(function() {
		var ths = $(this);
		ths.html(ths.html().replace(('O'), '<span>O</span>'));
	});

	//Открываем поле поиска по клику и делаем активным курсор в поле поиска

	$('.search').click(function() {
		$('.search-field ').stop().slideToggle();
		$('.search-field input[type=text]').focus();
	});
	
	//Скрываем поле поиска по клику и Esc

	$(document).keyup(function(e) {
		if(e.keyCode == 27) {                   //27 escape key code
			$('.search-field ').slideUp();
		}
	}).click(function() {
		$('.search-field ').slideUp();
	});
	$('.search-wrap').click(function(e) {
		e.stopPropagation();
	});

	//Клонируем меню в мобильный враппер на малых разрешениях и скрываем основное меню

	$('.top-line').after('<div class = "mobile-menu d-lg-none">');
	$('.top-menu').clone().appendTo('.mobile-menu');
	$('.mobile-menu-button').click(function() {
		$('.mobile-menu').stop().slideToggle();
	});

	//Скрываем и открываем мобильное меню по клику

	// $(document).click(function() {
	// 	$('.mobile-menu').slideUp();
	// });
	
	// $('.top-line').click(function(e) {
	// 	e.stopPropagation();
	// });
	
});