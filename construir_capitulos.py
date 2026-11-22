import json
import re
from pathlib import Path

ORIGEN = Path("borradores")
DESTINO = Path("capitulos")
ARCHIVO_INDICE = Path("capitulos_index.js")

PATRON_ENCABEZADO = re.compile(r"^(#\s+|(\*{1,2})?Cap[ií]tulo\s+\d+\s*[:.\-—])", re.IGNORECASE)


def limpiar_titulo(linea: str, num_cap: int) -> str:
    sin_marca = re.sub(r"^#+\s*", "", linea).strip()
    sin_formato = re.sub(r"\*{1,2}(.+?)\*{1,2}", r"\1", sin_marca)
    sin_prefijo = re.sub(r"^Cap[ií]tulo\s+\d+\s*[:.\-—]\s*", "", sin_formato, flags=re.IGNORECASE).strip()
    return sin_prefijo or f"Capítulo {num_cap:02d}"


def main() -> None:
    ORIGEN.mkdir(exist_ok=True)
    DESTINO.mkdir(exist_ok=True)

    archivos = sorted(list(ORIGEN.glob("*.txt")) + list(ORIGEN.glob("*.md")))
    if not archivos:
        print("Coloca archivos como 001.txt, 002.txt o 022.md dentro de 'borradores/' y vuelve a ejecutar.")
        return

    indice_generado = []

    for ruta in archivos:
        digitos = "".join(c for c in ruta.stem if c.isdigit())
        if not digitos:
            print(f"Saltado (sin número en el nombre): {ruta.name}")
            continue

        num_cap = int(digitos)
        num_pad = f"{num_cap:03d}"

        texto = ruta.read_text(encoding="utf-8-sig").strip()
        parrafos = [linea.strip() for linea in texto.splitlines() if linea.strip()]

        if not parrafos:
            print(f"Saltado (archivo vacío): {ruta.name}")
            continue

        titulo = f"Capítulo {num_cap:02d}"
        if PATRON_ENCABEZADO.match(parrafos[0]):
            titulo = limpiar_titulo(parrafos.pop(0), num_cap)

        destino_archivo = DESTINO / f"{num_pad}.js"
        salida_js = (
            "window.CAPITULOS_CACHE = window.CAPITULOS_CACHE || {};\n"
            f"window.CAPITULOS_CACHE[{num_cap}] = {json.dumps(parrafos, ensure_ascii=False, indent=2)};\n"
        )
        destino_archivo.write_text(salida_js, encoding="utf-8")

        indice_generado.append({
            "numero": num_cap,
            "arco": "Crónica principal",
            "titulo": titulo,
            "perdido": False,
            "sinopsis": "",
            "archivo": f"capitulos/{num_pad}.js"
        })
        print(f"Procesado Cap. {num_pad}: '{titulo}' ({len(parrafos)} párrafos)")

    indice_generado.sort(key=lambda c: c["numero"])
    contenido_indice = (
        "// Archivo generado automáticamente por construir_capitulos.py\n"
        f"window.INDICE_CAPITULOS_AUTO = {json.dumps(indice_generado, ensure_ascii=False, indent=2)};\n"
    )
    ARCHIVO_INDICE.write_text(contenido_indice, encoding="utf-8")
    print(f"\nÍndice actualizado en {ARCHIVO_INDICE} con {len(indice_generado)} capítulo(s).")


if __name__ == "__main__":
    main()