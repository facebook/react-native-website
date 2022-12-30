
Facebook
/
reaccionar-nativo-sitio web
Público
Configuración y documentación que alimentan el sitio web de React Native.

reactnative.dev/
Licencia
 MIT, licencias CC-BY-4.0 encontradas
 1.7k estrellas 4.1k horquillas 
Código
Cuestiones
17
Solicitudes de extracción
49
Comportamiento
Proyectos
Seguridad
Perspectivas
facebook/react-nativo-sitio web
Última confirmación
@jovenes
jóvenes
…
5 hours ago
Estadísticas de Git
archivos
LÉAME.md
reactnative.dev ·Licencia CC BY 4.0 Circule el estado del CI Bienvenida a los RR.PP. Sigue a @reactnative
Este repositorio contiene la configuración del sitio web y la documentación que alimenta el sitio web de React Native .

Si está buscando el código fuente del sitio web de React Native Archive, seleccione la archivesucursal.

Contenido
Empezando
Descripción general
Configuración del sitio web
contribuyendo
Licencia
✈️Empezando
requisitos previos
Git .
Nodo (versión 12 o superior) .
Hilo (versión 1.5 o superior) .
Una bifurcación del repositorio (para cualquier contribución) .
Un clon del react-native-websiterepositorio.
Instalación
cd react-native-websitepara ir a la raíz del proyecto.
Ejecutar yarnpara instalar las dependencias del espacio de trabajo del sitio web.
Ejecutando localmente
cd websitepara ir a la parte del sitio web del proyecto.
yarn startpara iniciar el servidor de desarrollo (con tecnología de Docusaurus ) .
Abra el sitio http://localhost:3000/ en su navegador favorito.
📖Descripción general
Si desea contribuir con una edición o una adición a los documentos, lea nuestra guía de estilo antes de escribir nada. Casi todo nuestro contenido se genera a partir de archivos Markdown que puede encontrar en los directorios docs, website/architecturey website/contributing.

Para editar las partes internas de cómo se construye el sitio, es posible que desee familiarizarse con cómo se construye el sitio. El sitio web de React Native es un sitio estático generado con Docusaurus . La configuración del sitio web se puede encontrar en elwebsitedirectorio. Visite el sitio web de Docusaurus para obtener más información sobre todas las opciones de configuración disponibles.

Estructura de directorios
La siguiente es una descripción general de alto nivel de los archivos y carpetas relevantes.

react-native-website/
├── docs/
│   ├── [BASE VERSIONED DOC FILES]
│   └── ...
└── website/
    ├── architecture/
    │   ├── [ARCHITECTURE DOC FILES]
    │   └── ...
    ├── blog/
    │   ├── [BLOG POSTS]
    │   └── ...
    ├── contributing/
    │   ├── [CONTRIBUTING DOC FILES]
    │   └── ...
    ├── core/
    │   ├── [CUSTOM COMPONENTS]
    │   └── ...
    ├── src/
    │   ├── css/
    │   │   ├── [CUSTOM STYLES]
    │   │   └── ...
    │   ├── pages/
    │   │   ├── [STATIC PAGES]
    │   │   └── ...
    │   └── theme/
    │   │   ├── [SWIZZLED COMPONENTS]
    │   │   └── ...
    ├── static/
    │   ├── blog/
    │   │   └── assets/
    │   ├── docs/
    │   │   └── assets/
    │   └── img/
    ├── versioned_docs/
    │   ├── [GENERATED VERSIONED DOC FILES]
    │   └── ...
    ├── versioned_sidebars/
    │   ├── [GENERATED VERSIONED SIDEBARS]
    │   └── ...
    ├── docusaurus.config.js
    ├── package.json
    ├── showcase.json
    ├── sidebars.json
    ├── sidebarsArchitecture.json
    ├── sidebarsContributing.json
    └── versions.json
Fuentes de documentación
Como se mencionó anteriormente, la docscarpeta contiene los archivos de origen de los documentos de las pestañas "Guías", "Componentes" y "API" en el sitio web de React Native (documentos versionados). Los archivos doc para las pestañas "Arquitectura" y "Contribución" se encuentran dentro websitede los directorios respectivos (documentos no versionados/estáticos). En la mayoría de los casos, solo querrá editar los archivos dentro de esos directorios.

