<?php
    header("Content-Type: application/json");
    $json = file_get_contents("../JSON/UsersInfo.json", true);

    $jsonData = json_decode($json, true);

    $regInfo = array(
        'success' => true,
        'loginError' => '',
        'passwordError' => '',
        'emailError' => '',
        'nameError' => '',
        'ageError' => ''
    );

    $pattern_login =    "/^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{0,19}$/";
    $pattern_password = "/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/";
	$pattern_mail =     "/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/";
    $pattern_name =     "/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/";
    $pattern_age =      "/^(1[89]|[2-9]\d)$/";

    if(!empty($jsonData)){
        foreach($jsonData as $key => $value){
            if($_POST['login'] == $key){
                $regInfo['success'] = false;
                $regInfo['loginError']  = 'Such login is already taken';
            }   
        }
    }

    if($regInfo['loginError'] == ''){
        if(!preg_match($pattern_login, $_POST['login'])){
            $regInfo['success'] = false;
            $regInfo['loginError']  = 'Incorrect login format';
        }
    }

    if(!preg_match($pattern_password, $_POST['password'])){
        $regInfo['success'] = false;
        $regInfo['passwordError']  = 'Incorrect password format';
    }

    if(!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        $regInfo['success'] = false;
        $regInfo['emailError']  = 'Incorrect e-mail format';
    }

    if(!preg_match($pattern_name, $_POST['name'])){
        $regInfo['success'] = false;
        $regInfo['nameError']  = 'Incorrect name format';
    }

    if(!preg_match($pattern_age, $_POST['age'])){
        $regInfo['success'] = false;
        $regInfo['ageError']  = 'Incorrect age format';
    }

    echo json_encode($regInfo);
    if(!$regInfo['success']) exit();

    $jsonData[$_POST['login']] = array(
        'password' => $_POST['password'],
        'e-mail' => $_POST['email'],
        'name' => $_POST['name'],
        'age' => $_POST['age'],
        'online' => false,
    );
    file_put_contents("../JSON/UsersInfo.json", json_encode($jsonData));
?>