<?php
// Set content type and headers to allow cross-origin requests
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");

// Create a new PDO connection
$pdo = new PDO('sqlite:comments.db');

// Get request method and path
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = explode('/', $path);

switch($method){
  // Handle GET requests
  case 'GET':
    // Check if the book_id is set in the path
    if(isset($path[3]) && isset($path[4])){
        // Create the book_id variable
        $book_id = "/".$path[3]."/".$path[4];
        // Select comments by the book_id
        $stmt = $pdo->prepare('SELECT * FROM comments WHERE book_id = ?');
        $stmt->execute([$book_id]);
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        // Convert results to json format
        echo json_encode($rows);
        break;
    }else{
        // If book_id is not set, select all comments
        $stmt = $pdo->prepare('SELECT * FROM comments');
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($rows);
        break;
    }
  // Handle POST requests    
  case 'POST':
    // Decode data from the request body and store it
    $data = json_decode(file_get_contents('php://input'), true);
    // Insert record into the database
    $stmt = $pdo->prepare('INSERT INTO comments (book_id, username, comment) VALUES (?, ?, ?)');
    $stmt->execute([$data['book_id'], $data['username'], $data['comment']]);

    // Return the lastInsertId in json format
    echo json_encode(['id' => $pdo->lastInsertId()]);
    break;

  default:
    // If a different method is used, return an error
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    break;
}