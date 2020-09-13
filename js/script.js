const filterByType = (type, ...values) => values.filter(value => typeof value === type), 
/* Expression объявлении стрелочной функции, присваиваем переменной, передаем параметры функциии, 
один из  параметров rest оператор (может передавать разное количество переменных, которые попадут в массив. В теле функции полученный через rest оператор параметры через метод
	filter обрабатываются, так же стрелочная функция (в filter) "смотрит" тип кажого элемента массива   typeof и сравнивает с типом который был передан как первый параметр в функцию 
	filterByType , возвращает только те элементы массива , для которых выполнится условие typeof value === type. Метод filter возвращает новый массив*/

	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},
	/* Expression объявлении стрелочной функции. В responseBlocksArray будет массив из элементов div страницы с классом dialog__response-block. 
	Дальше массив responseBlocksArray через метод  для каждого элемента массива (div-а страницы с классом dialog__response-block) будет в html инлайнов добавлено 
	свойство display = 'none', которое "скроет"/удалит элемент со страницы*/

	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		hideAllResponseBlocks();
		document.querySelector(blockSelector).style.display = 'block';
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;
		}
	},
	/* Expression объявлении стрелочной функции. В Функцию передаем три параметра. 
	Выполняется внешняя функция, описана выше. 
	Для элмента страницы (первый который будет соответсвовать селектору), соответсвующего селектору blockSelector, устанвливается инлайном в html свойство display = 'block'
	Далее , выполняется if , если был передан какой-то spanSelector , для первого элемента (который будет соответсвовать селектору) присвоить текст равный msgText*/

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
	/* Expression объявлении стрелочной функции. В Функцию передаем один параметр msgText. в Функции выполняется внешняя фунция showResponseBlock. 
	В функцию showResponseBlock передаются параметры : класс .dialog__response-block_error, текст msgText, айдишка #error' */

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
	/* Expression объявлении стрелочной функции. В Функцию передаем один параметр msgText. в Функции выполняется внешняя фунция showResponseBlock. 
	В функцию showResponseBlock передаются параметры : класс .dialog__response-block_ok, текст msgText, айдишка #ok' */

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),
	/* Expression объявлении стрелочной функции. в Функции выполняется внешняя фунция showResponseBlock. 
	В функцию showResponseBlock передается один параметр : класс .dialog__response-block_no-results */

	tryFilterByType = (type, values) => {
		try {
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
			showResults(alertMsg);
		} catch (e) {
			showError(`Ошибка: ${e}`);
		}
	};
	/* Expression объявлении стрелочной функции tryFilterByType. В функцию передаются параметры type, values. 
	в Функции выполняется try  , в которой выполняется eval , "В современной разработке на JavaScript eval используется весьма редко. Есть даже известное выражение – «eval is evil» («eval – это зло»)." 
	если try завершится ошибкой, то выполнится код в catch, выведет ошибку выполнения try`Ошибка: ${e}`*/

const filterButton = document.querySelector('#filter-btn');
	/* в переменную filterButton сохранится первый попавшийся на страницк элемент с айдишкой #filter-btn*/

filterButton.addEventListener('click', e => {
	const typeInput = document.querySelector('#type');
	const dataInput = document.querySelector('#data');

	if (dataInput.value === '') {
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		showNoResults();
	} else {
		dataInput.setCustomValidity('');
		e.preventDefault();
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

/*на filterButton "навешен" листенер, по клику , 
Обявлены и присвоены две переменные, typeInput по айдишке #type , dataInput по айдишке #data
далее идут условия:
если значение (value) dataInput пустое, то для dataInput выполняется метод setCustomValidity, который выведет сообщение  Поле не должно быть пустым! и выполняется функция showNoResults();
в противном случае , т.е. когда  значение (value) dataInput не пустое для dataInput выполняется метод setCustomValidity, который затрет ранее выведенное сообщение , если оно было
дальше выполнится метод e.preventDefault(), который для filterButton отменит действие по умолчанию и дальше
 выполнится функция tryFilterByType , в которую будут переданы как параметры значения (value) полей typeInput и dataInput , с методом trim(), который обрезает пробелы вначале и конце строки*/
