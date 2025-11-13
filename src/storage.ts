// src/storage.ts
export type Persisted = {
  items: string[]; // the shuffled card texts
  gameState: boolean[]; // ticked/unticked cells
  updatedAt: number;
};

const KEY = "bc-bingo:v1";

export function loadPersist(): Persisted | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Persisted) : null;
  } catch {
    return null;
  }
}

export function savePersist(data: Omit<Persisted, "updatedAt">) {
  const payload: Persisted = { ...data, updatedAt: Date.now() };
  localStorage.setItem(KEY, JSON.stringify(payload));
}

export function clearPersist() {
  localStorage.removeItem(KEY);
}
