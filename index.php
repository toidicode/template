<?php
set_time_limit(300);
$data = glob(__DIR__ . '/*', GLOB_ONLYDIR);
$i = 0;
foreach ($data as $value) {
    // rename($value, strtolower(str_replace('_', '-', $value)));

    // $file=@fopen($value . 'readme.md', 'w+');
    // fwrite($file, 'https://toidicode.com');
    // fclose($file);
    // unset($file);

    if ($i > 27) {
        $zip = new ZipArchive();
        $zip->open($value . '.zip', ZipArchive::CREATE | ZipArchive::OVERWRITE);

        $files = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($value),
            RecursiveIteratorIterator::LEAVES_ONLY
        );

        foreach ($files as $name => $file) {
            if (!$file->isDir()) {
                $filePath     = $file->getRealPath();
                $relativePath = substr($filePath, strlen($value) + 1);

                $zip->addFile($filePath, $relativePath);
            }
        }

        $zip->close();
        unset($zip);
    }
    $i++;
    // die();
}
var_dump($data);
die();