Si está agregando un nuevo documento o necesita modificar el orden en que aparecen los documentos en la barra lateral, eche un vistazo a los sidebars.jsonarchivos y en el sidebarsArchitecture.jsondirectorio . Los archivos de la barra lateral contienen una lista de ID de documentos que deben coincidir con los definidos en los metadatos del encabezado (también conocido como frontmatter) de los archivos de descuento de documentos.sidebarsContributing.jsonwebsite

Documentos versionados
Parte del sitio web de React Native está versionado para permitir que los usuarios regresen y vean las Guías o la documentación de referencia de la API para cualquier versión determinada. Por lo general, se genera una nueva versión del sitio web cada vez que hay una nueva versión de React Native. Cuando esto sucede, cualquier cambio realizado en los archivos docsy website/sidebars.jsonse copiará en la ubicación correspondiente dentro de website/versioned_docsy website/versioned_sidebars.

Nota: No edite los archivos generados automáticamente dentro deversioned_docsoversioned_sidebarsa menos que esté seguro de que es necesario. Las ediciones realizadas en versiones anteriores no se propagarán a versiones más nuevas de los documentos versionados.

Docusaurus realiza un seguimiento de la lista de versiones del sitio en el website/versions.jsonarchivo. El orden de las versiones en este archivo debe ser en orden cronológico inverso.

Cortando una nueva versión
cd react-native-websitepara ir a la raíz del proyecto.
cd websitepara ir a la parte del sitio web del proyecto.
Ejecute yarn version:cut <newVersion>dónde <newVersion>se lanzará la nueva versión.
🔧Configuración del sitio web
El archivo de configuración principal del sitio web se puede encontrar en website/docusaurus.config.js. Este archivo le dice a Docusaurus cómo construir el sitio web . Rara vez es necesario editar este archivo.

El coresubdirectorio contiene componentes JavaScript y React que son la parte central del sitio web.

El src/pagessubdirectorio contiene los componentes de React que componen las páginas que no son de documentación del sitio, como la página de inicio.

El src/themesubdirectorio contiene los componentes React swizzled del tema Docusaurus.

El showcase.jsonarchivo contiene la lista de usuarios que están resaltados en el escaparate de React Native.

👏contribuyendo
crear una rama
git checkout maindesde cualquier carpeta en su react-native-websiterepositorio local.
git pull origin mainpara asegurarse de que tiene el código principal más reciente.
git checkout -b the-name-of-my-branchpara crear una sucursal.
reemplácelo the-name-of-my-branchcon un nombre adecuado, comoupdate-animations-page

Haz el cambio
Siga las instrucciones de " Ejecución local ".
Guarde los archivos y compruebe en el navegador.
Algunos cambios pueden requerir un reinicio del servidor para generar nuevos archivos. (¡Las páginas en docssiempre lo hacen!)
Las ediciones de las páginas docssolo serán visibles en la última versión de la documentación, llamada "Siguiente", ubicada debajo de la docs/nextruta.
Visite http://localhost:3000/docs/next/YOUR-DOCS-PAGE para ver su trabajo.

Visite http://localhost:3000/versions para ver la lista de todas las versiones de los documentos.

Prueba el cambio
Si es posible, pruebe cualquier cambio visual en todas las versiones más recientes de los siguientes navegadores:

Chrome y Firefox en el escritorio.
Chrome y Safari en el móvil.
Empujalo
Ejecutar yarn prettiery yarn language:linten ./websiteel directorio para asegurarse de que sus cambios sean consistentes con otros archivos en el repositorio.
git add -A && git commit -m "My message"para organizar y confirmar sus cambios.
reemplazar My messagecon un mensaje de compromiso, comoFixed header logo on Android

git push my-fork-name the-name-of-my-branch
Vaya al repositorio de react-native-website y debería ver ramas enviadas recientemente.
Siga las instrucciones de GitHub.
Describa brevemente sus cambios (en caso de cambios visuales, incluya capturas de pantalla).
📄Licencia
React Native tiene licencia del MIT .

La documentación de React Native tiene licencia Creative Commons .
