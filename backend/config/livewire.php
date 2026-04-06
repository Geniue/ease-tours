<?php

return [

    'temporary_file_upload' => [

        'disk' => null,

        'directory' => null,

        'middleware' => null,

        'preview_mimes' => [
            'png', 'gif', 'bmp', 'svg', 'wav', 'mp4',
            'mov', 'avi', 'wmv', 'mp3', 'm4a',
            'jpg', 'jpeg', 'mpga', 'webp', 'wma',
            'webm', 'ogg',
        ],

        'max_upload_time' => 5,

        'cleanup' => true,

        /*
        |--------------------------------------------------------------------------
        | Max upload size (KB)
        |--------------------------------------------------------------------------
        | 128 MB = 131072 KB. Make sure php.ini also allows this:
        |   upload_max_filesize = 128M
        |   post_max_size = 128M
        */
        'rules' => ['required', 'file', 'max:131072'],

    ],

];
