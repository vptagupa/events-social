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

<body
    class="antialiased overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-gray-300 scrollbar-track-gray-200">
    @inertia
</body>

</html>