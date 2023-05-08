<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");

$pdo = new PDO('sqlite:comments.db');
$pdo->exec("CREATE TABLE IF NOT EXISTS forms (id INTEGER PRIMARY KEY, username TEXT, favorite_subject TEXT, favorite_book_title TEXT)");

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = explode('/', $path);

switch ($method) {
  case 'GET':
    if (isset($path[3]) && isset($path[4])) {
        $book_id = "/".$path[3]."/".$path[4];
        $stmt = $pdo->prepare('SELECT * FROM comments WHERE book_id = ?');
        $stmt->execute([$book_id]);
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($rows);
        break;
    } else {
        $stmt = $pdo->prepare('SELECT * FROM comments');
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($rows);
        break;
    }
  case 'POST':
    $data = json_decode(file_get_contents('php://input'), true);
    // file_put_contents('/var/www/myapp/log.txt', print_r($data, true));
    $stmt = $pdo->prepare('INSERT INTO comments (book_id, username, comment) VALUES (?, ?, ?)');
    $stmt->execute([$data['book_id'], $data['username'], $data['comment']]);

    echo json_encode(['id' => $pdo->lastInsertId()]);
    break;

  default:
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    break;
}
