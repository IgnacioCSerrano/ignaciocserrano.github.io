<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <title>Ejemplo de conexión a MySQL utilizando MySQLi</title>
        <link rel="stylesheet" type="text/css" href="css/print.css" media="print">
        <style>
            table  {
                border: 2px solid #e11111;
                border-collapse: collapse;
            }
            tbody tr:nth-child(even) {
                background-color: #a09c9c;
            }
        </style>
    </head>
    <body>
      
        <?php
        // 1º y 2º PASO: conectar al servidor y seleccionar la BD
        $mysqli = new mysqli("localhost", "root", "jonathan", "sakila");
        if ($mysqli->connect_errno) {
            echo "Falló la conexión a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
        }
        // 3º PASO: ejecutar sentencia SQL
        $sql = "SELECT actor_id,first_name,last_name FROM actor";
        $resultado = $mysqli->query($sql);
        if ($mysqli->errno) {
            echo "<br />Error en el consulta: (" . $mysqli->errno . ")" . $mysqli->error . "<br />";
        }

        // 4º PASO: trabajar con los resultados devueltos
        ?>
        <form action="" method="get">
            <select name="actor_id" onchange="this.form.submit()">
                <option value="-1">Selecciona actor</option>
                <?php while ($fila = $resultado->fetch_assoc()) { ?>
                    <option <?php echo (isset($_REQUEST['actor_id']) && $_REQUEST['actor_id']==$fila['actor_id'])?"selected":""; ?> value="<?php echo $fila['actor_id']; ?>"><?php echo $fila['first_name'] . " " . $fila['last_name']; ?> </option>
                <?php } ?>
            </select>
        </form>
        <?php if (isset($_REQUEST['actor_id']) && $_REQUEST['actor_id'] != "-1") { ?>
            <hr /> 
            <?php
            // 3º PASO: Ejecutar sentencia SQL
            $sql = 'SELECT film.film_id,title, description, release_year, category.name FROM film INNER JOIN film_actor on film.film_id = film_actor.film_id inner join film_category on film.film_id = film_category.film_id INNER JOIN category on film_category.category_id = category.category_id
                where film_actor.actor_id = "' . $_REQUEST['actor_id'] . '" order by category.name';
            $resultado = $mysqli->query($sql);
            if ($mysqli->errno) {
                echo "<br />Error en el consulta: (" . $mysqli->errno . ")" . $mysqli->error . "<br />";
            }
            // 4º PASO: trabajar con el resultado de la sentencia SQL
            ?>
            <p>Número de películas: <?php echo $resultado->num_rows; ?></p>
            <?php
            if ($resultado->num_rows == 0) {
                echo "<h1>No hay películas</h1>";
            } else {
                ?>
                <table>
                    <tr>
                        <th>FILM ID</th>
                        <th>Título</th>
                        <th>Descripción</th>
                        <th>Año</th>
                        <th>Categoría</th>
                    </tr>
                    <tbody>
                        <?php while ($fila = $resultado->fetch_assoc()) { ?>
                            <tr>
                                <td><?php echo $fila['film_id']; ?></td>
                                <td><?php echo $fila['title']; ?></td>
                                <td><?php echo $fila['description']; ?></td>
                                <td><?php echo $fila['release_year']; ?></td>
                                <td><?php echo $fila['name']; ?></td>
                            </tr>
                        <?php } ?>
                    </tbody>
                </table>
            <?php } //fin del else ?>
        <?php } // fin del if ?>
        <?php
        // 5º PASO: cerrar la conexión
        $mysqli->close();
        ?>
    </body>
</html>