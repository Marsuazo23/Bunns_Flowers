function loadHeader() {
    /*Definimos el contenido HTML del encabezado en una variable (headerHTML)*/
    const headerHTML = `
        <header>
            <nav>
                <ul class="menu-izquierda">
                    <li class="logo">
                        <img src="imagenes/logo.png" alt="Logo de Bunns Flowers" />
                    </li>
                    <li>
                        <a href="Catalogo.html">Catálogo</a>
                        <ul class="submenu">
                            <li><a href="OfertasyPromociones.html">OFERTAS Y PROMOCIONES</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="Cursos.html">Cursos</a>
                        <ul class="submenu">
                            <li><a href="Galeria.html">Galería</a></li>
                        </ul>
                    </li>            
                </ul>
            </nav>
            <h1>
                Bunns<br>
                <span>Flowers</span>
            </h1>
            <nav>
                <ul class="menu-derecha">
                    <li>
                        <a href="Nosotros.html">Sobre nosotros</a>
                        <ul class="submenu">
                            <li><a href="MisionyVision.html">Misión, Visión y Valores</a></li>
                            <li><a href="Eventos.html">Eventos</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="Contactos.html">Contactos</a>
                        <ul class="submenu">
                            <li><a href="PreguntasF.html">Preguntas y Respuestas</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </header>
    `;
    /*Insertamos el contenido HTML generado en el contenedor con id 'header-container'*/
    document.getElementById('header-container').innerHTML = headerHTML;
}
