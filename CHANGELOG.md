# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2026-03-14

### Added
- **Core/MCP**: Introduced `hard_state` table and corresponding `set_state` / `get_state` endpoints to store rigid KV data distinct from semantic mappings. This resolves data hallucination for strict key values like dynamic watchlists.
- **MCP/Workers**: Created `derived_items` table explicitly isolating Causal logic and Distillation outputs from primary empirical facts, drastically improving search relevancy.
- **Server**: Implemented `ENABLE_PIPELINE` logic (defaulting to false) to toggle the background asynchronous extraction process on demand to maximize pure querying speeds.

### Changed
- **Pipeline**: Shifted event extraction process to lazy-execution triggered under the background thread pool queue. 
- **Core/MCP**: Removed all LLM-based abstract summarization fallback functions from standard `save_memory` path to bypass latency delays.

### Removed
- **MCP**: Eliminated `Voyage-Rerank-2.5` dependency from standard hybrid searches. Core Rust pipeline handles similarity filtering accurately enough, boosting response time natively via KNN & FTS5 mechanisms alone.
- **Scrap**: Cleaned up legacy unmaintained prototype directories `memory-mcp/` and `memory-core-rs/` from local `scratch` areas.

## [0.2.1] - 2026-03-13

### Fixed
- **MCP/Extractor**: Fixed `httpx.ReadTimeout` empty error bug in `extract_facts` and added 3-round exponential backoff (2s/4s/8s) for Siliconflow API calls to improve retry resilience against transient network failures.
- **Config**: Fixed `config.ts` environmental variable parsing where `MEMORY_DB_PATH` was not expanding `~` to home directory. Additionally ensured `install_openclaw_ext.sh` creates the necessary `data` directory.
- **Memory Deduplication** (PR #4): Merged two-stage memory deduplication (`HARD_SKIP` vs `EVOLVE`) with upsert indentation bug fix. This resolves the issue of over-aggressive memory deduplication. Tests confirmed this mathematical threshold approach is more robust than LLM-based (GLM-4/Qwen/DeepSeek) deduplication judgments for this specific pipeline.

## [0.2.0] - 2026-03-08

### Added
- **MCP/Workers**: Activated causal worker pipeline for asynchronous extraction of cause-and-effect relationships.
- **Core**: Refactored `memory_relations` support to allow robust linking of related memory fragments.
- **Docs**: Added one-click install script for OpenClaw.
- **Docs**: Added Sigil v2 PRD (architecture specification) for causal pipelines and memory workers.
- **Async Pipeline**: Phase 2 async event pipeline with 4 memory workers (Extractor, Distiller, CausalWorker, Consolidator).

### Changed
- **MCP/Extractor**: Upgraded default fact extraction model to `Qwen3.5-27B` for significantly better causal relationship tracking and structured fact parsing.
- **Docs**: Updated the recommended extraction model in `README.zh-CN.md` and `README.md` to `Qwen3.5-27B`.

### Fixed
- **Core**: Stabilized vector KNN searches and ensured `auto-capture` remains writable.
- **Core**: Addressed SQLite Upsert limitations by migrating to `DELETE` + `INSERT` for `sqlite-vec` `vec0` virtual tables.
- **OpenClaw Plugin**: Fixed critical hooks and synced all improvements to the latest agent platform requirements.
- **OpenClaw Plugin**: Corrected plugin kind to `memory`, removed dead code paths, and added native Voyage reranker support.
- **OpenClaw Plugin**: Ensure `installer` reliably builds bindings and loads the plugin successfully.
- **Python MCP**: Resolved code smells during fact extraction and migrations.

## [0.1.0] - 2026-03-05

### Added
- Initial release of the Sigil Memory System.
- Blazing Fast Rust Core (`memory-core`) featuring Native CJK FTS5 text search and `sqlite-vec` semantic indexing.
- 4-Channel Hybrid Search Engine (Semantic, Lexical, Symbolic, Decay).
- Native Node.js `NAPI-RS` bindings for OpenClaw extension.
- Native Python `PyO3` bindings targeting MCP server frameworks.
- Added Dotenv support for graceful API key extraction from project roots.
- Support for Voyage-4, Voyage Rerank-2.5, and GLM-4 base models.
