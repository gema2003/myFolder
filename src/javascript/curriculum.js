// ==========================================
// 1. SELECTORES DE ELEMENTOS
// ==========================================
const accordionItemHeader = document.querySelectorAll('.accordion-item-header');
const btnOpen = document.querySelector('.btnAct');
const btnClose = document.querySelector('.close');
const modal = document.querySelector('.modal-container');
const content = document.querySelector('.modal-content');

// ==========================================
// 2. FUNCIÓN DEL ACORDEÓN (Historial Laboral / Estudios)
// ==========================================
accordionItemHeader.forEach(header => {
	header.addEventListener('click', event => {
		const currentlyActive = document.querySelector('.accordion-item-header.active');
		
		// Si hay otro acordeón abierto, lo cerramos antes de abrir el nuevo
		if (currentlyActive && currentlyActive !== header) {
			currentlyActive.classList.remove('active');
			currentlyActive.nextElementSibling.style.maxHeight = 0;
		}

		header.classList.toggle('active');
		const accordionItemBody = header.nextElementSibling;
		
		if (header.classList.contains('active')) {
			accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + 'px';
		} else {
			accordionItemBody.style.maxHeight = 0;
		}
	});
});

// ==========================================
// 3. FUNCIÓN DEL MODAL (Botones de Acción)
// ==========================================
// Candado de seguridad: solo ejecuta si los botones existen en la página actual
if (btnOpen && btnClose && modal && content) {
	btnOpen.onclick = () => {
		modal.classList.toggle('move');
		content.classList.toggle('show');
	};
	btnClose.onclick = () => {
		modal.classList.remove('move');
		content.classList.remove('show');
	};
}

// ==========================================
// 4. CAMBIO DE EDAD AUTOMÁTICO (Calibrado)
// ==========================================
// 💡 CORRECCIÓN MÁGICA: Agosto es el mes 7 en JavaScript (Enero = 0, Agosto = 7)
const dateOfBirth = new Date(1981, 7, 7); 
const now = new Date();

let age = now.getFullYear() - dateOfBirth.getFullYear();
let monthDiff = now.getMonth() - dateOfBirth.getMonth();

// Si no hemos llegado a tu mes de cumpleaños, o estamos en tu mes pero falta para el día 7, restamos un año
if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dateOfBirth.getDate())) {
	age--;
}

// 🚀 EL TRUCO LIMPIO: Buscamos el elemento exacto en tu HTML e inyectamos el dato
const edadContenedor = document.getElementById('edad-automatica');
if (edadContenedor) {
	edadContenedor.innerHTML = `<b>Edad:</b> ${age} años`;
}





