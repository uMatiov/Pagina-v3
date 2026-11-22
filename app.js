(() => {
  if (typeof DATOS_CAMPANA === "undefined") {
    document.getElementById("cap-titulo").textContent = "Falta cargar datos.js";
    document.getElementById("cap-sinopsis").textContent = "Asegúrate de que datos.js esté en la misma carpeta que index.html.";
    return;
  }

  window.CAPITULOS_CACHE = window.CAPITULOS_CACHE || {};
  window.INDICE_CAPITULOS_AUTO = window.INDICE_CAPITULOS_AUTO || [];

  function leerStorage(clave, respaldo) {
    try {
      return localStorage.getItem(clave) ?? respaldo;
    } catch {
      return respaldo;
    }
  }

  function guardarStorage(clave, valor) {
    try {
      localStorage.setItem(clave, String(valor));
    } catch { }
  }

  function normalizarTexto(texto) {
    return (texto || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  const personajes = DATOS_CAMPANA.personajes || [];
  const entradasCodice = Array.isArray(DATOS_CAMPANA.codice) ? DATOS_CAMPANA.codice : [];

  const mapaCapitulos = new Map();
  (DATOS_CAMPANA.capitulos || []).forEach(cap => mapaCapitulos.set(cap.numero, { ...cap }));
  window.INDICE_CAPITULOS_AUTO.forEach(capAuto => {
    const previo = mapaCapitulos.get(capAuto.numero);
    if (previo) {
      const esPlaceholder = previo.titulo === "El punto de partida" || !previo.titulo;
      mapaCapitulos.set(capAuto.numero, {
        ...capAuto,
        ...previo,
        titulo: esPlaceholder ? capAuto.titulo : previo.titulo,
        archivo: capAuto.archivo
      });
    } else {
      mapaCapitulos.set(capAuto.numero, capAuto);
    }
  });

  const capitulos = [...mapaCapitulos.values()].sort((a, b) => a.numero - b.numero);

  let indiceActual = 0;
  let capitulosFiltrados = [...capitulos];
  let tamanoFuente = parseFloat(leerStorage("novela_font_size", "1.16")) || 1.16;

  let indicePersonaje = 0;
  const formaActivaPorPersonaje = personajes.map(() => 0);
  const tarjetasDOM = [];
  const lineasDOM = [];

  let categoriaCodiceActiva = "todos";
  let razaCodiceActiva = "todas";
  let estadoCodiceActivo = "todos";
  let nombreDestacadoCodice = "";

  let faccionActiva = "todas";
  let razaFaccionesActiva = "todas";
  let estadoFaccionesActivo = "todos";
  let ordenFaccionesActivo = "original";

  const elListaCap = document.getElementById("lista-capitulos");
  const elFiltroArco = document.getElementById("filtro-arco");
  const elBuscarCap = document.getElementById("buscar-capitulo");
  const elCapArco = document.getElementById("cap-arco");
  const elCapNum = document.getElementById("cap-numero");
  const elCapTitulo = document.getElementById("cap-titulo");
  const elCapSinopsis = document.getElementById("cap-sinopsis");
  const elCapCuerpo = document.getElementById("cap-cuerpo");
  const elBtnAnt = document.getElementById("btn-anterior");
  const elBtnSig = document.getElementById("btn-siguiente");
  const elBtnCopiar = document.getElementById("btn-copiar-enlace");
  const elBtnTema = document.getElementById("btn-tema");
  const elProgreso = document.getElementById("indicador-progreso");
  const elStats = document.getElementById("estadisticas-archivo");

  const elPilaCartas = document.getElementById("pila-cartas");
  const elPersNombre = document.getElementById("pers-nombre");
  const elPersRol = document.getElementById("pers-rol");
  const elSelectorFormas = document.getElementById("selector-formas");
  const elPersResumen = document.getElementById("pers-resumen");
  const elBtnToggleResumen = document.getElementById("btn-toggle-resumen");
  const elBtnToggleVinculos = document.getElementById("btn-toggle-vinculos");
  const elPanelVinculos = document.getElementById("panel-vinculos");
  const elListaVinculos = document.getElementById("lista-vinculos");
  const elPersRasgo = document.getElementById("pers-rasgo");
  const elPersEstado = document.getElementById("pers-estado");
  const elIndicadoresPers = document.getElementById("indicadores-personajes");

  const elGrillaCodice = document.getElementById("grilla-codice");
  const elBuscarCodice = document.getElementById("buscar-codice");
  const elFiltroRazaCodice = document.getElementById("filtro-raza-codice");
  const elFiltroEstadoCodice = document.getElementById("filtro-estado-codice");
  const elModalCodice = document.getElementById("modal-codice");
  const elModalCodiceCuerpo = document.getElementById("modal-codice-cuerpo");
  const elBtnCerrarModalCodice = document.getElementById("btn-cerrar-modal-codice");

  const elFiltrosFaccion = document.getElementById("filtros-faccion");
  const elFiltroRazaFacciones = document.getElementById("filtro-raza-facciones");
  const elFiltroEstadoFacciones = document.getElementById("filtro-estado-facciones");
  const elOrdenFacciones = document.getElementById("orden-facciones");
  const elGrillaFacciones = document.getElementById("grilla-facciones");

  function aplicarTema(tema) {
    const normalizado = tema === "noche" || tema === "oscuro" ? "noche" : "papel";
    document.documentElement.setAttribute("data-tema", normalizado);
    if (elBtnTema) {
      elBtnTema.textContent = normalizado === "papel" ? "Noche" : "Papel";
    }
  }

  function aplicarPreferenciasGuardadas() {
    document.documentElement.style.setProperty("--reading-size", `${tamanoFuente}rem`);
    aplicarTema(leerStorage("novela_tema", "papel"));
  }

  /* ==================== UTILIDADES DE ESTADO, RAZA E IMÁGENES ==================== */
  function esPersonajeMuerto(item) {
    const estado = normalizarTexto(item?.ficha?.Estado || "");
    return estado === "muerto" || /\(muerto\)/i.test(item?.nombre || "");
  }

  function obtenerEtiquetasRaza(item) {
    const razaRaw = String(item?.ficha?.Raza || "").trim();
    if (!razaRaw) return [];

    const norm = normalizarTexto(razaRaw);
    const etiquetas = [];

    if (/human[oa]/.test(norm)) etiquetas.push("Humano / Humana");
    if (/mago|maga/.test(norm)) etiquetas.push("Mago");
    if (/simba/.test(norm)) etiquetas.push("Simba");
    if (/changeling/.test(norm)) etiquetas.push("Changeling");
    if (/garou|hombre lobo/.test(norm)) etiquetas.push("Garou / Hombre lobo");
    if (/vampiro/.test(norm)) etiquetas.push("Vampiro");
    if (/nuwisha/.test(norm)) etiquetas.push("Nuwisha");
    if (/gurahl/.test(norm)) etiquetas.push("Gurahl");
    if (/raza cambiante/.test(norm)) etiquetas.push("Raza cambiante");
    if (/desconocid[oa]/.test(norm)) etiquetas.push("Desconocida");

    if (etiquetas.length === 0) {
      etiquetas.push(razaRaw);
    }
    return etiquetas;
  }

  function poblarFiltrosRaza() {
    const conteoRazas = new Map();
    entradasCodice.forEach(item => {
      obtenerEtiquetasRaza(item).forEach(et => {
        conteoRazas.set(et, (conteoRazas.get(et) || 0) + 1);
      });
    });

    const ordenadas = [...conteoRazas.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

    [elFiltroRazaCodice, elFiltroRazaFacciones].forEach(selectEl => {
      if (!selectEl) return;
      selectEl.innerHTML = `<option value="todas">Todas las razas</option>`;
      ordenadas.forEach(([raza, cantidad]) => {
        const opt = document.createElement("option");
        opt.value = raza;
        opt.textContent = `${raza} (${cantidad})`;
        selectEl.appendChild(opt);
      });
    });
  }

  function obtenerCandidatosImagen(rutaImagen, nombreFallback) {
    const slug = normalizarTexto(nombreFallback).replace(/[^a-z0-9]+/g, "_");
    const rutaLimpia = (rutaImagen || `img/${slug}`).trim();
    const sinExtension = rutaLimpia.replace(/\.[a-z0-9]{2,5}$/i, "");
    const extensiones = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif"];

    const candidatos = [];
    if (sinExtension !== rutaLimpia) {
      candidatos.push(rutaLimpia);
    }
    extensiones.forEach(ext => {
      const candidata = `${sinExtension}${ext}`;
      if (!candidatos.includes(candidata)) {
        candidatos.push(candidata);
      }
    });
    return { candidatos, sinExtension };
  }

  /* ==================== ENLACES DIRECTOS (HASH ROUTING) ==================== */
  function actualizarHashSilencioso(nuevoHash) {
    if (window.location.hash !== nuevoHash) {
      history.replaceState(null, "", nuevoHash);
    }
  }

  function activarVista(nombreVista, actualizarHash = true) {
    document.querySelectorAll(".nav-btn").forEach(b => {
      b.classList.toggle("activo", b.dataset.vista === nombreVista);
    });

    document.querySelectorAll(".vista").forEach(sec => {
      sec.hidden = sec.id !== `vista-${nombreVista}`;
    });

    if (nombreVista === "personajes") {
      actualizarDisposicionPila();
      evaluarDesbordeResumen();
      if (actualizarHash) actualizarHashSilencioso("#personajes");
    } else if (nombreVista === "codice") {
      if (actualizarHash) actualizarHashSilencioso("#codice");
    } else if (nombreVista === "facciones") {
      if (actualizarHash) actualizarHashSilencioso("#facciones");
    } else if (nombreVista === "lector" && capitulos[indiceActual]) {
      const numPad = String(capitulos[indiceActual].numero).padStart(3, "0");
      if (actualizarHash) actualizarHashSilencioso(`#cap-${numPad}`);
    }
  }

  function resolverRutaDesdeHash() {
    const hash = window.location.hash.trim().toLowerCase();
    if (hash === "#personajes") {
      activarVista("personajes", false);
      return true;
    }
    if (hash === "#codice") {
      activarVista("codice", false);
      return true;
    }
    if (hash === "#facciones") {
      activarVista("facciones", false);
      return true;
    }
    const matchCap = hash.match(/^#cap-(\d+)$/);
    if (matchCap) {
      const numBuscado = Number(matchCap[1]);
      const idx = capitulos.findIndex(c => c.numero === numBuscado);
      if (idx >= 0) {
        activarVista("lector", false);
        cargarCapitulo(idx, false);
        return true;
      }
    }
    return false;
  }

  /* ==================== LECTOR Y PARSEO DE MARKDOWN ==================== */
  function esLineaEncabezadoCapitulo(linea) {
    return /^#\s+/.test(linea) || /^(\*{1,2})?Cap[ií]tulo\s+\d+\s*[:.\-—]/i.test(linea);
  }

  function limpiarTituloMarkdown(linea) {
    return linea
      .replace(/^#+\s*/, "")
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/\*(.+?)\*/g, "$1")
      .replace(/^Cap[ií]tulo\s+\d+\s*[:.\-—]\s*/i, "")
      .trim();
  }

  function formatearInlineSeguro(texto) {
    const escapado = texto
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    return escapado
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>");
  }

  function poblarSelectorArcos() {
    elFiltroArco.innerHTML = `<option value="todos">Todos los arcos</option>`;
    const arcosUnicos = [...new Set(capitulos.map(c => c.arco).filter(Boolean))];
    arcosUnicos.forEach(arco => {
      const opt = document.createElement("option");
      opt.value = arco;
      opt.textContent = arco;
      elFiltroArco.appendChild(opt);
    });
    elFiltroArco.value = "todos";
    filtrarCapitulos();
  }

  function renderizarIndice() {
    elListaCap.innerHTML = "";
    if (capitulosFiltrados.length === 0) {
      const li = document.createElement("li");
      li.textContent = "Sin resultados para esa búsqueda.";
      li.style.padding = "0.75rem 0.5rem";
      li.style.color = "var(--ink-muted)";
      elListaCap.appendChild(li);
      return;
    }

    const capActivo = capitulos[indiceActual];
    capitulosFiltrados.forEach(cap => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "item-cap-btn";
      if (capActivo && cap.numero === capActivo.numero) btn.classList.add("activo");
      if (cap.perdido) btn.classList.add("item-cap-perdido");

      const numSpan = document.createElement("span");
      numSpan.className = "item-cap-num";
      numSpan.textContent = String(cap.numero).padStart(3, "0");

      const titSpan = document.createElement("span");
      titSpan.className = "item-cap-titulo";
      titSpan.textContent = cap.perdido ? `${cap.titulo} (Sin grabación)` : cap.titulo;

      btn.append(numSpan, titSpan);
      btn.addEventListener("click", () => {
        const idxReal = capitulos.findIndex(c => c.numero === cap.numero);
        cargarCapitulo(idxReal, true);
      });

      li.appendChild(btn);
      elListaCap.appendChild(li);
    });
  }

  function obtenerParrafosCapitulo(cap) {
    if (Array.isArray(cap.parrafos) && cap.parrafos.length > 0) {
      return Promise.resolve(cap.parrafos);
    }
    if (Array.isArray(window.CAPITULOS_CACHE[cap.numero])) {
      return Promise.resolve(window.CAPITULOS_CACHE[cap.numero]);
    }

    const rutaScript = cap.archivo || `capitulos/${String(cap.numero).padStart(3, "0")}.js`;
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = rutaScript;
      script.onload = () => {
        script.remove();
        if (Array.isArray(window.CAPITULOS_CACHE[cap.numero])) {
          resolve(window.CAPITULOS_CACHE[cap.numero]);
        } else {
          reject(new Error(`El archivo ${rutaScript} no registró el capítulo ${cap.numero}.`));
        }
      };
      script.onerror = () => {
        script.remove();
        reject(new Error(`Aún no existe el archivo ${rutaScript}.`));
      };
      document.body.appendChild(script);
    });
  }

  function pintarParrafosEnVisor(cap, parrafos) {
    elCapCuerpo.innerHTML = "";
    if (cap.perdido) {
      const aviso = document.createElement("div");
      aviso.className = "aviso-perdido";
      aviso.textContent = parrafos.join(" ");
      elCapCuerpo.appendChild(aviso);
      return;
    }

    let lista = [...parrafos];

    if (lista.length > 0 && esLineaEncabezadoCapitulo(lista[0].trim())) {
      const tituloExtraido = limpiarTituloMarkdown(lista[0]);
      if (tituloExtraido) {
        cap.titulo = tituloExtraido;
        elCapTitulo.textContent = tituloExtraido;
        renderizarIndice();
      }
      lista.shift();
    }

    lista.forEach(texto => {
      const linea = texto.trim();
      if (!linea) return;

      if (linea === "***" || linea === "---") {
        elCapCuerpo.appendChild(document.createElement("hr"));
      } else if (/^#{2,3}\s+/.test(linea)) {
        const h3 = document.createElement("h3");
        h3.className = "subtitulo-escena";
        h3.innerHTML = formatearInlineSeguro(linea.replace(/^#{2,3}\s+/, ""));
        elCapCuerpo.appendChild(h3);
      } else {
        const p = document.createElement("p");
        p.innerHTML = formatearInlineSeguro(linea);
        elCapCuerpo.appendChild(p);
      }
    });
  }

  async function cargarCapitulo(idx, actualizarHash = true) {
    if (idx < 0 || idx >= capitulos.length) return;
    indiceActual = idx;
    const cap = capitulos[idx];
    const numPad = String(cap.numero).padStart(3, "0");

    guardarStorage("novela_ultimo_cap", cap.numero);
    if (actualizarHash) {
      actualizarHashSilencioso(`#cap-${numPad}`);
    }

    elCapArco.textContent = cap.arco;
    elCapNum.textContent = `Capítulo ${String(cap.numero).padStart(2, "0")}`;
    elCapTitulo.textContent = cap.titulo;
    elCapSinopsis.textContent = cap.sinopsis || "";
    elBtnAnt.disabled = idx === 0;
    elBtnSig.disabled = idx === capitulos.length - 1;
    elProgreso.textContent = `${idx + 1} de ${capitulos.length} entradas`;
    renderizarIndice();

    elCapCuerpo.innerHTML = `<div class="estado-carga-cap">Cargando texto del capítulo...</div>`;

    try {
      const parrafos = await obtenerParrafosCapitulo(cap);
      if (indiceActual !== idx) return;
      pintarParrafosEnVisor(cap, parrafos);
    } catch (err) {
      if (indiceActual !== idx) return;
      elCapCuerpo.innerHTML = `<div class="aviso-perdido">${err.message}</div>`;
    }
  }

  function filtrarCapitulos() {
    const query = elBuscarCap.value.trim().toLowerCase();
    const arco = elFiltroArco.value;

    capitulosFiltrados = capitulos.filter(cap => {
      const coincideArco = arco === "todos" || cap.arco === arco;
      const coincideTexto =
        !query ||
        cap.titulo.toLowerCase().includes(query) ||
        String(cap.numero).includes(query);
      return coincideArco && coincideTexto;
    });

    renderizarIndice();
  }

  elBtnCopiar.addEventListener("click", async () => {
    const cap = capitulos[indiceActual];
    if (!cap) return;
    const numPad = String(cap.numero).padStart(3, "0");
    actualizarHashSilencioso(`#cap-${numPad}`);

    try {
      await navigator.clipboard.writeText(window.location.href);
      elBtnCopiar.textContent = "Enlace copiado";
      setTimeout(() => { elBtnCopiar.textContent = "Copiar enlace"; }, 1800);
    } catch {
      elBtnCopiar.textContent = `#cap-${numPad}`;
      setTimeout(() => { elBtnCopiar.textContent = "Copiar enlace"; }, 1800);
    }
  });

  /* ==================== LÓGICA DE PILA DE PERSONAJES, FORMAS Y VÍNCULOS ==================== */
  function obtenerDatosForma(personaje, idxPersonaje) {
    if (Array.isArray(personaje.formas) && personaje.formas.length > 0) {
      const idxForma = formaActivaPorPersonaje[idxPersonaje] || 0;
      const forma = personaje.formas[idxForma] || personaje.formas[0];
      return {
        etiquetaForma: forma.etiqueta,
        imagen: forma.imagen || personaje.imagen,
        encuadre: forma.encuadre || personaje.encuadre || "center 15%",
        resumen: forma.resumen || personaje.resumen,
        rasgoClave: forma.rasgoClave || personaje.rasgoClave,
        estadoActual: forma.estadoActual || personaje.estadoActual
      };
    }
    return {
      etiquetaForma: null,
      imagen: personaje.imagen,
      encuadre: personaje.encuadre || "center 15%",
      resumen: personaje.resumen,
      rasgoClave: personaje.rasgoClave,
      estadoActual: personaje.estadoActual
    };
  }

  function crearRespaldoRetrato(nombre, rutaBase, etiquetaForma) {
    const div = document.createElement("div");
    div.className = "retrato-fallback";
    const titulo = etiquetaForma ? `${nombre} (${etiquetaForma})` : nombre;
    div.innerHTML = `
      <span class="retrato-inicial">${nombre.charAt(0)}</span>
      <strong>${titulo}</strong>
      <span class="retrato-hint">Agrega ${rutaBase} (.png, .jpg o .webp)</span>
    `;
    return div;
  }

  function pintarContenidoTarjeta(card, personaje, idxPersonaje) {
    const datos = obtenerDatosForma(personaje, idxPersonaje);
    card.innerHTML = "";

    const { candidatos, sinExtension } = obtenerCandidatosImagen(datos.imagen, personaje.nombre);
    let intento = 0;

    const img = document.createElement("img");
    img.alt = datos.etiquetaForma
      ? `Retrato de ${personaje.nombre} — Forma ${datos.etiquetaForma}`
      : `Retrato de ${personaje.nombre}`;
    img.style.objectPosition = datos.encuadre;

    img.onload = () => {
      if (idxPersonaje === indicePersonaje) {
        actualizarDisposicionPila();
      }
    };

    img.onerror = () => {
      intento++;
      if (intento < candidatos.length) {
        img.src = candidatos[intento];
      } else {
        card.innerHTML = "";
        card.appendChild(crearRespaldoRetrato(personaje.nombre, sinExtension, datos.etiquetaForma));
        if (idxPersonaje === indicePersonaje) {
          actualizarDisposicionPila();
        }
      }
    };

    img.src = candidatos[0];
    card.appendChild(img);
  }

  function inicializarPilaPersonajes() {
    elPilaCartas.innerHTML = "";
    elIndicadoresPers.innerHTML = "";

    personajes.forEach((p, idx) => {
      const card = document.createElement("div");
      card.className = "card-personaje";
      pintarContenidoTarjeta(card, p, idx);

      card.addEventListener("click", () => {
        if (idx !== indicePersonaje) {
          seleccionarPersonaje(idx);
        }
      });

      elPilaCartas.appendChild(card);
      tarjetasDOM.push(card);

      const linea = document.createElement("button");
      linea.type = "button";
      linea.className = "linea-indicador";
      linea.setAttribute("aria-label", `Ver a ${p.nombre}`);
      linea.addEventListener("click", () => seleccionarPersonaje(idx));
      elIndicadoresPers.appendChild(linea);
      lineasDOM.push(linea);
    });

    seleccionarPersonaje(0);
  }

  function evaluarDesbordeResumen() {
    if (!elBtnToggleResumen) return;
    elPersResumen.classList.add("contraido");
    elBtnToggleResumen.textContent = "Ver más";

    requestAnimationFrame(() => {
      const hayDesborde = elPersResumen.scrollHeight > elPersResumen.clientHeight + 2;
      elBtnToggleResumen.hidden = !hayDesborde;
      if (!hayDesborde) {
        elPersResumen.classList.remove("contraido");
      }
    });
  }

  function irAEntradaCodice(nombreBuscado) {
    const objetivo = normalizarTexto(nombreBuscado);
    const entrada = entradasCodice.find(e => normalizarTexto(e.nombre) === objetivo);

    categoriaCodiceActiva = "todos";
    razaCodiceActiva = "todas";
    estadoCodiceActivo = "todos";
    document.querySelectorAll("#filtros-categoria-codice .cat-btn").forEach(b => {
      b.classList.toggle("activa", b.dataset.cat === "todos");
    });
    if (elFiltroRazaCodice) elFiltroRazaCodice.value = "todas";
    if (elFiltroEstadoCodice) elFiltroEstadoCodice.value = "todos";
    elBuscarCodice.value = "";
    nombreDestacadoCodice = entrada ? entrada.nombre : nombreBuscado;

    renderizarCodice();
    activarVista("codice", true);

    if (entrada) {
      abrirModalCodice(entrada);
    }
  }

  function renderizarVinculosPersonaje(activo) {
    const listaVinculos = Array.isArray(activo.vinculos) ? activo.vinculos : [];
    elListaVinculos.innerHTML = "";

    if (listaVinculos.length === 0) {
      elBtnToggleVinculos.hidden = true;
      elPanelVinculos.hidden = true;
      elBtnToggleVinculos.classList.remove("activo");
      elBtnToggleVinculos.setAttribute("aria-expanded", "false");
      return;
    }

    elBtnToggleVinculos.hidden = false;
    elBtnToggleVinculos.textContent = `Vínculos (${listaVinculos.length})`;

    listaVinculos.forEach(v => {
      const li = document.createElement("li");
      li.className = "item-vinculo";

      const cab = document.createElement("div");
      cab.className = "vinculo-cabecera";

      const spanNombre = document.createElement("span");
      spanNombre.className = "vinculo-nombre";
      spanNombre.textContent = v.nombre;
      cab.appendChild(spanNombre);

      const nomNorm = normalizarTexto(v.nombre);
      const idxProtagonista = personajes.findIndex(p => normalizarTexto(p.nombre) === nomNorm);
      const entradaCodice = entradasCodice.find(e => normalizarTexto(e.nombre) === nomNorm);

      if (entradaCodice) {
        const btnCodice = document.createElement("button");
        btnCodice.type = "button";
        btnCodice.className = "btn-vinculo-destino";
        btnCodice.textContent = `Ver en Códice (${entradaCodice.categoria})`;
        btnCodice.addEventListener("click", () => irAEntradaCodice(entradaCodice.nombre));
        cab.appendChild(btnCodice);
      } else if (idxProtagonista >= 0 && idxProtagonista !== indicePersonaje) {
        const btnProta = document.createElement("button");
        btnProta.type = "button";
        btnProta.className = "btn-vinculo-destino";
        btnProta.textContent = "Ver ficha";
        btnProta.addEventListener("click", () => seleccionarPersonaje(idxProtagonista));
        cab.appendChild(btnProta);
      }

      li.appendChild(cab);

      if (v.relacion) {
        const spanRel = document.createElement("span");
        spanRel.className = "vinculo-relacion";
        spanRel.textContent = v.relacion;
        li.appendChild(spanRel);
      }

      elListaVinculos.appendChild(li);
    });
  }

  function actualizarDetallePersonaje() {
    const activo = personajes[indicePersonaje];
    const datos = obtenerDatosForma(activo, indicePersonaje);

    elPersNombre.textContent = activo.nombre;
    elPersRol.textContent = activo.rol;
    elPersResumen.textContent = datos.resumen;
    elPersRasgo.textContent = datos.rasgoClave;
    elPersEstado.textContent = datos.estadoActual;

    elSelectorFormas.innerHTML = "";
    if (Array.isArray(activo.formas) && activo.formas.length > 1) {
      elSelectorFormas.hidden = false;
      const idxFormaActual = formaActivaPorPersonaje[indicePersonaje] || 0;

      activo.formas.forEach((forma, fIdx) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn-forma";
        if (fIdx === idxFormaActual) btn.classList.add("activa");
        btn.textContent = forma.etiqueta;
        btn.setAttribute("aria-pressed", String(fIdx === idxFormaActual));

        btn.addEventListener("click", () => {
          formaActivaPorPersonaje[indicePersonaje] = fIdx;
          pintarContenidoTarjeta(tarjetasDOM[indicePersonaje], activo, indicePersonaje);
          actualizarDetallePersonaje();
          actualizarDisposicionPila();
        });

        elSelectorFormas.appendChild(btn);
      });
    } else {
      elSelectorFormas.hidden = true;
    }

    elPanelVinculos.hidden = true;
    elBtnToggleVinculos.classList.remove("activo");
    elBtnToggleVinculos.setAttribute("aria-expanded", "false");
    renderizarVinculosPersonaje(activo);

    evaluarDesbordeResumen();
  }

  function calcularMedidasImagenActiva(cardActiva) {
    const anchoContenedor = elPilaCartas.clientWidth || 480;
    const anchoMaximo = Math.min(anchoContenedor, 500);
    const altoMaximo = Math.min(window.innerHeight * 0.64, 540);
    const img = cardActiva.querySelector("img");

    if (img && img.naturalWidth > 0 && img.naturalHeight > 0) {
      const proporcion = img.naturalWidth / img.naturalHeight;
      let anchoFinal = anchoMaximo;
      let altoFinal = anchoFinal / proporcion;

      if (altoFinal > altoMaximo) {
        altoFinal = altoMaximo;
        anchoFinal = altoFinal * proporcion;
      }

      return {
        ancho: Math.round(anchoFinal),
        alto: Math.round(altoFinal)
      };
    }

    return {
      ancho: Math.min(anchoContenedor, 400),
      alto: 320
    };
  }

  function actualizarDisposicionPila() {
    const total = personajes.length;
    if (total === 0) return;

    const cardActiva = tarjetasDOM[indicePersonaje];
    const { ancho, alto } = calcularMedidasImagenActiva(cardActiva);

    const altoBaseFondo = 320;
    const desplazamientoNivel1 = Math.max(75, Math.round((alto / 2) - (altoBaseFondo * 0.84 / 2) + 46));
    const desplazamientoNivel2 = desplazamientoNivel1 + 38;

    elPilaCartas.style.height = `${alto + 170}px`;

    tarjetasDOM.forEach((card, i) => {
      let diff = i - indicePersonaje;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;

      const esActiva = diff === 0;
      card.classList.toggle("es-activa", esActiva);

      if (esActiva) {
        card.style.width = `${ancho}px`;
        card.style.height = `${alto}px`;
        card.style.transform = "translateY(0px) scale(1)";
        card.style.zIndex = "10";
        card.style.filter = "grayscale(0%) brightness(1)";
        card.style.opacity = "1";
        card.style.pointerEvents = "auto";
      } else if (Math.abs(diff) === 1) {
        const y = diff * desplazamientoNivel1;
        card.style.width = "";
        card.style.height = "";
        card.style.transform = `translateY(${y}px) scale(0.84)`;
        card.style.zIndex = "6";
        card.style.filter = "grayscale(100%) brightness(0.82)";
        card.style.opacity = "0.95";
        card.style.pointerEvents = "auto";
      } else if (Math.abs(diff) === 2) {
        const y = diff * desplazamientoNivel2;
        card.style.width = "";
        card.style.height = "";
        card.style.transform = `translateY(${y}px) scale(0.68)`;
        card.style.zIndex = "3";
        card.style.filter = "grayscale(100%) brightness(0.65)";
        card.style.opacity = "0.75";
        card.style.pointerEvents = "auto";
      } else {
        const y = diff > 0 ? desplazamientoNivel2 + 40 : -(desplazamientoNivel2 + 40);
        card.style.width = "";
        card.style.height = "";
        card.style.transform = `translateY(${y}px) scale(0.52)`;
        card.style.zIndex = "1";
        card.style.filter = "grayscale(100%) brightness(0.5)";
        card.style.opacity = "0";
        card.style.pointerEvents = "none";
      }
    });
  }

  function seleccionarPersonaje(nuevoIdx) {
    const total = personajes.length;
    if (total === 0) return;
    indicePersonaje = ((nuevoIdx % total) + total) % total;

    lineasDOM.forEach((linea, i) => {
      linea.classList.toggle("activa", i === indicePersonaje);
    });

    actualizarDisposicionPila();
    actualizarDetallePersonaje();
  }

  /* ==================== VISTA CÓDICE Y MODAL COMPLETO ==================== */
  function obtenerTextoResumenCodice(item) {
    if (item.resumenCorto) return item.resumenCorto;
    if (Array.isArray(item.descripcion)) return item.descripcion[0] || "";
    return item.descripcion || "";
  }

  function construirCajaImagenCodice(item) {
    const debeMostrarCaja = Boolean(item.imagen) || item.categoria === "NPC";
    if (!debeMostrarCaja) return null;

    const muerto = esPersonajeMuerto(item);
    const wrapper = document.createElement("div");
    wrapper.className = muerto ? "codice-retrato-wrapper es-muerto" : "codice-retrato-wrapper";

    const box = document.createElement("div");
    box.className = "codice-retrato-box";

    const { candidatos, sinExtension } = obtenerCandidatosImagen(item.imagen, item.nombre);
    let intento = 0;

    const img = document.createElement("img");
    img.alt = `Ilustración de ${item.nombre}`;
    img.style.objectPosition = item.encuadre || "center 22%";

    img.onerror = () => {
      intento++;
      if (intento < candidatos.length) {
        img.src = candidatos[intento];
      } else {
        box.innerHTML = `
          <div class="codice-retrato-fallback">
            <span class="inicial">${item.nombre.charAt(0)}</span>
            <span class="ruta-sugerida">${sinExtension}.png</span>
          </div>
        `;
      }
    };

    img.src = candidatos[0];
    box.appendChild(img);
    wrapper.appendChild(box);

    if (muerto) {
      const cinta = document.createElement("div");
      cinta.className = "cinta-muerto";
      cinta.textContent = "MUERTO";
      wrapper.appendChild(cinta);
    }

    return wrapper;
  }

  function abrirModalCodice(item) {
    if (!elModalCodice || !elModalCodiceCuerpo) return;
    elModalCodiceCuerpo.innerHTML = "";

    const tieneImagen = Boolean(item.imagen) || item.categoria === "NPC";
    const muerto = esPersonajeMuerto(item);
    const grid = document.createElement("div");
    grid.className = tieneImagen ? "modal-codice-grid" : "modal-codice-grid sin-imagen";

    if (tieneImagen) {
      const colWrapper = document.createElement("div");
      colWrapper.className = muerto ? "modal-retrato-wrapper es-muerto" : "modal-retrato-wrapper";

      const colImg = document.createElement("div");
      colImg.className = "modal-retrato-completo";

      const { candidatos, sinExtension } = obtenerCandidatosImagen(item.imagen, item.nombre);
      let intento = 0;
      const img = document.createElement("img");
      img.alt = `Retrato completo de ${item.nombre}`;
      img.onerror = () => {
        intento++;
        if (intento < candidatos.length) {
          img.src = candidatos[intento];
        } else {
          colImg.innerHTML = `
            <div class="codice-retrato-fallback" style="min-height: 240px;">
              <span class="inicial">${item.nombre.charAt(0)}</span>
              <span class="ruta-sugerida">${sinExtension}.png</span>
            </div>
          `;
        }
      };
      img.src = candidatos[0];
      colImg.appendChild(img);
      colWrapper.appendChild(colImg);

      if (muerto) {
        const cinta = document.createElement("div");
        cinta.className = "cinta-muerto";
        cinta.textContent = "MUERTO";
        colWrapper.appendChild(cinta);
      }

      grid.appendChild(colWrapper);
    }

    const colInfo = document.createElement("div");

    const faccionTexto = (item.faccion && item.faccion.trim()) ? item.faccion.trim() : "";
    const cab = document.createElement("div");
    cab.className = "modal-info-cabecera";
    cab.innerHTML = `
      <h3 id="modal-codice-titulo">${item.nombre}</h3>
      <span class="codice-categoria">${item.categoria}</span>
      ${faccionTexto ? `<span class="badge-faccion" data-faccion="${faccionTexto}">${faccionTexto}</span>` : ""}
    `;
    colInfo.appendChild(cab);

    if (item.ficha && typeof item.ficha === "object") {
      const entradasFicha = Object.entries(item.ficha).filter(([, val]) => val !== "" && val != null);
      if (entradasFicha.length > 0) {
        const cajaFicha = document.createElement("div");
        cajaFicha.className = "modal-ficha-datos";
        entradasFicha.forEach(([clave, valor]) => {
          const dato = document.createElement("div");
          dato.className = "modal-dato-item";
          dato.innerHTML = `
            <span class="modal-dato-clave">${clave}</span>
            <span class="modal-dato-valor">${valor}</span>
          `;
          cajaFicha.appendChild(dato);
        });
        colInfo.appendChild(cajaFicha);
      }
    }

    const historiaBox = document.createElement("div");
    historiaBox.className = "modal-historia";
    const parrafos = Array.isArray(item.descripcion)
      ? item.descripcion
      : String(item.descripcion || "").split(/\n+/).filter(Boolean);

    parrafos.forEach(texto => {
      const p = document.createElement("p");
      p.textContent = texto;
      historiaBox.appendChild(p);
    });
    colInfo.appendChild(historiaBox);

    const tieneCap = typeof item.aparicionCap === "number" && capitulos.some(c => c.numero === item.aparicionCap);
    const pieModal = document.createElement("div");
    pieModal.className = "modal-pie-acciones";
    pieModal.innerHTML = `
      <span>${item.aparicionCap ? `Mencionado en Cap. ${String(item.aparicionCap).padStart(2, "0")}` : "Archivo general"}</span>
      ${tieneCap ? `<button type="button" class="btn-abrir-ficha" id="btn-modal-ir-cap">Ir al capítulo</button>` : ""}
    `;
    colInfo.appendChild(pieModal);

    const btnModalCap = pieModal.querySelector("#btn-modal-ir-cap");
    if (btnModalCap) {
      btnModalCap.addEventListener("click", () => {
        elModalCodice.close();
        const idxCap = capitulos.findIndex(c => c.numero === item.aparicionCap);
        if (idxCap >= 0) {
          activarVista("lector", false);
          cargarCapitulo(idxCap, true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    }

    grid.appendChild(colInfo);
    elModalCodiceCuerpo.appendChild(grid);

    if (typeof elModalCodice.showModal === "function") {
      elModalCodice.showModal();
    }
  }

  function limpiarFiltrosCodice() {
    categoriaCodiceActiva = "todos";
    razaCodiceActiva = "todas";
    estadoCodiceActivo = "todos";
    nombreDestacadoCodice = "";
    elBuscarCodice.value = "";
    if (elFiltroRazaCodice) elFiltroRazaCodice.value = "todas";
    if (elFiltroEstadoCodice) elFiltroEstadoCodice.value = "todos";
    document.querySelectorAll("#filtros-categoria-codice .cat-btn").forEach(b => {
      b.classList.toggle("activa", b.dataset.cat === "todos");
    });
    renderizarCodice();
  }

  function renderizarCodice() {
    elGrillaCodice.innerHTML = "";
    const query = elBuscarCodice.value.trim().toLowerCase();

    const filtradas = entradasCodice.filter(item => {
      const coincideCat = categoriaCodiceActiva === "todos" || item.categoria === categoriaCodiceActiva;

      const etiquetasRaza = obtenerEtiquetasRaza(item);
      const coincideRaza = razaCodiceActiva === "todas" || etiquetasRaza.includes(razaCodiceActiva);

      const muerto = esPersonajeMuerto(item);
      const coincideEstado =
        estadoCodiceActivo === "todos" ||
        (estadoCodiceActivo === "muertos" && muerto) ||
        (estadoCodiceActivo === "vivos" && !muerto);

      const textoCompleto = Array.isArray(item.descripcion)
        ? item.descripcion.join(" ")
        : (item.descripcion || "");
      const coincideTexto =
        !query ||
        item.nombre.toLowerCase().includes(query) ||
        textoCompleto.toLowerCase().includes(query) ||
        (item.resumenCorto || "").toLowerCase().includes(query) ||
        (item.faccion || "").toLowerCase().includes(query) ||
        (item.ficha?.Raza || "").toLowerCase().includes(query);

      return coincideCat && coincideRaza && coincideEstado && coincideTexto;
    });

    if (filtradas.length === 0) {
      elGrillaCodice.innerHTML = `
        <div class="estado-vacio-codice">
          <span>No hay entradas en el códice que coincidan con esos filtros.</span>
          <button type="button" class="tool-btn" id="btn-reset-codice">Limpiar filtros</button>
        </div>
      `;
      const btnReset = document.getElementById("btn-reset-codice");
      if (btnReset) btnReset.addEventListener("click", limpiarFiltrosCodice);
      return;
    }

    filtradas.forEach(item => {
      const art = document.createElement("article");
      art.className = "entrada-codice";
      if (nombreDestacadoCodice && normalizarTexto(item.nombre) === normalizarTexto(nombreDestacadoCodice)) {
        art.classList.add("destacada-codice");
      }

      const cajaImg = construirCajaImagenCodice(item);
      if (cajaImg) {
        art.appendChild(cajaImg);
      }

      const tieneCap = typeof item.aparicionCap === "number" && capitulos.some(c => c.numero === item.aparicionCap);
      const resumenCard = obtenerTextoResumenCodice(item);

      const cuerpoCard = document.createElement("div");
      cuerpoCard.style.display = "contents";
      cuerpoCard.innerHTML = `
        <div class="codice-top">
          <h3 class="codice-titulo">${item.nombre}</h3>
          <span class="codice-categoria">${item.categoria}</span>
        </div>
        <p class="codice-resumen-corto">${resumenCard}</p>
        <div class="codice-meta">
          <span>${item.aparicionCap ? `Cap. ${String(item.aparicionCap).padStart(2, "0")}` : "Archivo"}</span>
          <div class="codice-acciones-pie">
            <button type="button" class="btn-abrir-ficha">Ver ficha</button>
            ${tieneCap ? `<button type="button" class="btn-ir-cap" data-cap="${item.aparicionCap}">Capítulo</button>` : ""}
          </div>
        </div>
      `;

      art.appendChild(cuerpoCard);

      art.addEventListener("click", (e) => {
        if (e.target.closest(".btn-ir-cap")) return;
        abrirModalCodice(item);
      });

      const btnIr = art.querySelector(".btn-ir-cap");
      if (btnIr) {
        btnIr.addEventListener("click", (e) => {
          e.stopPropagation();
          const idxCap = capitulos.findIndex(c => c.numero === Number(btnIr.dataset.cap));
          if (idxCap >= 0) {
            activarVista("lector", false);
            cargarCapitulo(idxCap, true);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        });
      }

      elGrillaCodice.appendChild(art);
    });
  }

  /* ==================== VISTA RED DE FACCIONES ==================== */
  function analizarConfianza(item) {
    const raw = String(item?.ficha?.Confianza ?? "Sin dato").trim();
    const lower = raw.toLowerCase();

    if (lower.includes("fallecido") || lower.includes("nula")) {
      return { porcentaje: 0, texto: raw, color: "var(--ink-muted)", ordenValor: null };
    }
    if (raw === "Sin dato") {
      return { porcentaje: 0, texto: "Sin dato", color: "var(--ink-muted)", ordenValor: null };
    }

    const match = raw.match(/-?\d+/);
    const num = match ? parseInt(match[0], 10) : 0;

    if (num < 0) {
      return { porcentaje: Math.min(Math.abs(num), 100), texto: raw, color: "#b91c1c", ordenValor: num };
    }
    if (num >= 50) {
      return { porcentaje: Math.min(num, 100), texto: raw, color: "#2e7d52", ordenValor: num };
    }
    if (num >= 25) {
      return { porcentaje: Math.min(num, 100), texto: raw, color: "#c27803", ordenValor: num };
    }
    return { porcentaje: Math.max(num, 4), texto: raw, color: "var(--accent-seal)", ordenValor: num };
  }

  function limpiarFiltrosFacciones() {
    faccionActiva = "todas";
    razaFaccionesActiva = "todas";
    estadoFaccionesActivo = "todos";
    ordenFaccionesActivo = "original";
    if (elFiltroRazaFacciones) elFiltroRazaFacciones.value = "todas";
    if (elFiltroEstadoFacciones) elFiltroEstadoFacciones.value = "todos";
    if (elOrdenFacciones) elOrdenFacciones.value = "original";
    renderizarFacciones();
  }

  function renderizarFacciones() {
    if (!elFiltrosFaccion || !elGrillaFacciones) return;

    const npcs = entradasCodice
      .filter(e => e.categoria === "NPC")
      .map((e, idxOriginal) => ({
        ...e,
        idxOriginal,
        faccionReal: (e.faccion && e.faccion.trim()) ? e.faccion.trim() : "Independiente"
      }));

    const faccionesBase = ["Howl of hope", "Los de una tierra distante", "Independiente"];
    const extras = [...new Set(npcs.map(n => n.faccionReal))].filter(f => !faccionesBase.includes(f));
    const listaFacciones = ["todas", ...faccionesBase, ...extras];

    elFiltrosFaccion.innerHTML = "";
    listaFacciones.forEach(fac => {
      const total = fac === "todas"
        ? npcs.length
        : npcs.filter(n => n.faccionReal === fac).length;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cat-btn";
      if (faccionActiva === fac) btn.classList.add("activa");
      btn.textContent = fac === "todas" ? `Todas (${total})` : `${fac} (${total})`;
      btn.addEventListener("click", () => {
        faccionActiva = fac;
        renderizarFacciones();
      });
      elFiltrosFaccion.appendChild(btn);
    });

    let visibles = npcs.filter(item => {
      const coincideFac = faccionActiva === "todas" || item.faccionReal === faccionActiva;
      const etiquetasRaza = obtenerEtiquetasRaza(item);
      const coincideRaza = razaFaccionesActiva === "todas" || etiquetasRaza.includes(razaFaccionesActiva);
      const muerto = esPersonajeMuerto(item);
      const coincideEstado =
        estadoFaccionesActivo === "todos" ||
        (estadoFaccionesActivo === "muertos" && muerto) ||
        (estadoFaccionesActivo === "vivos" && !muerto);

      return coincideFac && coincideRaza && coincideEstado;
    });

    if (ordenFaccionesActivo === "confianza-desc") {
      visibles.sort((a, b) => {
        const va = analizarConfianza(a).ordenValor;
        const vb = analizarConfianza(b).ordenValor;
        if (va === null && vb === null) return a.idxOriginal - b.idxOriginal;
        if (va === null) return 1;
        if (vb === null) return -1;
        return vb - va;
      });
    } else if (ordenFaccionesActivo === "confianza-asc") {
      visibles.sort((a, b) => {
        const va = analizarConfianza(a).ordenValor;
        const vb = analizarConfianza(b).ordenValor;
        if (va === null && vb === null) return a.idxOriginal - b.idxOriginal;
        if (va === null) return 1;
        if (vb === null) return -1;
        return va - vb;
      });
    } else if (ordenFaccionesActivo === "nombre-asc") {
      visibles.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
    }

    elGrillaFacciones.innerHTML = "";
    if (visibles.length === 0) {
      elGrillaFacciones.innerHTML = `
        <div class="estado-vacio-codice">
          <span>No hay personajes que coincidan con esos filtros de facción, raza o estado.</span>
          <button type="button" class="tool-btn" id="btn-reset-facciones">Limpiar filtros</button>
        </div>
      `;
      const btnReset = document.getElementById("btn-reset-facciones");
      if (btnReset) btnReset.addEventListener("click", limpiarFiltrosFacciones);
      return;
    }

    visibles.forEach(item => {
      const muerto = esPersonajeMuerto(item);
      const card = document.createElement("article");
      card.className = "card-faccion";

      const top = document.createElement("div");
      top.className = "card-faccion-top";

      const avatarWrap = document.createElement("div");
      avatarWrap.className = muerto ? "card-faccion-avatar-wrap es-muerto" : "card-faccion-avatar-wrap";

      const avatar = document.createElement("div");
      avatar.className = "card-faccion-avatar";
      const { candidatos } = obtenerCandidatosImagen(item.imagen, item.nombre);
      let intento = 0;
      const img = document.createElement("img");
      img.alt = item.nombre;
      img.style.objectPosition = item.encuadre || "center 20%";
      img.onerror = () => {
        intento++;
        if (intento < candidatos.length) {
          img.src = candidatos[intento];
        } else {
          avatar.innerHTML = `<span class="card-faccion-inicial">${item.nombre.charAt(0)}</span>`;
        }
      };
      img.src = candidatos[0];
      avatar.appendChild(img);
      avatarWrap.appendChild(avatar);

      if (muerto) {
        const cintaMini = document.createElement("div");
        cintaMini.className = "cinta-muerto-mini";
        cintaMini.textContent = "MUERTO";
        avatarWrap.appendChild(cintaMini);
      }

      const razaCorta = obtenerEtiquetasRaza(item)[0] || "";
      const info = document.createElement("div");
      info.className = "card-faccion-info";
      info.innerHTML = `
        <h3 class="card-faccion-nombre">${item.nombre}</h3>
        <span class="badge-faccion" data-faccion="${item.faccionReal}">${item.faccionReal}</span>
        ${razaCorta ? `<span class="card-faccion-raza">${razaCorta}</span>` : ""}
      `;

      top.append(avatarWrap, info);
      card.appendChild(top);

      const conf = analizarConfianza(item);
      const bloqueConf = document.createElement("div");
      bloqueConf.className = "confianza-bloque";
      bloqueConf.innerHTML = `
        <div class="confianza-cabecera">
          <span>Confianza con el grupo</span>
          <strong style="color: ${conf.color}">${conf.texto}</strong>
        </div>
        <div class="confianza-pista">
          <div class="confianza-relleno" style="width: ${conf.porcentaje}%; background: ${conf.color};"></div>
        </div>
      `;
      card.appendChild(bloqueConf);

      card.addEventListener("click", () => abrirModalCodice(item));
      elGrillaFacciones.appendChild(card);
    });
  }

  if (elBtnCerrarModalCodice && elModalCodice) {
    elBtnCerrarModalCodice.addEventListener("click", () => elModalCodice.close());
    elModalCodice.addEventListener("click", (e) => {
      if (e.target === elModalCodice) {
        elModalCodice.close();
      }
    });
  }

  document.querySelectorAll("#filtros-categoria-codice .cat-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#filtros-categoria-codice .cat-btn").forEach(b => b.classList.remove("activa"));
      btn.classList.add("activa");
      categoriaCodiceActiva = btn.dataset.cat;
      nombreDestacadoCodice = "";
      renderizarCodice();
    });
  });

  if (elFiltroRazaCodice) {
    elFiltroRazaCodice.addEventListener("change", () => {
      razaCodiceActiva = elFiltroRazaCodice.value;
      nombreDestacadoCodice = "";
      renderizarCodice();
    });
  }

  if (elFiltroEstadoCodice) {
    elFiltroEstadoCodice.addEventListener("change", () => {
      estadoCodiceActivo = elFiltroEstadoCodice.value;
      nombreDestacadoCodice = "";
      renderizarCodice();
    });
  }

  elBuscarCodice.addEventListener("input", () => {
    nombreDestacadoCodice = "";
    renderizarCodice();
  });

  if (elFiltroRazaFacciones) {
    elFiltroRazaFacciones.addEventListener("change", () => {
      razaFaccionesActiva = elFiltroRazaFacciones.value;
      renderizarFacciones();
    });
  }

  if (elFiltroEstadoFacciones) {
    elFiltroEstadoFacciones.addEventListener("change", () => {
      estadoFaccionesActivo = elFiltroEstadoFacciones.value;
      renderizarFacciones();
    });
  }

  if (elOrdenFacciones) {
    elOrdenFacciones.addEventListener("change", () => {
      ordenFaccionesActivo = elOrdenFacciones.value;
      renderizarFacciones();
    });
  }

  /* ==================== EVENTOS GENERALES ==================== */
  if (elBtnToggleResumen) {
    elBtnToggleResumen.addEventListener("click", () => {
      const estaContraido = elPersResumen.classList.toggle("contraido");
      elBtnToggleResumen.textContent = estaContraido ? "Ver más" : "Ver menos";
    });
  }

  if (elBtnToggleVinculos) {
    elBtnToggleVinculos.addEventListener("click", () => {
      const abrir = elPanelVinculos.hidden;
      elPanelVinculos.hidden = !abrir;
      elBtnToggleVinculos.classList.toggle("activo", abrir);
      elBtnToggleVinculos.setAttribute("aria-expanded", String(abrir));
    });
  }

  document.getElementById("btn-pers-arriba").addEventListener("click", () => {
    seleccionarPersonaje(indicePersonaje - 1);
  });

  document.getElementById("btn-pers-abajo").addEventListener("click", () => {
    seleccionarPersonaje(indicePersonaje + 1);
  });

  let bloqueoScrollPila = false;
  elPilaCartas.addEventListener("wheel", (e) => {
    e.preventDefault();
    if (bloqueoScrollPila) return;
    bloqueoScrollPila = true;
    seleccionarPersonaje(e.deltaY > 0 ? indicePersonaje + 1 : indicePersonaje - 1);
    setTimeout(() => { bloqueoScrollPila = false; }, 320);
  }, { passive: false });

  window.addEventListener("resize", () => {
    const vistaPers = document.getElementById("vista-personajes");
    if (!vistaPers.hidden) {
      actualizarDisposicionPila();
      if (!elBtnToggleResumen || elBtnToggleResumen.textContent === "Ver más") {
        evaluarDesbordeResumen();
      }
    }
  });

  document.addEventListener("keydown", (e) => {
    const vistaPers = document.getElementById("vista-personajes");
    if (vistaPers.hidden) return;

    if (e.key === "ArrowUp") {
      e.preventDefault();
      seleccionarPersonaje(indicePersonaje - 1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      seleccionarPersonaje(indicePersonaje + 1);
    }
  });

  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      activarVista(btn.dataset.vista, true);
    });
  });

  document.getElementById("btn-fuente-mas").addEventListener("click", () => {
    tamanoFuente = Math.min(1.5, +(tamanoFuente + 0.08).toFixed(2));
    guardarStorage("novela_font_size", tamanoFuente);
    document.documentElement.style.setProperty("--reading-size", `${tamanoFuente}rem`);
  });

  document.getElementById("btn-fuente-menos").addEventListener("click", () => {
    tamanoFuente = Math.max(0.96, +(tamanoFuente - 0.08).toFixed(2));
    guardarStorage("novela_font_size", tamanoFuente);
    document.documentElement.style.setProperty("--reading-size", `${tamanoFuente}rem`);
  });

  if (elBtnTema) {
    elBtnTema.addEventListener("click", () => {
      const actual = document.documentElement.getAttribute("data-tema");
      const nuevo = actual === "papel" ? "noche" : "papel";
      aplicarTema(nuevo);
      guardarStorage("novela_tema", nuevo);
    });
  }

  elBtnAnt.addEventListener("click", () => {
    cargarCapitulo(indiceActual - 1, true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  elBtnSig.addEventListener("click", () => {
    cargarCapitulo(indiceActual + 1, true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  elBuscarCap.addEventListener("input", filtrarCapitulos);
  elFiltroArco.addEventListener("change", filtrarCapitulos);
  window.addEventListener("hashchange", resolverRutaDesdeHash);

  aplicarPreferenciasGuardadas();
  poblarSelectorArcos();
  poblarFiltrosRaza();
  inicializarPilaPersonajes();
  renderizarCodice();
  renderizarFacciones();

  const totalReales = capitulos.filter(c => !c.perdido).length;
  elStats.textContent = `${totalReales} capítulos — ${personajes.length} protagonistas — ${entradasCodice.length} entradas de códice`;

  if (!resolverRutaDesdeHash()) {
    const ultimoNum = Number(leerStorage("novela_ultimo_cap", "0"));
    const idxInicial = capitulos.findIndex(c => c.numero === ultimoNum);
    cargarCapitulo(idxInicial >= 0 ? idxInicial : 0, true);
  }
})();