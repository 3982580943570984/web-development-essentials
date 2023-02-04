<?php

header("Content-Type: application/json");

$users = json_decode(file_get_contents("../JSON/UserInfo.json", true), true);

$result = false;

if ($_POST['type'] == 'log-in') {
    foreach ($users as $user => $info) {
        if ($_COOKIE['login'] == $user && $_POST['password'] == $info['password']) {
            $users[$user]['online'] = true;
            $result = true;
        }
    }
}

if ($_POST['type'] == 'log-out') {
    if (!empty($_COOKIE['login'])) {
        $users[$_COOKIE['login']]['online'] = false;
    }
    $result = true;
}

if ($_POST['type'] == 'check-status') {
    if (!empty($_COOKIE['login'])) {
        if ($users[$_COOKIE['login']]['online']) {
            $result = true;
        }
    }
}

echo json_encode($result);
file_put_contents("../JSON/UserInfo.json", json_encode($users));