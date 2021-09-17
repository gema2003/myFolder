const accordionItemHeader = document.querySelectorAll('.accordion-item-header');
const btnOpen = document.querySelector('.btnAct');
const btnClose = document.querySelector('.close');
const modal = document.querySelector('.modal-container');
const content = document.querySelector('.modal-content');

// acordion function

accordionItemHeader.forEach(accordionItemHeader => {
	accordionItemHeader.addEventListener('click', event => {
		const currentlyActiveAccordionItemHeader = document.querySelector('.accordion-item-header.active');
		if(currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader!=accordionItemHeader) {
			currentlyActiveAccordionItemHeader.classList.toggle('active');
			currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
		}


		accordionItemHeader.classList.toggle('active');
		const accordionItemBody = accordionItemHeader.nextElementSibling;
		if(accordionItemHeader.classList.contains('active')) {
			accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + 'px';
		}else {
			accordionItemBody.style.maxHeight = 0;
		}
	});
});

// modal buttons

btnOpen.onclick= () =>{
	modal.classList.toggle('move');
	content.classList.toggle('show');
};
btnClose.onclick= () =>{
	modal.classList.remove('move');
	content.classList.remove('show');
};