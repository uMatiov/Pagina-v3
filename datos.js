const DATOS_CAMPANA = {
  personajes: [
    {
      nombre: "Mob",
      rol: "Protagonista",
      imagen: "img/mob",
      encuadre: "center 15%",
      resumen: "Escribe aquí un mini resumen de 2 o 3 líneas sobre su origen, personalidad y qué lo mueve dentro del grupo.",
      rasgoClave: "Por definir",
      estadoActual: "Activo en campaña",
      vinculos: [
        {
          nombre: "Alexander",
          relacion: "Compañero de grupo"
        },
        { nombre: "Gaspar", relacion: "Figura paterna y padre adoptivo; lo rescató de niño y siempre lo visita en su cumpleaños" },
        { nombre: "Ophelia", 
          relacion: "Compañera de trabajo (Ala de Adal)" 
        },
        { nombre: "Adal Wanderley", relacion: "Duque y fundador de «Howl of hope»; trabaja para él como una de sus Alas junto a Ophelia." },
        { nombre: "Raymundo", relacion: "Su mentor actual y compañero en «Howl of hope»" },
      ]
    },
    {
      nombre: "Alexander",
      rol: "Protagonista",
      imagen: "img/alexander",
      encuadre: "center 15%",
      resumen: "Impulsivo y directo, suele meterse en problemas sociales que sus compañeros terminan resolviendo.",
      rasgoClave: "Impredecible en trato social",
      estadoActual: "Activo en campaña",
      vinculos: [
        { nombre: "Emily Osler", relacion: "Expareja; se reunieron tras la destrucción de Río y ella decidió dejar su relación atrás para seguir adelante" },
        { nombre: "Kei Knight", relacion: "Antiguo Alexander Número 4; desprecia al resto de los discípulos de Djork" },
        { nombre: "Alexander Djork", relacion: "Su maestro en la Tríada; de quien heredó el nombre clave «Alexander» y su entrenamiento" },
        { nombre: "Robin",  relacion: "Aliado en el festival"}
        ,{ nombre: "Adal Wanderley", relacion: "Duque supervisor de la Tríada y fundador de «Howl of hope»; aliado de alta confianza (+60%) al que ayudaron a liberar de Zhi'zhak." },
      ]
    },
    {
      nombre: "Clavel",
      rol: "Protagonista",
      imagen: "img/clavel",
      encuadre: "center 15%",
      resumen: "Atenta a los detalles y al estilo, mantiene la calma del grupo aunque no duda en intervenir si alguien lo necesita.",
      rasgoClave: "Observadora y protectora",
      estadoActual: "Activo en campaña",
      vinculos: [
        {
          nombre: "Marquitas",
          relacion: "Pequeño compañero bajo su cuidado"
        },
        {
          nombre: "calipso",
          relacion: "Vínculo cercano en el cuidado de Marquitas"
        },
        { nombre: "Saly Abara", relacion: "Amigo y pana; Simba juguetón pero leal que da todo por sus amigos" },
      ]
    },
    {
      nombre: "Kris",
      rol: "Protagonista",
      imagen: "img/kris",
      encuadre: "center 15%",
      resumen: "Escribe aquí su personalidad, habilidades características y vínculos principales con el resto de la mesa.",
      rasgoClave: "Por definir",
      estadoActual: "Activo en campaña",
      vinculos: [
        ,{ nombre: "Adam Arc (Muerto)", relacion: "Su antiguo mentor; un sabio Nuwisha poco convencional asesinado por Kei" },
        { nombre: "Kei Knight", relacion: "Expareja; tuvieron una relación pasajera en el pasado, además de ser el asesino de su mentor Adam Arc" },
        { nombre: "Adal Wanderley", relacion: "Duque supervisor de la Tríada y fundador de «Howl of hope»; aliado de alta confianza (+60%) al que ayudaron a liberar de Zhi'zhak." },
      ]
    },
    {
      nombre: "Robin",
      rol: "Protagonista",
      imagen: "img/robin",
      encuadre: "center 15%",
      resumen: "Escribe aquí su papel dentro de las misiones, conflictos personales y evolución durante los arcos.",
      rasgoClave: "Por definir",
      estadoActual: "Activo en campaña",
      vinculos: [
        {
          nombre: "Emily Osler",
          relacion: "Cercana durante el festival"
        }
        , 
       { nombre: "Hiroshi Ito", relacion: "Padre adoptivo y maestro de medicina; le enseñó sobre su naturaleza como Garou Metis" },
        { nombre: "Adal Wanderley", relacion: "Duque supervisor de la Tríada y fundador de «Howl of hope»; aliado de alta confianza (+60%) al que ayudaron a liberar de Zhi'zhak." },
      ]
    },
    {
      nombre: "Morgan",
      rol: "Protagonista",
      resumen: "Escribe aquí su historia breve, estilo y papel dentro de la campaña.",
      rasgoClave: "Doble forma (Hombre / Femenina)",
      estadoActual: "Activo en campaña",
      vinculos: [{ nombre: "Asher Bauer", relacion: "Secuestrada por su hermano Nisha para ayudarla; nueva aliada en Río" }],
      formas: [
        {
          etiqueta: "Hombre",
          imagen: "img/morgan_hombre",
          encuadre: "center 15%",
          resumen: "Descripción o actitud de Morgan en su forma masculina."
        },
        {
          etiqueta: "Femenina",
          imagen: "img/morgan_femenina",
          encuadre: "center 15%",
          resumen: "Descripción o actitud de Morgan en su forma femenina."
        } , { nombre: "Adal Wanderley", relacion: "Duque supervisor de la Tríada y fundador de «Howl of hope»; aliado de alta confianza (+60%) al que ayudaron a liberar de Zhi'zhak." },
      ]
    },
    {
      nombre: "Rubén",
      rol: "Director de Mundo",
      imagen: "img/ruben",
      encuadre: "center 15%",
      resumen: "Arquitecto del mundo, los conflictos políticos, los rumores de los periódicos y cada aliado o rival que cruza el camino del grupo.",
      rasgoClave: "Narrador del mundo",
      estadoActual: "Director de campaña",
      vinculos: []
    }
  ],

  codice: [
    {
      nombre: "Adal Wanderley",
      categoria: "NPC",
      imagen: "img/adal_wanderley",
      encuadre: "center 20%",
      aparicionCap: 1,
      resumenCorto: "Garou Aullador Blanco (antes Danzante de la Espiral Negra) de 25 años, duque, estudiante de derecho y fundador de «Howl of hope». Tras ser separado de Zhi'zhak y ver la destrucción de Río, creó la fundación para ayudar a los afectados y busca pistas de Casval para salvar a su hermano Calipso.",
      ficha: {
        Raza: "Garou Aullador Blanco (Antes Danzante de la Espiral Negra)",
        Género: "Masculino",
        Edad: "25 años",
        Altura: "1.81 m",
        Nacionalidad: "Brasileña",
        Cumpleaños: "20 de Julio (Géminis)",
        Pareja: "Ninguna",
        Ocupación: "Duque y fundador de «Howl of hope»",
        Confianza: "+60%"
      },
      descripcion: [
        "Uno de los últimos miembros vivos de la familia Wanderley junto a Casval. Es uno de los duques encargados del equipo enviado por la Tríada y estudia en la Facultad de Derecho de la Pontificia Universidad Católica de Río de Janeiro. Aunque parece muy nervioso ante los demás, es bastante amable y eso no le impide ayudar a las personas ni pensar con frialdad en situaciones críticas.",
        "Como supervisor del equipo enviado por la Tríada para proteger Río de Janeiro, siempre intenta apoyarlos en todo lo que puede, aunque a menudo se siente inútil detrás de un escritorio.",
        "Luego de ser separado de Zhi'zhak gracias a Calipso y el Equipo de Río, y tras presenciar la destrucción de Río de Janeiro por los juegos de Goenitz, tomó la decisión de iniciar la fundación «Howl of hope» para ayudar en distintos países a las personas afectadas por el terrorismo reciente y las criaturas sobrenaturales emergentes, además de preparar un equipo especial para neutralizar estas amenazas bajo la supervisión de la Tríada.",
        "Actualmente impulsa este proyecto con la ayuda de algunos conocidos y nuevos miembros, mientras espera encontrar pistas sobre Casval Wanderley para poder salvar a su hermano Calipso."
      ]
    },
   {
      nombre: "Emily Osler",
      categoria: "NPC",
      imagen: "img/emily_osler",
      encuadre: "center 20%",
      aparicionCap: null,
      resumenCorto: "Humana brasileña-irlandesa de 21 años, estudiante de gastronomía y hermana menor del Dr. William Osler. Relajada, amable y cariñosa; tras la destrucción de Río y reunirse con Alexander, decidió dejar su relación atrás y abrirse a nuevos panoramas.",
      ficha: {
        Raza: "Humana",
        Género: "Femenino",
        Edad: "21 años",
        Altura: "1.54 m",
        Nacionalidad: "Brasileña / Irlandesa",
        Cumpleaños: "13 de junio",
        Pareja: "Ninguna actualmente",
        Ocupación: "Estudiante de gastronomía",
        Confianza: "20%"
      },
      descripcion: [
        "Hermana menor del Doctor William Osler y totalmente opuesta a él, siendo relajada, amable y cariñosa en muchos aspectos. Estudia gastronomía por pasión y también para cuidar a su hermano, cocinándole y llevándole comida al hospital cada vez que hace turnos extras. Bajo la perspectiva de William, su mayor defecto es no poder ver las cosas malas de las personas.",
        "Luego de volver de vacaciones con su hermano y presenciar la destrucción de Río de Janeiro quedó muy preocupada; sin embargo, tras reunirse con Alexander empezó a ver nuevos panoramas y decidió dejar su relación atrás."
      ]
    },
    {
      nombre: "Calipso",
      categoria: "NPC",
      imagen: "img/calipso",
      encuadre: "center 20%",
      aparicionCap: null,
      resumenCorto: "Antiguo hombre lobo Danzante de la Espiral Negra convertido en humano mago, miembro de «Los más cercanos a Dios» y hermano mayor de Adal Wanderley. Busca volver humano a Adal para liberarlo de la influencia del Wyrm.",
      ficha: {
        Alias: "Wander / Calipso / William / Mateus",
        Raza: "Antes hombre lobo / Actualmente Humano Mago",
        Género: "Masculino",
        Edad: "Desconocida",
        Altura: "1.82 m",
        Nacionalidad: "Brasileño",
        Cumpleaños: "26 de Julio",
        Pareja: "Desconocido",
        Ocupación: "Miembro de la iglesia / Duque / Estudiante",
        Hobbies: "Ayudar a las personas",
        Gustos: "Esculpir, comer carne y frutas, tener compañía",
        Disgustos: "Estar siempre encerrado, las verduras"
      },
      descripcion: [
        "Conocido como Calipso, es miembro de la iglesia de «Los más cercanos a Dios» y supuesto hermano mayor de Adal Wanderley. Aunque no lo parezca, muy pocas personas saben cómo se ve su rostro en realidad, con contadas excepciones como Alexander, Clavel y Eva, además de algunos miembros de la iglesia como Rafael y Leu.",
        "Desde que conoció al equipo de Río de Janeiro logró hacer amigos como Alexander, Clavel, Emily, Eva y Robin. No todos conocen quién es realmente, pero espera poder revelárselo una vez cumpla sus intenciones.",
        "Tras hablar con Clavel, confesó que su objetivo es volver humano a Adal para que pueda vivir tranquilamente y libre de la influencia del Wyrm: ambos nacieron como Danzantes de la Espiral Negra, por lo que solo volviéndose humanos pueden vivir en paz sin estar bajo la influencia del mal ni con miedo a ser cazados.",
        "Fue atacado por Mob y Ophelia con órdenes de capturarlo o asesinarlo, todo bajo el mandato de Adal influenciado por el Wyrm. Actualmente se prepara para ejecutar su plan y salvar a su hermano.",
        "Dato curioso: a diferencia de Adal, nunca ha estado en una relación romántica con nadie, y únicamente Alexander, Leu y su esposo saben cómo se llama en realidad."
      ]
    },
    {
      nombre: "David Hernández",
      categoria: "NPC",
      imagen: "img/david_hernandez",
      encuadre: "center 20%",
      aparicionCap: 1,
      resumenCorto: "Gurahl cubano-brasileño de 57 años y uno de los dos secretarios de Adal Wanderley, a quien quiere casi como a un hijo. Dejó su puesto de sirviente en jefe a su hija mayor y a su hijo menor como bibliotecario de Adal.",
      ficha: {
        Raza: "Gurahl",
        Género: "Masculino",
        Edad: "57 años",
        Altura: "1.84 m",
        Nacionalidad: "Cubana / Brasileña",
        Cumpleaños: "9 de octubre (Virgo)",
        Pareja: "Ninguna",
        Ocupación: "Secretario",
        Confianza: "35%"
      },
      descripcion: [
        "Lleva bastante tiempo conociendo a Adal, lo que ha creado un enorme nivel de confianza y cariño entre ambos, hasta el punto de que David lo considera casi como a un hijo y es incapaz de negarse incluso a sus peticiones más extremas.",
        "Tras los sucesos de los juegos de Goenitz y el ataque de Casval hacia Calipso, reflexiona preocupado sobre el futuro de Casval y Adal Wanderley, dudando si las decisiones que ambos tomaron terminarán por convertirlos en enemigos o si podrán seguir siendo hermanos.",
        "Actualmente se ha convertido en uno de los dos secretarios de Adal, dejando su antigua labor de sirviente en jefe a su hija mayor y a su hijo menor como bibliotecario de Adal."
      ]
    },
    {
      nombre: "Casval Warderley",
      categoria: "NPC",
      imagen: "img/casval_warderley",
      encuadre: "center 20%",
      aparicionCap: null,
      resumenCorto: "Humano brasileño de 25 años, miembro CEO de PENTEX y hermano de Adal. Tras años fuera, regresó para provocar el enfrentamiento entre Adal y Calipso, casi matar a su objetivo y lanzar un nuevo proyecto de clonación en PENTEX.",
      ficha: {
        Raza: "Humano",
        Género: "Masculino",
        Edad: "25 años",
        Altura: "1.83 m",
        Nacionalidad: "Brasileña",
        Cumpleaños: "Desconocido",
        Pareja: "Ninguna",
        Ocupación: "Miembro CEO de PENTEX",
        Confianza: "-25%"
      },
      descripcion: [
        "Luego del fallecimiento de su padre y su hermana, tomó la decisión de viajar por el mundo buscando encontrar paz; no obstante, el odio y el desprecio siempre predominaron, llevándolo a entrar en PENTEX. Dentro de la organización escaló rápidamente hasta convertirse en ejecutivo, logrando acceder a viejos archivos del Laboratorio de Río y descubriendo la poca información que quedaba sobre el origen de su hermano y el asesino de sus padres.",
        "Tras tomarse un tiempo para trazar un plan y pasar unos años fuera, volvió para el carnaval de Río, causando una gran sorpresa a su hermano menor y a David. Tras negociar con Kei, María y miembros de los barrios bajos, inició su plan acelerando el deterioro mental de Adal para asegurar la futura pelea entre hermanos.",
        "Después de desgastar todo lo posible a Calipso y tras la pelea contra Adal, Casval ejecutó su venganza dejando casi muerto a su objetivo y logrando escapar. Tras huir con partes del cuerpo y objetos de su enemigo, contactó al viejo científico a cargo del programa de clonación de Río de Janeiro para proponerle un nuevo proyecto, el último impulso con el que ascendería a lo más alto de PENTEX."
      ]
    },
    {
      nombre: "Miqo",
      categoria: "NPC",
      imagen: "img/miqo",
      encuadre: "center 20%",
      aparicionCap: null,
      resumenCorto: "Sirvienta brasileña de 22 años de la familia Wanderley y actual secretaria personal de Casval. Tras ser rescatada por él de los escombros de la mansión, aceptó trabajar a su lado viéndolo como el único futuro del apellido Wanderley.",
      ficha: {
        Raza: "Desconocida",
        Género: "Femenina",
        Edad: "22 años",
        Altura: "1.54 m",
        Nacionalidad: "Brasileña",
        Cumpleaños: "Desconocido",
        Pareja: "Ninguna",
        Ocupación: "Secretaria personal de Casval",
        Confianza: "0%"
      },
      descripcion: [
        "Junto a David, parece ser una de las únicas sirvientas originales que siguen ligadas a la familia Wanderley. Desde pequeña se dedicó a cuidar la casa convirtiéndose en una fiel servidora, aunque suele ser muy reservada con todos los habitantes del hogar, incluido el propio Adal. No se sabe si conoce los mismos secretos que David, pero independientemente de los secretismos y mentiras siempre permanece donde esté la familia Wanderley.",
        "Tras el regreso de Casval sirvió como su informante personal sobre todo lo que sucedía en la vida de Adal, sin imaginar las consecuencias que aquello traería hasta que fue demasiado tarde.",
        "Luego del ataque de ira de Adal y de quedar atrapada bajo los escombros de la mansión, fue rescatada por Casval, quien la convenció de trabajar a tiempo completo para él; oferta que aceptó con gratitud al verlo como el único futuro posible para el apellido Wanderley."
      ]
    },
    {
      nombre: "Mara Lavallée",
      categoria: "NPC",
      imagen: "img/mara_lavallee",
      encuadre: "center 20%",
      aparicionCap: null,
      resumenCorto: "Comisionada de policía brasileña de 30 años que prefiere el trabajo de campo antes que el papeleo. Exesposa de Raymundo; tras la destrucción de Río llegó a un acuerdo para proveer información al duque Adal.",
      ficha: {
        Raza: "Humana",
        Género: "Femenino",
        Edad: "30 años",
        Altura: "1.68 m",
        Nacionalidad: "Brasileña",
        Cumpleaños: "9 de septiembre (Leo)",
        Pareja: "Desconocido",
        Ocupación: "Comisionada de Policía",
        Confianza: "45%"
      },
      descripcion: [
        "Jefa de la policía; pese a que debería encargarse del papeleo y la dirección administrativa, prefiere mantenerse como agente de campo y delega todo el trabajo que considera aburrido en Bryon. Es una oficial fuerte y sin pelos en la lengua a la que no le importa romper algunas reglas o ayudar sin permiso siempre que se logre atrapar al criminal.",
        "Estuvo casada con Raymundo hace un par de años, matrimonio que se arruinó por la falta de sinceridad de él tras haberla dejado sola junto a su hija durante un año sin comunicarse ni responder sus cartas. Aunque lograron trabajar juntos sin llevarse mal, los nuevos secretos de Raymundo volvieron a generar distancia entre ambos, situación que arreglaron recientemente para poder seguir avanzando con sus vidas.",
        "Luego de la destrucción de Río de Janeiro decidió tomar vacaciones junto a su hija y su madre mientras inicia la reconstrucción de la ciudad. Tiempo después de la disolución del equipo de Río recibió una propuesta laboral del duque Adal que rechazó, aunque llegaron a un acuerdo para proporcionarle información."
      ]
    },
   {
      nombre: "Raymundo",
      categoria: "NPC",
      imagen: "img/raymundo",
      encuadre: "center 20%",
      aparicionCap: null,
      resumenCorto: "Humano japonés-brasileño de 34 años, antiguo discípulo de Djork y actual mentor de Mob. Exesposo de Mara Lavallée, aceptó unirse a «Howl of hope» bajo el duque Adal tras investigar la información que buscaba Kei.",
      ficha: {
        Raza: "Humano",
        Género: "Masculino",
        Edad: "34 años",
        Altura: "1.84 m",
        Nacionalidad: "Japonesa / Brasileña",
        Cumpleaños: "Desconocido",
        Pareja: "Divorciado",
        Ocupación: "Miembro de «Howl of hope»",
        Confianza: "50%"
      },
      descripcion: [
        "Antiguo discípulo de Djork, de quien se separó tras una brusca pelea que le dejó dos cicatrices en ambas mejillas. Con aquella ruptura llegaron varias desgracias, entre ellas tener que separarse de su esposa Mara. En tiempos más recientes se ha convertido en el mentor de Mob y ha logrado una mayor cercanía con Lily; no obstante, tras un breve enfrentamiento con Eva, le reveló un secreto de Djork que pudo haber desencadenado nuevos conflictos.",
        "Aunque ha logrado mejorar la relación con su exesposa Mara, tras la destrucción de Río de Janeiro decidió investigar sobre la información que Kei quería conseguir, aprovechando la reconstrucción de la ciudad y las vacaciones de Mara para dedicarse por completo a ello, hasta que recibió una propuesta laboral del duque Adal que aceptó tras descubrir problemas que podrían acercarse."
      ]
    },
    {
      nombre: "Bryon",
      categoria: "NPC",
      imagen: "img/bryon",
      encuadre: "center 20%",
      aparicionCap: null,
      resumenCorto: "Vampiro de más de 50 años y segundo al mando de la comisionada Mara. Tras la destrucción de Río, dirige la policía y los equipos de rescate y seguridad.",
      ficha: {
        Raza: "Vampiro",
        Género: "Masculino",
        Edad: "50+",
        Altura: "1.84 m",
        Nacionalidad: "Desconocida",
        Cumpleaños: "Desconocido",
        Pareja: "Divorciado",
        Ocupación: "Policía",
        Confianza: "40%"
      },
      descripcion: [
        "A pesar de todo, Bryon es un vampiro que lleva bastante tiempo en el departamento de policía, pero lo máximo que ha logrado es convertirse en segundo al mando de la comisionada Mara. Pese al odio que siente hacia su propio trabajo, parece ser lo único que le da motivos para seguir; no obstante, es alguien bastante competente para el estatus que tiene dentro de la comisaría como un «lacayo de Mara».",
        "Luego de la destrucción de Río de Janeiro, actualmente se encuentra a cargo de la policía de la ciudad dirigiendo a equipos de rescate y seguridad para los civiles."
      ]
    },
    {
      nombre: "Amelia Mesquita Vaz",
      categoria: "NPC",
      imagen: "img/amelia_mesquita_vaz",
      encuadre: "center 20%",
      aparicionCap: null,
      resumenCorto: "Duquesa y maga brasileña de 39 años, líder de la Familia Vaz. Veterana consejera de duques jóvenes como Adal, solicitó un nuevo equipo a la Tríada bajo su dirección.",
      ficha: {
        Raza: "Humano",
        Género: "Femenino",
        Edad: "39 años",
        Altura: "1.79 m",
        Nacionalidad: "Brasileña",
        Cumpleaños: "Desconocido",
        Pareja: "Casada",
        Ocupación: "Duquesa / Maga",
        Confianza: "15%"
      },
      descripcion: [
        "Amelia es una maga y líder de la Familia Vaz que destaca por haber ascendido al rango de duquesa por méritos propios. Suele tener una presencia amable y sincera; no habla mucho de su esposo, y nadie parece haberlo visto alguna vez, hasta el punto de que algunos piensan que es una mentira elaborada.",
        "Siendo una de las duquesas de Brasil que lleva más tiempo en el puesto, algunos duques más jóvenes como Adal suelen pedir sus consejos. Suele mostrar sus quejas ante Wanderley sobre el manejo del equipo de Río.",
        "Luego de la destrucción de Río de Janeiro y la disolución del equipo, ha decidido iniciar nuevamente la solicitud de un equipo a la Tríada para tenerlo bajo su cargo y dirección."
      ]
    },
    {
      nombre: "Adolf Dos Santos (Muerto)",
      categoria: "NPC",
      imagen: "img/adolf_dos_santos",
      encuadre: "center 20%",
      aparicionCap: null,
      resumenCorto: "Vampiro empresario de más de 100 años y exduque que utilizó su título para acumular poder económico y control en el bajo mundo de Brasil, llegando a hacer tratos con Goenitz.",
      ficha: {
        Estado: "Muerto",
        Raza: "Vampiro",
        Género: "Masculino",
        Edad: "+100 años",
        Altura: "1.78 m",
        Nacionalidad: "Brasileña / Desconocida",
        Cumpleaños: "Desconocido",
        Pareja: "Casado",
        Ocupación: "Empresario",
        Hobbies: "Beber y coleccionar sangre",
        Gustos: "El dinero, él mismo, el respeto, las personas blandas",
        Disgustos: "Aburrirse, que lo interrumpan mientras habla, que le falten al respeto"
      },
      descripcion: [
        "Exduque del que, tras retirarse, se demostró que únicamente utilizó su título para acumular poder dentro de Brasil. Sus ansias de poder económico y control en el bajo mundo lo llevaron a cerrar un trato con Goenitz.",
        "Buscaba hacerse con lo que quedaba del bajo mundo brasileño para llamar la atención de la Condesa Vrolok y formar una alianza que lo volviera intocable."
      ]
    },
    {
      nombre: "Elmer Abara",
      categoria: "NPC",
      imagen: "img/elmer_abara",
      encuadre: "center 20%",
      aparicionCap: null,
      resumenCorto: "Simba de 54 años y profesor universitario. Antiguo líder despiadado de los Colmillo Negro que dejó África junto a su esposa Nayah para vivir en paz en Río de Janeiro.",
      ficha: {
        Raza: "Simba",
        Género: "Masculino",
        Edad: "54 años",
        Altura: "2.13 m (Forma Crinos)",
        Nacionalidad: "Africana / Brasileña",
        Cumpleaños: "22 de Agosto (Leo)",
        Pareja: "Casado con Nayah Abara",
        Ocupación: "Profesor de universidad",
        Confianza: "0%"
      },
      descripcion: [
        "Elmer Colmillo Negro fue líder de la tribu de los Simba, caracterizado por ser bastante despiadado y cruel como su padre y su abuelo. Todo cambió el día en que conoció a su actual esposa, Nayah Abara, gracias a quien pudo llevar un estilo de vida pacífico. Tras la presión de su manada y el control en África, escaparon y se casaron en secreto; una vez nació su primer hijo, Zahir, abandonaron África rumbo a Brasil, donde Elmer adoptó el apellido de su esposa y vivieron tranquilamente hasta el nacimiento de su segundo hijo, Saly.",
        "Luego de un incidente con la Tríada en el que Nayah quedó ciega y Elmer también resultó afectado, desarrolló un odio profundo hacia cualquier agente que trabaje para la Tríada. Tras llegar a un trato, pudieron vivir tranquilos en una casa en las playas de Río de Janeiro dedicados al cuidado de sus hijos.",
        "Después de su pelea contra Zhi'zhak con ayuda de Santiago, Elmer notó que la edad le estaba pasando la cuenta, por lo que decidió tomarse más en serio el entrenamiento de su hijo Saly para sacar a flote su potencial, mientras Santiago se encargaría del entrenamiento de Kris."
      ]
    },
    {
      nombre: "Nayah Abara",
      categoria: "NPC",
      imagen: "img/nayah_abara",
      encuadre: "center 20%",
      aparicionCap: null,
      resumenCorto: "Fisioterapeuta humana de 50 años y esposa de Elmer Abara. Perdió la vista tras un incidente con la Tríada y reside junto a su familia en las playas de Río de Janeiro.",
      ficha: {
        Raza: "Humana",
        Género: "Femenino",
        Edad: "50 años",
        Altura: "1.74 m",
        Nacionalidad: "Africana / Brasileña",
        Cumpleaños: "17 de Febrero (Acuario)",
        Pareja: "Casada con Elmer Abara",
        Ocupación: "Fisioterapeuta",
        Confianza: "0%"
      },
      descripcion: [
        "Esposa de Elmer Colmillo Negro, cuya influencia logró alejarlo de la crueldad de su antigua vida como líder de los Simba. Ante la presión de la manada en África, ambos escaparon para casarse en secreto y, tras el nacimiento de su primer hijo Zahir, viajaron a Brasil adoptando su apellido, Abara, donde más tarde nació su segundo hijo, Saly.",
        "Durante un incidente con la Tríada, Nayah quedó ciega. Tras alcanzar un acuerdo que les garantizó tranquilidad, ella y Elmer se establecieron en una casa en las playas de Río de Janeiro para cuidar de sus hijos."
      ]
    },
    {
      nombre: "Zahir Abara",
      categoria: "NPC",
      imagen: "img/zahir_abara",
      encuadre: "center 20%",
      aparicionCap: null,
      resumenCorto: "Simba africano-brasileño de 27 años, sicario/mercenario e hijo mayor de Elmer y Nayah Abara. Tras pelear contra Calipso y enterarse del combate de su padre contra Zhi'zhak, decidió adentrarse más en el bajo mundo para reunir recursos y contactos.",
      ficha: {
        Raza: "Simba",
        Género: "Masculino",
        Edad: "27 años",
        Altura: "1.84 m",
        Nacionalidad: "Africana / Brasileña",
        Cumpleaños: "29 de noviembre (Ofiuco)",
        Pareja: "Ninguna",
        Ocupación: "Sicario / Mercenario",
        Confianza: "10%"
      },
      descripcion: [
        "Zahir Abara es un hombre disciplinado y precavido. Desde pequeño entrenó con su padre después de que su madre quedara ciega por culpa de agentes de la Tríada y su hermano recién nacido fuera hospitalizado por ello, buscando constantemente hacerse más fuerte para protegerlos. Hace poco empezó a encargarse del «negocio familiar», además de ayudar a su prima Sayla con su club de lectura.",
        "Luego de su pelea contra Calipso y de escuchar sobre el combate de su padre contra Zhi'zhak, Zahir tomó la decisión de hundirse más en el bajo mundo para encontrar recursos y contactos. Actualmente se ha vuelto más astuto que antes y juró no volver a confiarse nunca en una pelea.",
        "Dato curioso: la cicatriz que tiene en su ojo izquierdo se la hizo su hermano menor durante su primer cambio."
      ]
    },
    {
      nombre: "Saly Abara",
      categoria: "NPC",
      imagen: "img/saly_abara",
      encuadre: "center 20%",
      aparicionCap: null,
      resumenCorto: "Simba africano-brasileño de 21 años, hijo menor de Elmer y Nayah Abara, y amigo cercano de Clavel. De carácter juguetón y flojo con sus deberes, aunque lo da todo por su familia y amigos; su padre lo llevó a África para entrenarlo.",
      ficha: {
        Raza: "Simba",
        Género: "Masculino",
        Edad: "21 años",
        Altura: "1.70 m",
        Nacionalidad: "Africana / Brasileña",
        Cumpleaños: "29 de Julio (Cáncer)",
        Pareja: "Novia",
        Ocupación: "Estudiante",
        Confianza: "25%"
      },
      descripcion: [
        "Amigo y pana de Clavel, es un Simba bastante juguetón y algo tonto, aunque cuando se trata de su familia y sus amigos cambia por completo y lo da todo para ayudarlos. Elmer siempre ha intentado entrenarlo porque ve en él mucho más potencial que en Zahir, pero Saly se ha dejado llevar por la tranquilidad de su entorno, mostrándose flojo y desinteresado en sus deberes desde siempre, algo que preocupa a su padre desde hace tiempo.",
        "Luego de la destrucción de Río de Janeiro decidió apoyar a las personas afectadas; sin embargo, su padre tomó la decisión de llevárselo hacia África para entrenarlo en serio, algo que no resultó nada del gusto de Saly."
      ]
    },
   {
      nombre: "William Osler",
      categoria: "NPC",
      imagen: "img/william_osler",
      encuadre: "center 20%",
      aparicionCap: null,
      resumenCorto: "Médico privado brasileño-irlandés de 33 años y hermano mayor sobreprotector de Emily Osler. Tras la destrucción de Río quedó desempleado hasta ser contratado por el duque Adal Wanderley para cuidar a Calipso mientras aprovecha de investigar.",
      ficha: {
        Raza: "Humano",
        Género: "Masculino",
        Edad: "33 años",
        Altura: "1.80 m",
        Nacionalidad: "Brasileña / Irlandesa",
        Cumpleaños: "Desconocido",
        Pareja: "Ninguna",
        Ocupación: "Médico privado",
        Confianza: "25%"
      },
      descripcion: [
        "Hermano mayor de Emily Osler y muy sobreprotector con ella, pues la ha cuidado desde que llegaron a Brasil desde Irlanda tras la «muerte» de su padre. Vive con el miedo de perderla o de que le falte algo en el futuro, motivo por el cual le deposita grandes sumas de dinero y trabaja sin descanso. Como no sabe comunicarse bien con Emily ni con los demás, prefiere refugiarse estoicamente en su labor médica.",
        "Su dedicación lo convirtió posiblemente en el mejor médico del Hospital General de Río, aunque suelen señalar lo malo que es siguiendo procedimientos tradicionales. No le interesa preguntar en qué andan sus pacientes siempre que sus heridas le resulten entretenidas de sanar, atendiendo incluso fuera de turno y con buena disposición, aunque cobrando bastante caro. Su hermana Emily cree que su mayor defecto es esperar siempre lo peor.",
        "Luego de la destrucción de Río de Janeiro, al volver de vacaciones con su hermana se encontró sin lugar de trabajo y estuvo desempleado un corto periodo, hasta que recibió la visita del duque Adal Wanderley, quien lo contrató para cuidar a Calipso; labor que cumple mientras aprovecha la oportunidad para investigar."
      ]
    },
    {
      nombre: "Gaspar",
      categoria: "NPC",
      imagen: "img/gaspar",
      encuadre: "center 20%",
      aparicionCap: null,
      resumenCorto: "Investigador privado británico de 59 años y miembro temporal de «Los de una tierra distante». Antiguo líder en la Tríada y libertador de esclavos junto a Amanda.",
      ficha: {
        Raza: "Humano",
        Género: "Masculino",
        Edad: "59 años",
        Altura: "1.84 m",
        Nacionalidad: "Británica",
        Cumpleaños: "8 de enero",
        Pareja: "Desconocida",
        Ocupación: "Investigador privado / Miembro temporal de «Los de una tierra distante»",
        Confianza: "45%"
      },
      descripcion: [
        "Durante muchos años fue trabajador de la Tríada, siendo líder del equipo formado por Alexander, Johari y Zuri, aunque todos terminaron distanciándose poco a poco. Actualmente sigue en buenos términos con Zuri y Johari; no obstante, con Alexander Djork tuvo un fuerte conflicto al presentar ambos ideas para un proyecto ante la Tríada: al aprobarse el de Djork y rechazarse el suyo, pelearon por el trato inhumano hacia las personas bajo su mando, lo que terminó con la renuncia de Gaspar para convertirse en investigador privado con una vieja amiga.",
        "Antes de ser investigador privado, Gaspar se dedicaba a liberar esclavos en varios lugares junto a Amanda y su grupo, los Libertadores. Durante muchos años se ha entregado por completo a quienes salva, llegando a considerar a los niños liberados como sus propios hijos y cuidando de todos por igual.",
        "Con el tiempo Gaspar y Amanda tomaron caminos separados y él se dedicó a investigar conspiraciones y rutas de narcotráfico. Aunque siempre está de viaje por sus casos, visita a sus niños cada cumpleaños mientras Amanda los cuida de cerca.",
        "Actualmente se encuentra expectante ante lo que hará Ito, esperando saber si tiene razón o si deberá darle un disparo en la cabeza."
      ]
    },
   {
      nombre: "Alexander Djork",
      categoria: "NPC",
      imagen: "img/alexander_djork",
      encuadre: "center 20%",
      aparicionCap: null,
      resumenCorto: "Agente de la Tríada estadounidense-japonés de 49 años, tío de Raymundo y padrino de LeBanner. Entrena agentes bajo el nombre clave «Alexander»; actualmente se recupera de graves quemaduras tras perder un combate contra Kei.",
      ficha: {
        Raza: "Humano",
        Género: "Masculino",
        Edad: "49 años",
        Altura: "1.77 m",
        Nacionalidad: "Estadounidense / Japonesa",
        Cumpleaños: "5 de agosto",
        Pareja: "Viudo",
        Ocupación: "Agente de la Tríada",
        Confianza: "40%"
      },
      descripcion: [
        "Agente altamente entrenado con la peculiar característica de que todos sus aprendices llevan su mismo nombre («Alexander»), destacando como agentes de élite o por sus poderes. Aunque suele entrenar humanos, de vez en cuando admite a algún no-humano.",
        "Es un hombre de pocos amigos e incluso distante con su antiguo equipo, comunicándose con ellos solo para obtener algún beneficio de sus habilidades o cumplir un objetivo, aunque en ocasiones realiza misiones con Diego, con quien mantiene amistad desde hace años.",
        "Suele mostrar poco respeto hacia las personas, salvo hacia los líderes de la Tríada, a quienes respeta enormemente y cuyas órdenes acata lo más rápido posible, teniendo como favorito al Rey Banagher Links (rey de las razas cambiantes).",
        "Actualmente se encuentra recuperándose de quemaduras graves: tras los sucesos de Río se preparaba para una traición de Número 4, pero al confrontar a Kei ambos pelearon y Djork perdió, quedando en mal estado.",
        "Dato curioso: es tío de Raymundo y padrino de LeBanner."
      ]
    },
    {
      nombre: "Hiroshi Ito",
      categoria: "NPC",
      imagen: "img/hiroshi_ito",
      encuadre: "center 20%",
      aparicionCap: null,
      resumenCorto: "Changeling arcadiano de más de 70 años, médico errante, mentor adoptivo de Robin y líder de «Los de una tierra distante». Tras los sucesos de Río, sus acciones se han vuelto cada vez más agresivas.",
      ficha: {
        Raza: "Changeling",
        Género: "Masculino",
        Edad: "+70 años",
        Altura: "1.88 m",
        Nacionalidad: "Arcadiana",
        Cumpleaños: "Se le olvidó con el pasar de los años",
        Pareja: "Ninguna",
        Ocupación: "Médico errante / Líder de «Los de una tierra distante»",
        Confianza: "30%"
      },
      descripcion: [
        "Ito nació solo, rodeado de flores en un bosque de Arcadia. Al llevar una existencia solitaria aprendió casi todo por sí mismo, conociendo gente únicamente a través de sus numerosos viajes entre el mundo de ensueño y el plano real.",
        "Siempre ha sido una persona olvidadiza y solitaria, por lo que al llegar al plano real decidió tatuarse las flores del bosque donde nació para no olvidarlas jamás. La única persona que ha viajado con él es Robin, a quien adoptó desde pequeño, algo que sorprendió a quienes conocían a Ito porque nunca antes había tomado un aprendiz ni mostrado intención de acercarse tanto a nadie.",
        "Gracias a la presencia de Robin, Hiroshi empezó a volverse más atento y menos olvidadizo, cuidando de sus necesidades y enseñándole tanto su medicina como sobre su propia naturaleza como Garou Metis.",
        "Aunque lleva una vida tranquila sin absorber el glamour de los seres vivos, guarda un único arrepentimiento: haber salvado a un Garou al que el propio Ito describe como la encarnación de todo lo malo y de lo que él odia.",
        "Luego de los sucesos de Río de Janeiro y tras descubrirse que es líder de «Los de una tierra distante», Goenitz logró cambiar la perspectiva de Ito, volviendo sus acciones cada vez más agresivas."
      ]
    },
    {
      nombre: "Adam Arc (Muerto)",
      categoria: "NPC",
      imagen: "img/adam_arc",
      encuadre: "center 20%",
      aparicionCap: null,
      resumenCorto: "Nuwisha de gran sabiduría y espíritu poco convencional, hermano mayor de Eva y antiguo mentor de Kris. Tras relacionarse con la Tríada y «Los de una tierra distante», fue cazado y asesinado por Kei.",
      ficha: {
        Estado: "Muerto",
        Raza: "Nuwisha",
        Género: "Masculino",
        Edad: "Desconocida",
        Altura: "1.77 m",
        Nacionalidad: "Desconocida",
        Cumpleaños: "Desconocido",
        Pareja: "Ninguna",
        Ocupación: "Ninguna",
        Confianza: "Nula (Fallecido)"
      },
      descripcion: [
        "Hermano mayor de Eva y antiguo mentor de Kris. Era reconocido por su gran sabiduría y por ser un Nuwisha poco convencional que dejaba atrás las tradiciones y actitudes típicas de su especie, ganándose así el repudio de sus semejantes, a quienes ignoraba para seguir creando cosas nuevas.",
        "Años después llegó a relacionarse con la Tríada y con «Los de una tierra distante» bajo intenciones desconocidas. Las consecuencias de aquellos tratos lo llevaron a ser cazado y asesinado por Kei, un hecho que destrozó a su hermana menor y la llenó de odio."
      ]
    },
   {
      nombre: "Eva Arc",
      categoria: "NPC",
      imagen: "img/eva_arc",
      encuadre: "center 20%",
      aparicionCap: null,
      resumenCorto: "Humana de 26 años, antigua Alexander Número 7 y hermana menor de Adam Arc. Tras la destrucción de Río y ver el estado de Calipso —de quien se enamoró—, abandonó a «Los Alexander» para unirse a «Howl of hope» junto a Adal hasta encontrar a Casval y curarlo.",
      ficha: {
        Raza: "Humana",
        Género: "Femenino",
        Edad: "26 años",
        Altura: "1.68 m",
        Nacionalidad: "Desconocida",
        Cumpleaños: "Desconocido",
        Pareja: "Ninguna (enamorada de Calipso)",
        Ocupación: "Miembro de «Howl of hope»",
        Confianza: "40%"
      },
      descripcion: [
        "También conocida como Alexander Número 7, fue una excepción a la regla al ser reclutada en su adolescencia por Djork gracias a sus aptitudes y destreza en combate y misiones de sigilo. Aunque solía mantenerse al margen de «Los Alexander» sin interés en escalar rangos, todo cambió cuando Raymundo abandonó abruptamente el puesto Número 4 y entre los postulantes apareció Kei, a quien identificó por informes como el asesino de su hermano mayor Adam.",
        "Kei y Eva fueron los únicos en superar todas las pruebas de su maestro, por lo que disputaron un duelo a máxima potencia para desempatar. Eva vio allí la oportunidad de vengarse y matarlo, pero tras un combate aparentemente reñido Kei demostró su superioridad al atacar con todo y ganó con facilidad, dejándola en el puesto 7 y alimentando la frustración y el odio con los que juró superarlo para vengar a Adam.",
        "Años después, cuando Número 4 puso en pausa sus deberes, viajó a Río tras él, pero por un malentendido terminó enfrentándose a Calipso, Kris y Saly, para luego sostener un breve combate contra Raymundo en el que este le reveló información sobre Djork que ella usaría para provocar la caída de su objetivo.",
        "Tras pasar un tiempo agradable junto a Calipso y desarrollar sentimientos por él, fue llamada por su maestro a una misión de infiltración junto a Número 3, recibiendo antes de partir un regalo suyo que, al abrirlo, le cambiaría la vida.",
        "En la actualidad, tras la destrucción de Río de Janeiro y ver el estado en que quedó Calipso, tomó la decisión de abandonar a «Los Alexander» y comenzar a trabajar en «Howl of hope» junto a Adal hasta lograr encontrar a Casval y poder curar a su amado."
      ]
    },
    {
      nombre: "Kei Knight",
      categoria: "NPC",
      imagen: "img/kei_knight",
      encuadre: "center 20%",
      aparicionCap: null,
      resumenCorto: "Humano de 24 años, antiguo Alexander Número 4 entrenado por Djork y expareja pasajera de Kris. Tras aliarse con Casval y vencer a Djork en combate, desapareció con información clave para exponerlo y destruirlo.",
      ficha: {
        Raza: "Humano",
        Género: "Masculino",
        Edad: "24 años",
        Altura: "1.83 m",
        Nacionalidad: "Desconocida",
        Cumpleaños: "5 de mayo",
        Pareja: "Desconocida",
        Ocupación: "Desconocida",
        Confianza: "0%"
      },
      descripcion: [
        "Siendo el segundo de tres hermanos, fue entrenado desde pequeño por Djork junto a otros niños, destacando rápidamente por sus capacidades psíquicas y de pelea, además de su profesionalismo al ejecutar encargos como asesinar a Adam Arc y quemar las cartas de Raymundo. Es conocido por odiar y no llevarse bien con los demás Alexander, aunque suele ignorarlos mientras no se interpongan en su camino.",
        "Tuvo una relación pasajera con Kris y, tras terminarla, pasó mucho tiempo sin ayudar a nadie hasta que encontró a María, a quien ayudó a eliminar a un grupo de razas cambiantes que la perseguían, permaneciendo juntos desde entonces.",
        "Su relación con LeBanner es complicada, pues lo culpa tanto a él como a Djork de la muerte de su hermano menor. Tras conversar brevemente con Eva se mostró reacio a seguir trabajando para Djork, preparándose para destruir los planes de su antiguo mentor. Después de pelear contra Aurora, Raymundo y Sara, comenzó a llevarse bien con Casval, acercándose cada vez más a ejecutar sus propios planes.",
        "Actualmente, tras ayudar a Casval con sus objetivos, recibió la información necesaria para destruir y exponer a Djork. Aunque no esperaba ser interceptado por él, sostuvo un enfrentamiento del que salió victorioso, decidiendo luego desaparecer ante la inminente cacería en su contra mientras espera el momento oportuno para usar esa información."
      ]
    },
    {
      nombre: "María Guzmán",
      categoria: "NPC",
      imagen: "img/maria_guzman",
      encuadre: "center 20%",
      aparicionCap: null,
      resumenCorto: "Raza cambiante de más de 20 años y compañera inseparable de Kei Knight tras ser salvada por él de sus perseguidores. Tras colaborar con Casval, ayudó a Kei a ocultarse en un lugar de difícil acceso para los humanos luego de su combate contra Djork.",
      ficha: {
        Raza: "Raza cambiante",
        Género: "Femenino",
        Edad: "+20 años",
        Altura: "1.71 m",
        Nacionalidad: "Desconocida",
        Cumpleaños: "Desconocido",
        Pareja: "Desconocido",
        Ocupación: "Trabaja para la familia Wanderley",
        Confianza: "0%"
      },
      descripcion: [
        "Es una mujer que por su raza siempre fue perseguida a lo largo de su vida; sin embargo, todo cambió al encontrarse con Kei, una de las pocas personas que le extendió una mano para ayudarla. Con él a su lado dejó de temer ser perseguida y, en agradecimiento, lo apoya en todo lo que necesite, convirtiéndose en su compañera inseparable.",
        "Solía ayudar a Kei con los fuertes dolores de cabeza provocados por sus premoniciones y, en tiempos más recientes, se encargaba de vigilar a Casval Wanderley por su creciente cercanía con él, escuchando sus conversaciones hasta que ambos la hicieron partícipe de sus planes.",
        "Luego de ayudar a Casval, permaneció junto a Kei y lo ayudó a ocultarse tras su enfrentamiento contra Djork, llevándolo a un lugar de difícil acceso para los humanos."
      ]
    },
    {
      nombre: "Luther Stroude",
      categoria: "NPC",
      imagen: "img/luther_stroude",
      encuadre: "center 20%",
      aparicionCap: null,
      resumenCorto: "Humano argentino de 26 años y miembro de «Howl of hope». Ayudó al equipo de Río de Janeiro a enfrentarse a su antiguo mentor Adolf Dos Santos y aceptó entrar a prisión junto a su amigo Danilo hasta aceptar la propuesta laboral del duque Adal.",
      ficha: {
        Raza: "Humano",
        Género: "Masculino",
        Edad: "26 años",
        Altura: "2.13 m",
        Nacionalidad: "Argentina",
        Cumpleaños: "Desconocido",
        Pareja: "Ninguna",
        Ocupación: "Miembro de «Howl of hope»",
        Confianza: "60%"
      },
      descripcion: [
        "Ayudó al equipo de Río de Janeiro a ir contra su viejo jefe y mentor, Adolf Dos Santos. Una vez acabado aquello y arrepentido por todo lo que hizo en el pasado trabajando para Adolf y siendo controlado por Sara, aceptó las condiciones de Mara e ingresó a prisión por sus crímenes, aunque con la ayuda de la comisionada tuvo como compañero de celda a su buen amigo Danilo.",
        "En la cárcel reflexionó sobre todo lo que ha vivido, siendo una de las cosas que más agradece la ayuda del equipo de Río de Janeiro, considerando a cada uno de sus integrantes como un gran amigo.",
        "Tras la destrucción de Río de Janeiro, gastó sus fondos para ayudar en la recuperación de Danilo antes de volver ambos a prisión. Meses después, el duque Adal les propuso trabajar para él como forma de remediar sus actos pasados; aunque al principio se mostró reacio, tras recibir la visita de Mara y pedirle consejo terminó aceptando el puesto en «Howl of hope» con el permiso de ella."
      ]
    },
    {
      nombre: "Ophelia",
      categoria: "NPC",
      imagen: "img/ophelia",
      encuadre: "center 20%",
      aparicionCap: null,
      resumenCorto: "Changeling (Sidhe) brasileña de 21 años, miembro de «Howl of hope» y una de las Alas de Adal Wanderley que trabaja junto a Mob. Tan hermosa como cruel, con numerosos contactos en el bajo mundo y portadora del martillo feérico «Stygian Hyposkhesphyra».",
      ficha: {
        Raza: "Changeling (Sidhe)",
        Género: "Femenino",
        Edad: "21 años",
        Altura: "1.78 m",
        Nacionalidad: "Brasileña",
        Cumpleaños: "Desconocido",
        Pareja: "Ninguna actualmente",
        Ocupación: "Miembro de «Howl of hope»"
      },
      descripcion: [
        "Tan hermosa como cruel, es el tipo de persona a la que le gusta tener las cosas hechas a su medida. Muchos han intentado tener una relación con ella sin éxito, ya que suele perder el interés rápido o rechazarlos directamente. Parece saber mucho del bajo mundo y contar con numerosos contactos, aunque prefiere mantener discreción sobre ese aspecto de su vida.",
        "Actualmente es una de las Alas de Adal Wanderley y trabaja junto a Mob, ocupándose de realizar pedidos, encargos y negocios a nombre de Adal. Posee dos quimeras que la ayudan cuando se ve superada, pero las utiliza poco por la gran cantidad de glamour que consumen, prefiriendo empuñar su martillo «Stygian Hyposkhesphyra», un arma feérica que otorga gran fuerza e impacto a sus golpes.",
        "Tiene muy claro quiénes no le agradan, incluido el propio Adal Wanderley, cuya actitud tímida y falta de confianza detesta; aun así, últimamente se encuentra preocupada por su ausencia inesperada."
      ]
    },
    {
      nombre: "Asher Bauer",
      categoria: "NPC",
      imagen: "img/asher_bauer",
      encuadre: "center 20%",
      aparicionCap: null,
      resumenCorto: "Humana británica de 19 años que nació con la capacidad de ver el alma de las personas. Exmiembro de la Sociedad de Leopoldo y creadora del arma «Testament», llegó a Río tras ser secuestrada por Nisha para ayudar a Morgan.",
      ficha: {
        Raza: "Humano",
        Género: "Asher",
        Edad: "19 años",
        Altura: "1.75 m",
        Nacionalidad: "Británica",
        Cumpleaños: "Desconocido",
        Pareja: "Ninguna actualmente",
        Ocupación: "Estudiante de Química (no sabe química)",
        Hobbies: "Pescar",
        Gustos: "Pescar, comer pescado, los sombreros, las arañas",
        Disgustos: "Ser secuestrada, el café amargo"
      },
      descripcion: [
        "Asher Bauer nació con la capacidad de ver el alma de las personas, habilidad a la que supo sacarle provecho desde temprana edad al unirse a la Sociedad de Leopoldo bajo las órdenes del Padre «Vittore», quien la entrenó y la convirtió en una fiel devota que ganó gran renombre por sus cacerías. Con el tiempo, sin embargo, fue perdiendo constantemente su fe hasta abandonar la Sociedad y sus labores, siendo excomulgada. Aquello llamó la atención de Nisha (hermano de Morgan), quien la espió durante meses hasta secuestrarla mientras pescaba como una forma de ayudar a Morgan.",
        "Actualmente ha decidido vivir en Río como una forma de dar un nuevo giro a su vida y ayudar a sus nuevos amigos, quienes la acogieron a pesar de la extraña manera en que llegó hasta ellos.",
        "Dato curioso: Asher es muy hábil con la herrería y la tecnología; su padre le enseñó herrería y aprovechaba su tiempo libre en la iglesia para fabricar equipamiento de cacería de criaturas, llegando a diseñar su propia arma llamada «Testament»."
      ]
    },
  ],

  capitulos: []
};