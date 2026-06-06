# GuideIA — Project

*Document type: Reference*

## Quick Start

Central metadata file for the GuideIA project.
Read at the start of every session after loading `public/INDEX.md` from the Knowledge Base.
See `Methode.md` for working conventions and session model specific to this project.

## Keywords
guide-ia, assistant-ia, guide, francais, collaboration, humain-ia

## Purpose

**Canonical project name:** GuideIA

A practical guide describing how an AI assistant works internally and how to use it effectively.
Written in French. Produced through a documented human-AI collaboration, which is itself the subject of the guide's appendix.

## Structure

```
guideIA/
├── PROJECT.md          ← this file
├── Methode.md          ← working conventions and session model
├── Plan.md             ← guide structure and chapter content
├── GuideIA.md          ← final guide (deliverable)
├── Journal.md          ← session log
├── Todo.md             ← active backlog
├── figures/            ← guide figures by identifier
│   └── html/           ← figures for HTML render target
├── exemples-sessions/  ← session snapshots for the appendix
└── tools/              ← Node.js scripts (check, render, generation)
```

## AI Agent Setup

AI Assistant: Claude

See `Methode.md` for all project-specific working rules — session model, collaboration workflow, journaling, style guide, tagging system.

## Audit

Audit against: `conventions/project-structure.md`, `conventions/documentation.md`, `conventions/todo-list.md`.
Project-specific conformance: check that `Plan.md` and `GuideIA.md` are consistent (tags, figures, encadrés) using tools in `tools/`.

## Glossary

See `GLOSSARY.md` (to be created).

## Changelog

### Version 1.0 — Initial creation
**Date:** 2026-06-06
**Reason:** PROJECT.md was missing — created with minimal required content.
