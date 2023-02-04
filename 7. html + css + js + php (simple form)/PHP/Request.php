<?php
    header("Content-Type: application/json");
    $json = file_get_contents("../JSON/UsersInfo.json", true);
    $request = file_get_contents("php://input", true);

    $jsonData = json_decode($json, true);
    $requestData = json_decode($request);

    $reqInfo = array(
        'success' => true,
        'nameError' => '',
        'formError' => '',
        'amountError' => '',
        'dosageError' => '',
        'firmError' => '',
        'identityError' => ''
    );

    $pattern_name = '/\D/';
    $pattern_amount = '/\d/';
    $pattern_dosage = '/\w/';
    $pattern_firm = '/\w/';

    if(!preg_match($pattern_name, $requestData->name)){
        $reqInfo['success'] = false;
        $reqInfo['nameError']  = 'Incorrect name format';
    }

    if(empty($requestData->form)){
        $reqInfo['success'] = false;
        $reqInfo['formError'] = 'Medicine form required';
    }

    if(!preg_match($pattern_amount, $requestData->amount)){
        $reqInfo['success'] = false;
        $reqInfo['amountError']  = 'Incorrect amount format';
    }

    if(!preg_match($pattern_dosage, $requestData->dosage)){
        $reqInfo['success'] = false;
        $reqInfo['dosageError']  = 'Incorrect dosage format';
    }

    if(!preg_match($pattern_firm, $requestData->firm)){
        $reqInfo['success'] = false;
        $reqInfo['firmError']  = 'Incorrect firm format';
    }

    foreach($jsonData[$requestData->login]['medicine'] as $key => $value){
        if( $value['name'] == $requestData->name &&
            $value['form'] == $requestData->form &&
            $value['amount'] == $requestData->amount &&
            $value['dosage'] == $requestData->dosage &&
            $value['firm'] == $requestData->firm ){
                $reqInfo['success'] = false;
                $reqInfo['identityError'] = 'Such request already exists';
            }
            
    }

    echo json_encode($reqInfo);
    if(!$reqInfo['success']) exit();

    $id = array_key_last($jsonData[$requestData->login]['medicine']) + 1;

    $someArray = array(
        'name' => $requestData->name,
        'form' => $requestData->form,
        'amount' => $requestData->amount,
        'dosage' => $requestData->dosage,
        'firm' => $requestData->firm
    );

    if(empty($jsonData[$requestData->login]['medicine'][$id]['name'])){
        $jsonData[$requestData->login]['medicine'][$id] = $someArray;
    }else{
        echo 'Order with such name already exist';
    }
    
    file_put_contents("../JSON/UsersInfo.json", json_encode($jsonData));
?>