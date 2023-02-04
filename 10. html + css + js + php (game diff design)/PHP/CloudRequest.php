<?php

header("Content-Type: application/json");

$users = json_decode(file_get_contents("../JSON/UserInfo.json", true), true);
$game = json_decode(file_get_contents("../JSON/GameInfo.json", true), true);
$cloud = json_decode(file_get_contents("../JSON/CloudInfo.json", true), true);
$balloon = json_decode(file_get_contents("../JSON/BalloonInfo.json", true), true);

$screen = &$game['screen'];

function generate_expression($length, $coef)
{
    $number = random_int(1, 10 * $coef);
    $answer = $number;
    $expression = $number;
    for ($i = 1; $i < $length; $i++) {
        $number = random_int(1, 10 * $coef);
        if (random_int(0, 1)) {
            $answer += $number;
            $expression .= ' + ' . $number;
        } else {
            $answer -= $number;
            $expression .= ' - ' . $number;
        }
    }

    return array(
        'wording' => $expression,
        'answer' => $answer,
    );
}

if ($_POST['type'] == 'create-cloud') {

    if (empty($cloud['empty-lines'])) {
        $cloud['empty-lines'] = $screen['lines']['amount'];
    }
    $line_number = array_rand($cloud['empty-lines']);
    unset($cloud['empty-lines'][$line_number]);
    $line_width = $screen['lines']['width'];

    $id = uniqid();

    $x = $screen['right'] - 160;

    $y = $line_number * $line_width;

    $expression = generate_expression(
        $users[$_COOKIE['login']]['difficulty']['expr_length'],
        $users[$_COOKIE['login']]['difficulty']['expr_difficulty']
    );

    $cloud['clouds'][$id] = array(
        'x' =>  $x,
        'y' => $y,
        'answer' => $expression['answer'],
    );

    echo json_encode(array(
        'id' => $id,
        'x' => $x,
        'y' => $y,
        'wording' => $expression['wording'],
    ));

    file_put_contents("../JSON/CloudInfo.json", json_encode($cloud));

    exit;
}

if ($_POST['type'] == 'move-cloud') {

    echo json_encode(array(
        'speed' => $users[$_COOKIE['login']]['difficulty']['cloud_speed'],
        'steps' => $cloud['clouds'][$_POST['id']]['x'] / $users[$_COOKIE['login']]['difficulty']['cloud_speed'],
    ));

    exit;
}

if ($_POST['type'] == 'delete-cloud') {
    if ($cloud['clouds'][$_POST['id']]['answer'] == $balloon['value']) {
        $balloon['value'] = '';
        file_put_contents("../JSON/BalloonInfo.json", json_encode($balloon));
    }
    unset($cloud['clouds'][$_POST['id']]);
    file_put_contents("../JSON/CloudInfo.json", json_encode($cloud));
    echo true;
    exit;
}

if ($_POST['type'] == 'update_distance') {

    $result = array(
        'id' => $_POST['id'],
        'delete_cloud' => false,
        'take_heart' => false,
        'game_over' => false,
    );

    if (!empty($cloud['clouds'][$_POST['id']])) {
        $distance = intval(sqrt(
            pow($_POST['cloud_x'] - $_POST['balloon_x'], 2)
                +
                pow($_POST['cloud_y'] - $_POST['balloon_y'], 2)
        ));

        if ($distance <= 40) {
            $result['delete_cloud'] = true;

            if ($balloon['value'] == $cloud['clouds'][$_POST['id']]['answer']) {
                $balloon['value'] = '';
                if (!empty($_COOKIE['login'])) {
                    $users[$_COOKIE['login']]['new-session']['score'] += 1;

                    if ($users[$_COOKIE['login']]['new-session']['score'] == 5) {
                        $users[$_COOKIE['login']]['difficulty']['expr_length'] = 2;
                    }

                    if ($users[$_COOKIE['login']]['new-session']['score'] == 15) {
                        $users[$_COOKIE['login']]['difficulty']['expr_length'] = 3;
                    }

                    if (intval($users[$_COOKIE['login']]['new-session']['score'] / 5) > $users[$_COOKIE['login']]['difficulty']['expr_difficulty']) {
                        $users[$_COOKIE['login']]['difficulty']['expr_difficulty'] = $users[$_COOKIE['login']]['new-session']['score'] / 5;
                    }

                    file_put_contents("../JSON/UserInfo.json", json_encode($users));
                }
                file_put_contents("../JSON/BalloonInfo.json", json_encode($balloon));
            } else {
                $result['take_heart'] = true;
                if (!empty($_COOKIE['login'])) {
                    $users[$_COOKIE['login']]['new-session']['lives'] -= 1;
                    if ($users[$_COOKIE['login']]['new-session']['lives'] < 1) {
                        $result['game_over'] = true;
                    }
                    file_put_contents("../JSON/UserInfo.json", json_encode($users));
                }
            }
        }
    }

    echo json_encode($result);

    exit;
}
