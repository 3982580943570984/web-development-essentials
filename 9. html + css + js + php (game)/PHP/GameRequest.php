<?php

header("Content-Type: application/json");

$users = json_decode(file_get_contents("../JSON/UserInfo.json", true), true);
$game = json_decode(file_get_contents("../JSON/GameInfo.json", true), true);
$cloud = json_decode(file_get_contents("../JSON/CloudInfo.json", true), true);
$balloon = json_decode(file_get_contents("../JSON/BalloonInfo.json", true), true);

$screen = &$game['screen'];

if ($_POST['type'] == 'start') {

    $screen = array(
        'left' =>   $_POST['left'],
        'top' =>    $_POST['top'],
        'right' =>  $_POST['right'],
        'bottom' => $_POST['bottom'],
    );

    $lines_amount = floor(($screen['bottom'] - 80) / 80);
    for ($i = 0; $i < $lines_amount; $i++) { $screen['lines']['amount'][] = $i + 1; }

    $screen['lines']['width'] = intval($screen['bottom'] / $lines_amount);

    $cloud = array(
        'empty-lines' => $screen['lines']['amount'],
    );

    if (!empty($_COOKIE['login'])) {

        $users[$_COOKIE['login']]['difficulty'] = array(
            'expr_difficulty' => 1,
            'expr_length' => 1,
            'cloud_speed' => 20,
        );

        $users[$_COOKIE['login']]['new-session'] = array(
            'score' => 0,
            'time_alive' => 0,
            'lives' => 5,
        );
    }

    $balloon = array(
        'value' => '',
    );

    file_put_contents("../JSON/UserInfo.json", json_encode($users));
    file_put_contents("../JSON/GameInfo.json", json_encode($game));
    file_put_contents("../JSON/CloudInfo.json", json_encode($cloud));
    file_put_contents("../JSON/BalloonInfo.json", json_encode($balloon));

    echo true;

    exit;
}

if ($_POST['type'] == 'get-player-info') {
    if (!empty($_COOKIE['login'])) {
        echo json_encode($users[$_COOKIE['login']]['new-session']);
    }
    exit;
}

if ($_POST['type'] == 'resize') {
    $screen = array(
        'left' =>   $_POST['left'],
        'top' =>    $_POST['top'],
        'right' =>  $_POST['right'],
        'bottom' => $_POST['bottom'],
    );

    file_put_contents("../JSON/GameInfo.json", json_encode($game));

    exit;
}

if ($_POST['type'] == 'update-bln-value') {

    $result = array(
        'success' => false,
    );

    if ($balloon['value'] == '' && !empty($cloud['clouds'])) {
        $cloud_ = array_rand($cloud['clouds']);
        $balloon['value'] = $cloud['clouds'][$cloud_]['answer'];
        $result['value']  = $cloud['clouds'][$cloud_]['answer'];
        $result['success'] = true;

        file_put_contents("../JSON/BalloonInfo.json", json_encode($balloon));
    }

    echo json_encode($result);

    exit;
}

if ($_POST['type'] == 'increase-time') {
    if (!empty($_COOKIE['login'])) {
        echo json_encode(++$users[$_COOKIE['login']]['new-session']['time_alive']);
        file_put_contents("../JSON/UserInfo.json", json_encode($users));
    }
    exit;
}

if ($_POST['type'] == 'decrease-hearts') {
    $result = array(
        'take_heart' => false,
        'game_over' => false,
    );
    if (!empty($_COOKIE['login'])) {
        $result['take_heart'] = true;
        $users[$_COOKIE['login']]['new-session']['lives'] -= 1;
        if ($users[$_COOKIE['login']]['new-session']['lives'] < 1) {
            $result['game_over'] = true;
        }
        file_put_contents("../JSON/UserInfo.json", json_encode($users));
    }

    echo json_encode($result);

    exit;
}

if ($_POST['type'] == 'get-hearts') {
    if (!empty($_COOKIE['login'])) {
        echo json_encode($users[$_COOKIE['login']]['new-session']['lives']);
    }
    exit;
}

if ($_POST['type'] == 'update-score') {
    if (!empty($_COOKIE['login'])) {
        echo json_encode($users[$_COOKIE['login']]['new-session']['score']);
    }
    exit;
}

if ($_POST['type'] == 'game-over') {
    if (!empty($_COOKIE['login'])) {
        $currency = &$users[$_COOKIE['login']]['currency'];
        $new_session = $users[$_COOKIE['login']]['new-session'];
        $last_session = &$users[$_COOKIE['login']]['last-session'];
        $highscore_session = &$users[$_COOKIE['login']]['highscore-session'];
        $all_time_statistics = &$users[$_COOKIE['login']]['all-time-statistics'];

        $currency += $new_session['score'] * 2;

        $last_session = array(
            'score' => $new_session['score'],
            'time_alive' => $new_session['time_alive'],
        );
        if (!empty($highscore_session)) {
            if ($highscore_session['score'] < $new_session['score']) {
                $highscore_session = $last_session;
            }
        } else {
            $highscore_session = $last_session;
        }

        if (!empty($all_time_statistics)) {
            $all_time_statistics['score'] += $new_session['score'];
            $all_time_statistics['time_spent'] += $new_session['time_alive'];
        } else {
            $all_time_statistics = array(
                'score' => $new_session['score'],
                'time_spent' => $new_session['time_alive']
            );
        }

        file_put_contents("../JSON/UserInfo.json", json_encode($users));
    }

    echo true;

    exit;
}
