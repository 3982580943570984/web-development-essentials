<?php

header("Content-Type: application/json");

$users = json_decode(file_get_contents("../JSON/UserInfo.json", true), true);
$shop = json_decode(file_get_contents("../JSON/ShopInfo.json", true), true);

$user_purchases = $users[$_COOKIE['login']]['purchases'];

$balloons = &$shop['Balloon'];
$clouds = &$shop['Cloud'];
$backgrounds = &$shop['Background'];

if($_POST['type'] == 'player-info') {
    $result = array(
        'success' => false,
    );
    if(!empty($_COOKIE['login'])) {
        $result['success'] = true;
        $result['name'] = $_COOKIE['login'];
        $result['currency'] = $users[$_COOKIE['login']]['currency'];
    }

    echo json_encode($result);

    exit;
}

if($_POST['type'] == 'balloon-category') {
    $result = array();
    foreach($balloons as $balloon => $info) {
        $result[$balloon] = $info;
    }

    echo json_encode($result);

    exit;
}