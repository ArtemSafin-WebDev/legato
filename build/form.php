<?php 
//----------------Отправка формы в амоцрм и создание сделки------------------

$name = isset($_POST['fields']['name_1']) ? $_POST['fields']['name_1'] : "Не указано"; //ФИО
$phone = isset($_POST['fields']['58913_1']['83995']) ? $_POST['fields']['58913_1']['83995'] : "Не указано"; //телефон
$tableForm = isset($_POST['fields']['206719_2']) ? $_POST['fields']['206719_2'] : "Не указано"; //Форма стола
$tableLength = isset($_POST['fields']['206721_2']) ? $_POST['fields']['206721_2'] : "Не указано"; // длина стола
$tableWidth = isset($_POST['fields']['206723_2']) ? $_POST['fields']['206723_2'] : "Не указано"; // ширина стола
$tableDiameter = isset($_POST['fields']['461833_2']) ? $_POST['fields']['461833_2'] : "Не указано"; // диаметр стола
$tableThickness = isset($_POST['fields']['206717_2']) ? $_POST['fields']['206717_2'] : "Не указано"; // толщина стола
$tablePrice = isset($_POST['fields']['450951_2']) ? $_POST['fields']['450951_2'] : "Не указано"; // цена стола
$tableComment = isset($_POST['fields']['note_2']) ? $_POST['fields']['note_2'] : "Не указано"; // комментарий из модалки
$tableFormName = isset($_POST['form_name']) ? $_POST['form_name'] : "Не указано"; // цена стола

if ($_POST['fields']['name_1'] != "Не указано" && $_POST['fields']['name_1'] != "Не указано")//проверка чтобы не создавалась сделка по прямому пути к обработчику типа legato-shop.ru/form.php
{

	switch ($tableForm) {
		case '1':
			$tableFormAmo = "288717";
			$tableForm = "Прямоугольный стол";
			break;
		case '2':
			$tableFormAmo = "288715";
			$tableForm = "Овальный стол";
			break;
		case '3':
			$tableFormAmo = "288713";
			$tableForm = "Круглый стол";
			break;
	}

	$paramsArray = array(
		'fields' => array (
			'name_1' => $name, 
			'58913_1' => array ('83995' => $phone),
			'206719_2'=> $tableFormAmo,
			'206721_2' => $tableLength,
			'206723_2' => $tableWidth,
			'461833_2' => $tableDiameter,
			'206717_2' => $tableThickness,
			'450951_2' => $tablePrice,
			'note_2' => "Заявка с формы ".$tableFormName.": ".$tableComment
		),
		'form_id' => '778066', 
		'hash' => '3572043777be9bd706abed19f506679f'	
	); 
	// преобразуем массив в URL-кодированную строку
	$vars = http_build_query($paramsArray);
	// создаем параметры контекста
	$options = array(
		'http' => array(  
			'method'  => 'POST',  // метод передачи данных
			'header'  => 'Content-type: application/x-www-form-urlencoded',  // заголовок 
			'content' => $vars  // переменные
		)  
	);  
	$context  = stream_context_create($options);  // создаём контекст потока
	$result = file_get_contents('https://forms.amocrm.ru/queue/add', false, $context); //отправляем запрос
//----------------Конец отправки формы в амоцрм и создание сделки------------------
//----------------Отправка формы на почту------------------------------------------

	// $uri = isset($_POST['uri']) ? $_POST['uri'] : ""; //проверка чтобы не отправлялось письмо по прямому пути к обработчику типа legato-shop.ru/form.php

	// $address = "mail@mail.ru"; // кому отправляем
	// $mes = "Форма: Купить силиконовую скатерть выгодно!\n\nТелефон: $phone\n\nИмя: $name\n\nФорма стола: $tableForm\n
	// \nДлина стола: $tableLength\n\nШирина стола: $tableWidth\n\nДиаметр стола: $tableDiameter\n\nТолщина стола: $tableThickness\n\nЦена стола: $tablePrice"\n\nКомментарий: $tableComment"; // текст письма
	
	// $sub = 'Заявка с сайта'; // тема письма
	// $email = 'no-reply@site.ru'; // от кого

	// if (substr( $uri, 0, 4 ) === "http") {
	// 	$send = mail ($address,$sub,$mes,"Content-type:text/plain; charset = utf-8\r\nFrom:".$email);
	// }
//----------------Конец отправки формы на почту------------------------------------------
//----------------Отправка заявки в телеграм---------------------------------------------

/* https://api.telegram.org/bot1722484804:AAF3XKUc2kmSPIdxTD77J_riIIpZ5IvebdI/getUpdates,
где, 1722484804:AAF3XKUc2kmSPIdxTD77J_riIIpZ5IvebdI - токен вашего бота, полученный ранее */

$token = "1722484804:AAF3XKUc2kmSPIdxTD77J_riIIpZ5IvebdI";
$chat_id = "-545147440";
$arr = array(
  	'Имя' => $name, 
	'Телефон' => $phone,
	'Форма стола'=> $tableForm,
	'Длина стола' => $tableLength,
	'Ширина стола' => $tableWidth,
	'Диаметр стола' => $tableDiameter,
	'Толщина стола' => $tableThickness,
	'Цена стола' => $tablePrice,
	'Комментарий' => $tableComment,

);

foreach($arr as $key => $value) {
	if($value == "Не указано")
		continue;
	else{
		if($key == "Комментарий")
			$txt .= "<b>".$key."</b> ".$value."%0A<b>Заявка с формы</b> ".$tableFormName."%0A";
		else
  			$txt .= "<b>".$key."</b> ".$value."%0A";
	}
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

//----------------Конец отправки заявки в телеграм---------------------------------------

} ?>