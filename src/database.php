<?php

include 'vendor/autoload.php';

header('Content-Type: application/json');

const ACCESS_FILE = '.mlab.access';

if (!file_exists(ACCESS_FILE)) {
		echo '{"error": true, "message": "Please create file \".mlab.access\" with valid API key."}';
		die;
	}

	$apiKey = file_get_contents(ACCESS_FILE);

$api = new RestClient([
    'base_url' => "https://api.mlab.com/api/1"
]);

if (isset($_GET['subject'])) {
	$subject = $_GET['subject'];

	switch ($subject) {
		case 'project':
			$result = 
				$api->get("databases/aecs/collections/project", [
					'apiKey' => $apiKey
				]);
			break;
		case 'team':
			$result = 
				$api->get("databases/aecs/collections/team", [
					'apiKey' => $apiKey
				]);
		break;
		default:
			echo '{"error": true, "message": "Please provide valid \"subject\" parameter."}';
			die;
	}

	if ($result->info->http_code == 200) {
	    echo $result->response;
	    die;
	}
}

echo '{"error": true, "message": "Can\'t process the request."}';
die;
