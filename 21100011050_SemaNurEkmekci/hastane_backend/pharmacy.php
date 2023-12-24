<?php
header("Access-Control-Allow-Origin: *");
$url = "https://www.konyanobetcieczaneleri.com/";
$source = file_get_contents($url);

libxml_use_internal_errors(true);
$doc = new DOMDocument();
$doc->loadHTML($source);
$xpath = new DOMXpath($doc);

$firms = $xpath->query('//table/tr');
$data = [];

$is_first_row = true; //İlk satır gereksiz
foreach ($firms as $firm) {
    if ($is_first_row) {
        $is_first_row = false;
        continue; //ilk satırı atlamak için. Çünkü ilk satırda başlık var.
    }

    $info = $xpath->query('td', $firm);
    if ($info->length >= 3) {
        $eczane = [
            'ad' => trim(preg_replace('/\s+/', ' ', $info->item(1)->textContent)),
            'adres' => trim(preg_replace('/\s+/', ' ', $info->item(2)->textContent)),
            'telefon' => trim(preg_replace('/\s+/', ' ', $info->item(3)->textContent))
        ];

        if (!empty($eczane['ad']) && !empty($eczane['adres'])) { //Bazen boş satırlar geliyor. Onları temizledim
            $data[] = $eczane;
        }
    }
}

$jsonData = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
echo $jsonData;


?>
