reactnative.dev ·Licencia CC BY 4.0 Estado del círculo CI Relaciones públicas bienvenidos Sigue a @reactnative
Este repositorio contiene la configuración del sitio web y la documentación que impulsa el sitio web React Native .

Si está buscando el código fuente del sitio web React Native Archive, seleccione la archiverama.

Contenido
Empezando
Visión general
Configuración del sitio web
Contribuyendo
Licencia
✈️ Empezando
Prerrequisitos
Git .
Nodo (versión 12 o superior) .
Yarn (versión 1.5 o superior) .
Una bifurcación del repositorio (para cualquier contribución) .
Un clon del react-native-websiterepositorio.
Instalación
cd react-native-website para ir a la raíz del proyecto.
yarn para instalar las dependencias del espacio de trabajo del sitio web.
Ejecutando localmente
cd website para ir a la parte del sitio web del proyecto.
yarn startpara iniciar el servidor de desarrollo (impulsado por Docusaurus ) .
open http://localhost:3000/ para abrir el sitio en su navegador favorito.
📖 Visión general
Si desea contribuir con una edición o adición a los documentos, lea nuestra guía de estilo antes de escribir algo. Todo nuestro contenido se genera a partir de archivos de rebajas que puede encontrar en el docsdirectorio.

Para editar los aspectos internos de cómo se construye el sitio, es posible que desee familiarizarse con cómo se construye el sitio. El sitio web React Native es un sitio estático generado con Docusaurus . La configuración del sitio web se puede encontrar en elwebsitedirectorio. Visite el sitio web de Docusaurus para obtener más información sobre todas las opciones de configuración disponibles.

Estructura de directorios
La siguiente es una descripción general de alto nivel de archivos y carpetas relevantes.

react-native-website/
├── docs/
│   ├── accessibility.md
│   └── ...
└── website/
    ├── blog/
    │   ├── 2015-03-26-react-native-bringing-modern-web-techniques-to-mobile.md
    │   └── ...
    ├── core/
    ├── pages/
    │   └── en/
    ├── src/
    │   ├── css/
    │   │   ├── customTheme.scss
    │   │   └── ...
    │   ├── pages/
    │   │   ├── index.js
    │   │   └── ...
    │   └── theme/
    ├── static/
    │   ├── blog/
    │   │   └── assets/
    │   ├── docs/
    │   │   └── assets/
    │   ├── img/
    │   └── js/
    ├── versioned_docs/
    │   ├── version-0.60/
    │   └── ...
    ├── versioned_sidebars/
    │   ├── version-0.60-sidebars.json
    │   └── ...
    ├── docusaurus.config.js
    ├── package.json
    ├── showcase.json
    ├── sidebars.json
    └── versions.json
Fuentes de documentación
Como se mencionó anteriormente, la docscarpeta contiene los archivos fuente para todos los documentos en el sitio web React Native. En la mayoría de los casos, querrá editar los archivos dentro de este directorio. Si está agregando un nuevo documento o necesita modificar el orden en que aparecen los documentos en la barra lateral, eche un vistazo al sidebars.jsonarchivo en el websitedirectorio. El archivo de barras laterales contiene una lista de identificaciones de documentos que deben coincidir con las definidas en los metadatos del encabezado (también conocido como frontmatter) de los archivos de rebajas de documentos.

Documentos versionados
El sitio web React Native está versionado para permitir a los usuarios regresar y ver los documentos de referencia de la API para cualquier versión dada. Por lo general, se genera una nueva versión del sitio web cada vez que hay una nueva versión de React Native. Cuando esto sucede, los cambios realizados en los archivos docsy website/sidebars.jsonse copiarán en la ubicación correspondiente dentro de website/versioned_docsy website/versioned_sidebars.

Nota: No edite los archivos generados automáticamente dentro deversioned_docso aversioned_sidebarsmenos que esté seguro de que es necesario. Las ediciones realizadas en versiones anteriores no se propagarán a las versiones más recientes de los documentos.

Docusaurus realiza un seguimiento de la lista de versiones del sitio en el website/versions.jsonarchivo. El orden de las versiones en este archivo debe estar en orden cronológico inverso.

Cortar una nueva versión
cd react-native-website para ir a la raíz del proyecto.
cd website para ir a la parte del sitio web del proyecto.
Ejecute yarn version:cut <newVersion>donde <newVersion>se lanza la nueva versión.
🔧 Configuración del sitio web
El archivo de configuración principal del sitio web se puede encontrar en website/docusaurus.config.js. Este archivo le dice a Docusaurus cómo construir el sitio web . Rara vez es necesario realizar modificaciones en este archivo.

El coresubdirectorio contiene componentes JavaScript y React que son la parte central del sitio web.

El src/pagessubdirectorio contiene los componentes de React que componen las páginas que no son de documentación del sitio, como la página de inicio.

El src/themesubdirectorio contiene los componentes React combinados del tema Docusaurus.

El showcase.jsonarchivo contiene la lista de usuarios que están resaltados en el escaparate de React Native.

👏 Contribuyendo
Crea una sucursal
git checkout masterdesde cualquier carpeta de su react-native-websiterepositorio local .
git pull origin master para asegurarse de tener el código principal más reciente.
git checkout -b the-name-of-my-branch para crear una rama.
reemplácelo the-name-of-my-branchcon un nombre adecuado, comoupdate-animations-page

Haz el cambio
Siga las instrucciones de " Ejecución local ".
Guarde los archivos y compruébelos en el navegador.
Algunos cambios pueden requerir un reinicio del servidor para generar nuevos archivos. (¡Las páginas docssiempre lo hacen!)
Las ediciones en las páginas de docssolo serán visibles en la última versión de la documentación, llamada "Siguiente", ubicada debajo de la docs/nextruta.
Visite http: // localhost: 3000 / docs / next / YOUR-DOCS-PAGE para ver su trabajo.

Visite http: // localhost: 3000 / versions para ver la lista de todas las versiones de los documentos.

Prueba el cambio
Si es posible, pruebe los cambios visuales en todas las últimas versiones de los siguientes navegadores:

Chrome y Firefox en el escritorio.
Chrome y Safari en dispositivos móviles.
Empujalo
Ejecute yarn prettiery yarn language:linten el ./websitedirectorio para asegurarse de que sus cambios sean consistentes con otros archivos en el repositorio.
git add -A && git commit -m "My message" para organizar y confirmar sus cambios.
reemplazar My messagecon un mensaje de confirmación, comoFixed header logo on Android

git push my-fork-name the-name-of-my-branch
Vaya al repositorio react-native-website y debería ver las ramas enviadas recientemente.
Siga las instrucciones de GitHub.
Describe brevemente tus cambios (en caso de cambios visuales, incluye capturas de pantalla).
📄 Licencia
React Native tiene licencia del MIT .

La documentación de React Native tiene licencia Creative Commons .
