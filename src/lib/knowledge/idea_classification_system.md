# Sistema de Clasificación de Ideas NeoProxy (IdeaMap) 🗂️📍

Para evitar el caos cognitivo y asegurar que cada chispa creativa sea recuperable, NeoProxy utiliza el siguiente sistema de etiquetado y archivado.

## 1. Niveles de Madurez (Maturity Levels)

| Tag | Estado | Descripción |
| :--- | :--- | :--- |
| `[SEED]` | Semilla | Idea pura, sin validación técnica. |
| `[RESEARCH]` | Investigación | Documentación en curso, bibliografía, ciencia. |
| `[ARCHIVE]` | Archivo | Concepto completo pero fuera del roadmap actual. |
| `[PROTO]` | Prototipo | Fase de implementación técnica inicial. |
| `[CORE]` | Núcleo | Integrado en el Kernel NeoProxy. |

## 2. Categorías de Interés
- `GEN-ART`: Algoritmos generativos y estética.
- `SYS-ARCH`: Arquitectura de agentes y protocolos.
- `ETHICS`: Filosofía y ética de la IA.
- `FAB`: Fabricación física y materiales.
- `SOCIAL`: Gobernanza y modelos colaborativos (ej. NeoGenesis).

## 3. Protocolo de Registro
Cada nueva idea debe generar un archivo `.md` en `src/lib/knowledge/[capa]/` con el siguiente frontmatter:
```markdown
---
id: [UUID]
status: [SEED|ARCHIVE|CORE]
tags: [tag1, tag2]
ancestor: [id_previo]
---
```
