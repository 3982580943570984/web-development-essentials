<?php
    header("Content-Type: application/json");
    $db = file_get_contents("../JSON/UsersInfo.json", true);

    $db_data = json_decode($db, true);

    $result = false;

    if($_POST['type'] == 'log-in'){
        foreach($db_data as $key => $value){
            if($_POST['login'] == $key && $_POST['password'] == $value['password']){
                $db_data[$_COOKIE['login']]['online'] = true;
                $result = true;
                echo json_encode($result);

                file_put_contents("../JSON/UsersInfo.json", json_encode($db_data));
                exit;
            }
        }
    }

    if($_POST['type'] == 'log-out'){
        if(!empty($_COOKIE['login'])){
            $db_data[$_COOKIE['login']]['online'] = false;  
        }
        $result = true;
        echo json_encode($result);

        file_put_contents("../JSON/UsersInfo.json", json_encode($db_data));
        exit;
    }

    echo json_encode($result);

?>