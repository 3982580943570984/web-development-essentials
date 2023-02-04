<?php

header("Content-Type: application/json");

$users = json_decode(file_get_contents("../JSON/UserInfo.json", true), true);

$regInfo = array(
    'success' => true,
    'loginError' => '',
    'passwordError' => '',
    'emailError' => '',
    'nameError' => '',
    'ageError' => ''
);

$pattern_login = "/^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{0,19}$/";
$pattern_password = "/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/";
$pattern_name = "/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/";
$pattern_age = "/^(1[89]|[2-9]\d)$/";

// Looking for same login
if (!empty($users)) {
    foreach ($users as $key => $value) {
        if ($_POST['login'] == $key) {
            $regInfo['success'] = false;
            $regInfo['loginError']  = 'Such login is already taken';
        }
    }
}

// Regex login
if ($regInfo['loginError'] == '') {
    if (!preg_match($pattern_login, $_POST['login'])) {
        $regInfo['success'] = false;
        $regInfo['loginError']  = 'Incorrect login format';
    }
}
// Regex password
if (!preg_match($pattern_password, $_POST['password'])) {
    $regInfo['success'] = false;
    $regInfo['passwordError']  = 'Incorrect password format';
}

// Regex e-mail
if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    $regInfo['success'] = false;
    $regInfo['emailError']  = 'Incorrect e-mail format';
}

// Regex name
if (!preg_match($pattern_name, $_POST['name'])) {
    $regInfo['success'] = false;
    $regInfo['nameError']  = 'Incorrect name format';
}

// Regex age
if (!preg_match($pattern_age, $_POST['age'])) {
    $regInfo['success'] = false;
    $regInfo['ageError']  = 'Incorrect age format';
}

echo json_encode($regInfo);

if ($regInfo['success']) {

    $users[$_POST['login']] = array(
        'password' => $_POST['password'],
        'e-mail' => $_POST['email'],
        'name' => $_POST['name'],
        'age' => $_POST['age'],
        'online' => false,
        'currency' => 0,
        'purchases' => [
            'balloons' => [
                'Pink Air Balloon',
            ],
            'clouds' => [],
            'backgrounds' => [],
        ],
    );

    file_put_contents("../JSON/UserInfo.json", json_encode($users));
    
}
