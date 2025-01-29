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

btnOpen.onclick = () =>{
	modal.classList.toggle('move');
	content.classList.toggle('show');
};
btnClose.onclick= () =>{
	modal.classList.remove('move');
	content.classList.remove('show');
};

// Age
const dateOfBirth = new Date(1981, 07, 07);
let now = new Date();

let month = now.getMonth() - dateOfBirth.getMonth();
let age = now.getFullYear() - dateOfBirth.getFullYear();

	if (month < 0 || (month === 0 && now.getDate() < dateOfBirth.getDate())) {
		age--;
	}

const element = document.createElement('h2');
element.innerHTML = `<b>Edad :</b> ${age} años`;

const row = document.getElementById('main');
row.appendChild(element);




