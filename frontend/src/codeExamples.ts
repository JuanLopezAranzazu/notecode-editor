// One starter example per language in LANGUAGES (src/languages.ts).
// Shown automatically when the user picks a language, but only while the
// editor still holds a placeholder/example (see isUntouchedExample in
// App.tsx) — real edits are never overwritten by a language switch.

export const CODE_EXAMPLES: Record<string, string> = {
  plaintext: `Hola, mundo!
Escribe o pega cualquier texto aquí.`,

  javascript: `function saludar(nombre) {
  console.log(\`Hola, \${nombre}!\`);
}

saludar("mundo");`,

  typescript: `function saludar(nombre: string): string {
  return \`Hola, \${nombre}!\`;
}

console.log(saludar("mundo"));`,

  python: `def saludar(nombre):
    return f"Hola, {nombre}!"

print(saludar("mundo"))`,

  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hola, mundo!");
    }
}`,

  csharp: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hola, mundo!");
    }
}`,

  cpp: `#include <iostream>

int main() {
    std::cout << "Hola, mundo!" << std::endl;
    return 0;
}`,

  c: `#include <stdio.h>

int main() {
    printf("Hola, mundo!\\n");
    return 0;
}`,

  go: `package main

import "fmt"

func main() {
    fmt.Println("Hola, mundo!")
}`,

  rust: `fn main() {
    println!("Hola, mundo!");
}`,

  php: `<?php

function saludar($nombre) {
    return "Hola, $nombre!";
}

echo saludar("mundo");`,

  ruby: `def saludar(nombre)
  "Hola, #{nombre}!"
end

puts saludar("mundo")`,

  swift: `func saludar(nombre: String) -> String {
    return "Hola, \\(nombre)!"
}

print(saludar(nombre: "mundo"))`,

  kotlin: `fun saludar(nombre: String) = "Hola, $nombre!"

fun main() {
    println(saludar("mundo"))
}`,

  sql: `SELECT nombre, email
FROM usuarios
WHERE activo = true
ORDER BY nombre ASC;`,

  html: `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Hola, mundo</title>
  </head>
  <body>
    <h1>Hola, mundo!</h1>
  </body>
</html>`,

  css: `.saludo {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f2c14e;
}`,

  json: `{
  "mensaje": "Hola, mundo!",
  "activo": true,
  "version": 1
}`,

  yaml: `mensaje: Hola, mundo!
activo: true
etiquetas:
  - saludo
  - ejemplo`,

  markdown: `# Hola, mundo

Este es un **ejemplo** de código en _Markdown_.

- Punto uno
- Punto dos`,

  shell: `#!/usr/bin/env bash

nombre="mundo"
echo "Hola, \${nombre}!"`,
};
