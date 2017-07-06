<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

require_once __DIR__ . '/vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$app = new Silex\Application();

function getBills()
{
    $json = file_get_contents(__DIR__ . '/bills.json');
    $data = json_decode($json, true);
    return $data['bills'];
}

function findIndexById($id)
{
    $bills = getBills();
    foreach ($bills as $key => $bill) {
        if ($bill['id'] == $id) {
            return $key;
        }
    }
    return false;
}

function writeBills($bills)
{
    $data = ['bills' => $bills];
    $json = json_encode($data);
    file_put_contents(__DIR__ . '/bills.json', $json);
}

function getBillsReceives()
{
    $json = file_get_contents(__DIR__ . '/bills-receives.json');
    $data = json_decode($json, true);
    return $data['bills'];
}

function findReceivesIndexById($id)
{
    $bills = getBillsReceives();
    foreach ($bills as $key => $bill) {
        if ($bill['id'] == $id) {
            return $key;
        }
    }
    return false;
}

function writeBillsReceives($bills)
{
    $data = ['bills' => $bills];
    $json = json_encode($data);
    file_put_contents(__DIR__ . '/bills-receives.json', $json);
}

$app->before(function (Request $request) {
    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : array());
    }
});

$app->get('api/bills', function () use ($app) {
    $bills = getBills();
    return $app->json($bills);
});

$app->get('api/bills/resume', function () use ($app) {
    $resume = [
        'done' => 0,
        'pending' => 0,
        'total' => 0
    ];

    $bills = getBills();

    foreach ($bills as $value) {
        if ($value['done'])
            $resume['done'] += (float)$value['value'];
        else
            $resume['pending'] += (float)$value['value'];

        $resume['total'] += (float)$value['value'];
    }

    return $app->json(['resume' => $resume]);
});

$app->get('api/bills/{id}', function ($id) use ($app) {
    $bills = getBills();
    $bill = $bills[findIndexById($id)];
    return $app->json($bill);
});

$app->post('api/bills', function (Request $request) use ($app) {
    $bills = getBills();
    $data = $request->request->all();
    $data['id'] = rand(100, 100000);
    $bills[] = $data;
    writeBills($bills);
    return $app->json($data);
});

$app->put('api/bills/{id}', function (Request $request, $id) use ($app) {
    $bills = getBills();
    $data = $request->request->all();
    $index = findIndexById($id);
    $bills[$index] = $data;
    $bills[$index]['id'] = (int)$id;
    writeBills($bills);
    return $app->json($bills[$index]);
});

$app->delete('api/bills/{id}', function ($id) {
    $bills = getBills();
    $index = findIndexById($id);
    array_splice($bills, $index, 1);
    writeBills($bills);
    return new Response("", 204);
});

$app->get('api/bills-receives', function () use ($app) {
    $bills = getBillsReceives();
    return $app->json($bills);
});

$app->get('api/bills-receives/resume', function () use ($app) {
    $resume = [
        'done' => 0,
        'pending' => 0,
        'total' => 0
    ];

    $bills = getBillsReceives();

    foreach ($bills as $value) {
        if ($value['done'])
            $resume['done'] += (float)$value['value'];
        else
            $resume['pending'] += (float)$value['value'];

        $resume['total'] += (float)$value['value'];
    }

    return $app->json(['resume' => $resume]);
});

$app->get('api/bills-receives/{id}', function ($id) use ($app) {
    $bills = getBillsReceives();
    $bill = $bills[findReceivesIndexById($id)];
    return $app->json($bill);
});

$app->post('api/bills-receives', function (Request $request) use ($app) {
    $bills = getBillsReceives();
    $data = $request->request->all();
    $data['id'] = rand(100, 100000);
    $bills[] = $data;
    writeBillsReceives($bills);
    return $app->json($data);
});

$app->put('api/bills-receives/{id}', function (Request $request, $id) use ($app) {
    $bills = getBillsReceives();
    $data = $request->request->all();
    $index = findReceivesIndexById($id);
    $bills[$index] = $data;
    $bills[$index]['id'] = (int)$id;
    writeBillsReceives($bills);
    return $app->json($bills[$index]);
});

$app->delete('api/bills-receives/{id}', function ($id) {
    $bills = getBillsReceives();
    $index = findReceivesIndexById($id);
    array_splice($bills, $index, 1);
    writeBillsReceives($bills);
    return new Response("", 204);
});

$app->match("{uri}", function ($uri) {
    return "OK";
})->assert('uri', '.*')->method("OPTIONS");

$app->run();
