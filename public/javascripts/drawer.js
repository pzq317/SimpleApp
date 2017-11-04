$(document).ready(function(){
	$(".fa-times").click(function(){
		$(".sidebar_menu").addClass("hide_menu");
		// $(".toggle_menu").removeClass("visible_menu");
	});
	$(".toggle_menu").click(function(){
		$(".sidebar_menu").removeClass("hide_menu");
		// $(".sidebar_menu").addClass("visible_menu");
	});
})