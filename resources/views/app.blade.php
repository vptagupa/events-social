<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Template</title>
    @routes
    @vite(['resources/js/app.jsx'])
    @viteReactRefresh
    @inertiaHead
</head>

<body class="antialiased">
    @inertia
</body>

</html>