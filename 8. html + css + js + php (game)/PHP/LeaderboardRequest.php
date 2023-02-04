<?php

header("Content-Type: application/json");

$users = json_decode(file_get_contents("../JSON/UserInfo.json", true), true);

if ($_POST['type'] == 'leaderboard') {
    $result = array();
    $scores = array();
    foreach ($users as $user => $user_info) {
        if (!empty($user_info['highscore-session'])) {
            $scores[] = $user_info['highscore-session']['score'];
        }
    }

    rsort($scores);

    for ($i = 0; $i < count($scores); $i++) {
        $temp_user = null;
        $temp_place = null;
        foreach ($users as $user => $user_info) {
            if (!empty($user_info['highscore-session'])) {
                if ($scores[$i] == $user_info['highscore-session']['score']) {
                    $temp_user = $user;
                    $temp_place = $i + 1;
                    break;
                }
            }
        }

        $result[$temp_place] = array(
            'name' => $temp_user,
            'real_name' => $users[$temp_user]['name'],
            'age' => $users[$temp_user]['age'],
            'max_score' => $users[$temp_user]['highscore-session']['score'],
            'max_time_alive' => $users[$temp_user]['highscore-session']['time_alive']
        );
    }

    echo json_encode($result);

    exit;
}
