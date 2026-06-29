# TrainNetworkGame
Juego de simulación de gestión de via ferroviaria.

Idea


Estructura del código
src - Contiene todo el código fuente de la aplicación.

    assets - Almacena recursos estáticos como imágenes, iconos, sonidos y otros archivos utilizados por la interfaz.

        engine - Contiene todo el motor de simulación del juego, independiente de la interfaz gráfica.

            algorithms - Implementa los algoritmos utilizados por el motor para calcular rutas, horarios y otras operaciones complejas.

                Dijkstra.ts - Calcula la ruta más corta entre estaciones utilizando el algoritmo de Dijkstra.
                RouteFinder.ts - Gestiona la búsqueda y planificación de rutas que seguirán los trenes.
                Scheduler.ts - Organiza la planificación de horarios, salidas y eventos programados.

            core - Contiene las clases principales que controlan el funcionamiento general de la simulación.
                Clock.ts - Gestiona el tiempo interno del simulador y controla el avance de los ticks.
                Game.ts - Representa la partida completa y coordina todos los sistemas del juego.
                SimulationEngine.ts - Ejecuta el ciclo principal de la simulación y actualiza todos los elementos del juego.

            managers - Gestiona los distintos sistemas independientes que forman parte del simulador.
                EconomyManager.ts - Controla ingresos, gastos, presupuesto y demás aspectos económicos.
                IncidentManager.ts - Genera y administra las incidencias que afectan al funcionamiento de la red.
                PassengerManager.ts - Gestiona la creación, movimiento y comportamiento de los pasajeros.
                TrainManager.ts - Controla el movimiento, estado y operaciones de todos los trenes.

            simulation - Contiene clases relacionadas con el estado y la ejecución de la simulación.
                SimulationState.ts - Almacena el estado global de la simulación en cada momento.
                SimulationTick.ts - Define la lógica que se ejecuta en cada tick de la simulación.

        entities - Define las entidades principales que existen dentro del mundo del simulador.
            Line.ts - Representa una línea ferroviaria formada por estaciones y vías.
            Passenger.ts - Representa un pasajero con origen, destino y estado actual.
            Station.ts - Representa una estación ferroviaria con sus características y recursos.
            Track.ts - Representa un tramo de vía que conecta dos estaciones.
            Train.ts - Representa un tren con sus propiedades, estado y ubicación.

        hooks - Contiene hooks personalizados de React para facilitar la comunicación entre la interfaz y el motor.
            useClock.ts - Permite acceder y sincronizar el tiempo de la simulación desde React.
            useSimulation.ts - Facilita el acceso al estado y funcionamiento del motor de simulación.

        services - Contiene servicios auxiliares como guardado de partidas, importación, exportación o acceso a almacenamiento local.

        types - Agrupa los tipos, interfaces y enums compartidos por todo el proyecto.

        ui - Contiene toda la interfaz gráfica desarrollada con React.

            components - Incluye componentes reutilizables como botones, ventanas, tablas o tarjetas.

            layouts - Define la distribución general de las distintas pantallas de la aplicación.

            pages - Contiene las páginas principales que forman la aplicación.
                Game.tsx - Muestra la pantalla principal donde se desarrolla la partida.
                LoadGame.tsx - Permite cargar partidas previamente guardadas.
                Menu.tsx - Representa el menú principal del juego.
                Settings.tsx - Permite modificar la configuración del simulador.

            panels - Contiene los distintos paneles de información mostrados durante la partida, como eventos, economía o estadísticas.

        utils - Agrupa funciones auxiliares reutilizables por todo el proyecto.
            Formatters.ts - Contiene funciones para formatear fechas, números, dinero y otros datos.
            Math.ts - Incluye operaciones matemáticas comunes utilizadas por el simulador.
            Random.ts - Centraliza la generación de valores aleatorios y probabilidades del juego.
            
App.css - Contiene los estilos principales de la aplicación.
App.tsx - Componente raíz que organiza la interfaz general del simulador.
index.css - Define los estilos globales compartidos por toda la aplicación.
main.tsx - Punto de entrada de la aplicación donde se inicializa React y se monta el proyecto.
