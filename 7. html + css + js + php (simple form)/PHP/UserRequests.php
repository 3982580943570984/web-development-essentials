<?php
    header("Content-Type: application/json");
    $json = file_get_contents("../JSON/UsersInfo.json", true);
    $user = file_get_contents("php://input", true);

    $jsonData = json_decode($json, true);
    $userData = json_decode($user);
    $type = $userData->type;

    if($type == 'display') {
        echo json_encode($jsonData[$userData->login]['medicine']);
        exit();

    }elseif($type == 'edit') {
        $medicine = &$jsonData[$userData->login]['medicine'][$userData->id];

        $reqInfo = array(
            'success' => true,
            'nameError' => '',
            'amountError' => '',
            'dosageError' => '',
            'firmError' => '',
            'identityError' => ''
        );
    
        $pattern_name = '/\D/';
        $pattern_amount = '/\d/';
        $pattern_dosage = '/\w/';
        $pattern_firm = '/\w/';

        if(!preg_match($pattern_name, $userData->newName)){
            $reqInfo['success'] = false;
            $reqInfo['nameError']  = 'Incorrect name format';
        }

        if(!preg_match($pattern_amount, $userData->newAmount)){
            $reqInfo['success'] = false;
            $reqInfo['amountError']  = 'Incorrect amount format';
        }

        if(!preg_match($pattern_dosage, $userData->newDosage)){
            $reqInfo['success'] = false;
            $reqInfo['dosageError']  = 'Incorrect dosage format';
        }

        if(!preg_match($pattern_firm, $userData->newFirm)){
            $reqInfo['success'] = false;
            $reqInfo['firmError']  = 'Incorrect firm format';
        }

        foreach($jsonData[$userData->login]['medicine'] as $key => $value){
            if( $value['name'] == $userData->newName &&
                $value['form'] == $userData->newForm &&
                $value['amount'] == $userData->newAmount &&
                $value['dosage'] == $userData->newDosage &&
                $value['firm'] == $userData->newFirm ){
                    $reqInfo['success'] = false;
                    $reqInfo['identityError'] = 'Such request already exists';
                }
                
        }
    
        echo json_encode($reqInfo);
        if(!$reqInfo['success']) exit();

        $medicine['name']   = $userData->newName;
        $medicine['form']   = $userData->newForm;
        $medicine['amount'] = $userData->newAmount;
        $medicine['dosage'] = $userData->newDosage;
        $medicine['firm']   = $userData->newFirm;
        file_put_contents("../JSON/UsersInfo.json", json_encode($jsonData));
        exit();

    }elseif($type == 'delete') {
        unset($jsonData[$userData->login]['medicine'][$userData->id]);
        file_put_contents("../JSON/UsersInfo.json", json_encode($jsonData));
        exit();
    }
?>