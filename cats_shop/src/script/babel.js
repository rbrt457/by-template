import '@/styles/index.css'

let items = document.querySelector('.content_items')
let btnPrice = document.querySelector('#byPrice')
let btnAge = document.querySelector('#byAge')
let arrow = document.querySelectorAll('.sort_arrow')
let replacedNode
let watchMore = document.querySelector('.more_cats')

//Сортировка по убыванию
function sortAdс(sortBy){
	showAll()
	for(let i = 0; i < items.children.length; i++){		
		for(let j = i ; j < items.children.length; j++){
			if(+items.children[i].querySelector(sortBy).innerText.match(/\d/g).join('') > +items.children[j].querySelector(sortBy).innerText.match(/\d/g).join('')){
				replacedNode = items.replaceChild(items.children[j], items.children[i]);
				insertAfter(replacedNode, items.children[i]);
			}
		}
	}
			hideExcess()
	
}
//Сортировка по возрастанию
function sortDes(sortBy){
	showAll()
	for(let i = 0; i < items.children.length; i++){		
		for(let j = i ; j < items.children.length; j++){
			if(+items.children[i].querySelector(sortBy).innerText.match(/\d/g).join('') < +items.children[j].querySelector(sortBy).innerText.match(/\d/g).join('')){
				replacedNode = items.replaceChild(items.children[j], items.children[i]);
				insertAfter(replacedNode, items.children[i]);
			}
		}
	}
	
		hideExcess()
	
	
}

function insertAfter(elem, refElem){
	return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}

//Сортировка по цене
btnPrice.onclick = function (){
	if(arrow[0].style.transform !== 'rotate(180deg)'){	
	arrow[0].style.transform = 'rotate(180deg)'
		sortAdс('.price')
		
	}
	else{
		arrow[0].style.transform = ''
		sortDes('.price')
		
	}
}
//Сортировка по возрасту
btnAge.onclick = function (){
	if(arrow[1].style.transform !== 'rotate(180deg)'){
		arrow[1].style.transform = 'rotate(180deg)'
		sortAdс('.cat_age')
	}
	else{
		arrow[1].style.transform = ''
		sortDes('.cat_age')
	}
}




//Изменение состояния кнопки покупки
let block = document.getElementById('content')
block.onclick = function(event){
	let target = event.target
	if (target.className != 'button_buy') return;
	target.style.backgroundColor = 'black'
	target.innerText = 'Продано'
}

//Добавление в избранное
let like = document.querySelectorAll('.like')
let message = document.querySelectorAll('.mess_fav')
for (let m = 0; m < like.length; m++) {
	like[m].onclick = function () {
		if(like[m].style.opacity !== '1') {
			return new Promise( function (resolve){
				setTimeout(() =>{
					like[m].style.opacity = '100%'
					resolve()
				}, 0)
			})
				.then(showMess('Котик в избранном :)', m))
				.then(hideMess(m))
		}
		else {
			return new Promise( function (resolve){
				setTimeout(() =>{
					like[m].style.opacity = '50%'
					resolve()
				}, 0)
			})
				.then(showMess('Котик больше не в избранном :(', m))
				.then(hideMess(m))
		}

	}
	
	
}
function showMess(messageText, m) {
	return new Promise( function (resolve){
		setTimeout(()=>{
			message[m].classList.add('show_mess')
			message[m].innerText = messageText
			resolve()
		}, 500)
	})
}
function hideMess(m){
	return new Promise( function (){
		setTimeout(()=>{
			message[m].classList.remove('show_mess')
		}, 2500)
	})
}
//Прокрутка вверх
let btnScroll = document.querySelector('.scroll_up')
const screenWidth = window.screen.width
window.addEventListener('scroll', () => {
	const scrolledY = window.scrollY
	if(scrolledY >= 800 && screenWidth > 1025){
		btnScroll.style.display = 'block'
	}
	else{
		btnScroll.style.display = 'none'
	}
})
btnScroll.onclick = function (){
	window.scrollTo({
		top: 0,
		behavior: "smooth"
	})
}

//Валидация почты
let mail = document.getElementById('mail')
let btnMail = document.getElementById('mailBtn')
// let pattern = /\S+@\S+\.\S+/
let canPost = false
let mess = document.querySelector('.validate_mess')
let pattern = /^[^ ]+@[^ ]+\.[a-z]{1,3}$/
mail.onkeydown = function (){
	if(mail.value.match(pattern)){
		mess.style.display = 'block'
		mess.innerText = 'Почта введена правильно'
		mess.style.color = '#90EE90'
		btnMail.style.backgroundColor = '#90EE90'
		btnMail.style.color = 'black'
		canPost = true
	}
	else{
		mess.style.display = 'block'
		mess.innerText = 'Введите почту формата example@mail.(com/ru)'
		mess.style.color = '#F08080'
		btnMail.style.backgroundColor = '#F08080'
		btnMail.style.color = 'white'
		canPost = false
	}


}
btnMail.onclick = function () {
	if(canPost == true){
		alert('Спасибо за подписку!')
		mail.value = ''
		mess.style.display = 'none'
		btnMail.style.backgroundColor = '#6EBBD3'
		btnMail.style.color = 'white'
		return false
	}
	else{
		return false
	}

}
//Мобильное меню
let mobMenu = document.querySelector('.mob_menu')
let areaMenu =	document.querySelector('.header_content')
mobMenu.onclick= function () {
	// mobMenu.style.backgroundImage = 'url(../img/menuClose.png)'
	if (areaMenu.style.display !== 'block') {
		areaMenu.style.display = 'block'
	}
	else{
		areaMenu.style.display = 'none'
	}
}

//Скрываем все элементы если их больше 6
window.onload = hideExcess()
function showAll(){	
		for(let i = 0; i < items.children.length; i++ ){
			items.children[i].style.display = 'block'
		}
	}

function hideExcess(){	
		for(let i = 6; i < items.children.length; i++ ){
			items.children[i].style.display = 'none'
		}
		watchMore.style.display = 'block'
	}

//Показываем остальные элементы


watchMore.onclick = function (){
	for(let i = 6; i < items.children.length; i++){
		items.children[i].style.display = 'block'
		watchMore.style.display = 'none'
	}
}