class app {

	constructor(pageIndex) {
		this.pageIndex = pageIndex
	}

	init() {
		//
		this.events()
		this.slideMenu()
	}

	slideMenu() {
		$('#sidebar').find('ul > .submenu ').eq(this.pageIndex).addClass('active')
	}

	events() {
		// 折叠
		$('#slider-fold').on('click',function() {
	 		let slider = $('#sidebar').closest('.slider-menu-wrap');
	 		let context_view = $('.page-container > .context-view-wrap')

	 		slider.toggleClass('fold')
	 		context_view.toggleClass('fold')
	 	})

	}
}

export default app;