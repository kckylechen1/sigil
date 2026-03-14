import type { MemoryEntry } from "./config.js";
export declare class MemoryStore {
    private store;
    constructor(dbPath: string);
    upsert(entry: MemoryEntry): void;
    get(id: string): MemoryEntry | undefined;
    getAll(limit: number): MemoryEntry[];
    /**
     * Delegates hybrid search to the Rust core.
     * `queryVec` is passed to Rust, which merges FTS + Vec + Symbolic scores.
     * Note: The Rust core expects the topK, pathPrefix, weights, etc. options
     * to be passed as a JSON string to keep the NAPI boundary simple.
     */
    search(query: string, queryVec?: number[], opts?: {
        top_k?: number;
        candidates?: number;
        path_prefix?: string;
        record_access?: boolean;
        weights?: {
            semantic: number;
            fts: number;
            symbolic: number;
            decay: number;
        };
    }): {
        docs: MemoryEntry[];
        scores: Record<string, number>;
    };
    /**
     * Find entries similar to the given vector using Rust's sqlite-vec KNN.
     * Returns entries with their raw cosine similarity (from the vector channel).
     * Used for dedup/merge decisions — no FTS or symbolic scoring involved.
     */
    findSimilar(queryVec: number[], topK?: number): Array<{
        entry: MemoryEntry;
        similarity: number;
    }>;
    /**
     * Delete a memory entry by ID (used after merge to remove the old entry).
     * Falls back silently if the entry doesn't exist.
     */
    delete(id: string): void;
}
export declare function getStore(dbPath: string, legacyShadowPath?: string, logger?: any): Promise<MemoryStore>;
//# sourceMappingURL=store.d.ts.map