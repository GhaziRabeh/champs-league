// service.ts
import { useQuery } from "@tanstack/react-query";

export class ApiError extends Error {
  constructor(public status: number, public path: string, message?: string) {
    super(message || `API Error: ${status} for ${path}`);
    this.name = "ApiError";
  }
}

const API_CONFIG = {
  baseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://ddragon.leagueoflegends.com",
  defaultRevalidate: 3600,
  timeout: 10000, // 10 seconds
  retryAttempts: 3,
  retryDelay: 1000,
} as const;

// Fetch with timeout
const createFetchWithTimeout = (timeout: number) => {
  return (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    return fetch(input, { ...init, signal: controller.signal }).finally(() =>
      clearTimeout(timeoutId)
    );
  };
};

const fetchWithTimeout = createFetchWithTimeout(API_CONFIG.timeout);

// REST GET helper
const restGet = async (path: string, options?: { revalidate?: number }) => {
  const url = `${API_CONFIG.baseUrl}${path}`;

  try {
    const res = await fetchWithTimeout(url, {
      next: { revalidate: options?.revalidate ?? API_CONFIG.defaultRevalidate },
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      throw new ApiError(res.status, path, `Failed GET ${path}: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new ApiError(0, path, `Network error for ${path}`);
    }
    throw new ApiError(500, path, `Unknown error for ${path}: ${error}`);
  }
};

// -------------------------
// API FUNCTIONS
// -------------------------

// Fetch all versions
export const getVersions = async (): Promise<string[]> => {
  try {
    const data = await restGet("/api/versions.json");
    return data;
  } catch (error) {
    console.error("Error fetching versions:", error);
    return [];
  }
};

// Fetch champions for a specific version
export const getChampions = async (
  version: string
): Promise<Record<string, any>> => {
  try {
    const data = await restGet(`/cdn/${version}/data/en_US/champion.json`);
    return data?.data || [];
  } catch (error) {
    console.error(`Error fetching champions for version ${version}:`, error);
    return [];
  }
};

// Fetch full champion data by ID
export const getChampionFullData = async (
  version: string,
  championId: string
): Promise<any> => {
  try {
    const data = await restGet(
      `/cdn/${version}/data/en_US/champion/${championId}.json`
    );
    return data?.data?.[championId] || null;
  } catch (error) {
    console.error(
      `Error fetching champion ${championId} for version ${version}:`,
      error
    );
    throw error;
  }
};
// Fetch maps data
export const getMaps = async (
  version: string
): Promise<Record<string, any>> => {
  try {
    const data = await restGet(`/cdn/${version}/data/en_US/map.json`);
    return data?.data || [];
  } catch (error) {
    console.error(`Error fetching maps for version ${version}:`, error);
    return [];
  }
};

// Fetch items data
export const getItems = async (
  version: string
): Promise<Record<string, any>> => {
  try {
    const data = await restGet(`/cdn/${version}/data/en_US/item.json`);
    return data?.data || [];
  } catch (error) {
    console.error(`Error fetching items for version ${version}:`, error);
    return [];
  }
};

// Fetch runes data
export const getRunes = async (version: string): Promise<any[]> => {
  try {
    const data = await restGet(`/cdn/${version}/data/en_US/runesReforged.json`);
    return data || [];
  } catch (error) {
    console.error(`Error fetching runes for version ${version}:`, error);
    return [];
  }
};




// -------------------------
// Query Keys
// -------------------------

export const versionQueryKeys = {
  all: ["versions"] as const,
  lists: () => [...versionQueryKeys.all, "list"] as const,
  list: (version: string) => [...versionQueryKeys.lists(), version] as const,
  champions: (version: string) =>
    [...versionQueryKeys.all, "champions", version] as const,
  champion: (version: string, championId: string) =>
    [...versionQueryKeys.all, "champion", version, championId] as const,
  maps: (version: string) =>
    [...versionQueryKeys.all, "maps", version] as const,
  items: (version: string) =>
    [...versionQueryKeys.all, "items", version] as const,
  runes: (version: string) =>
    [...versionQueryKeys.all, "runes", version] as const,
};

// -------------------------
// React Query Hooks
// -------------------------

// Fetch all versions
export const useVersions = () =>
  useQuery({
    queryKey: versionQueryKeys.lists(),
    queryFn: getVersions,
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
  });

// Fetch champions for a specific version
export const useChampions = (version?: string) =>
  useQuery({
    queryKey: versionQueryKeys.champions(version || ""),
    queryFn: () => {
      if (!version) throw new Error("Version is required");
      return getChampions(version);
    },
    enabled: !!version,
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
  });

// Fetch full champion data
export const useChampionFullData = (version?: string, championId?: string) =>
  useQuery({
    queryKey: versionQueryKeys.champion(version || "", championId || ""),
    queryFn: () => {
      if (!version || !championId)
        throw new Error("Version and champion ID are required");
      return getChampionFullData(version, championId);
    },
    enabled: !!version && !!championId,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: 2,
  });

export const useMaps = (version?: string) =>
  useQuery({
    queryKey: versionQueryKeys.maps(version || ""),
    queryFn: () => {
      if (!version) throw new Error("Version is required");
      return getMaps(version);
    },
    enabled: !!version,
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
  });

export const useItems = (version?: string) =>
  useQuery({
    queryKey: versionQueryKeys.items(version || ""),
    queryFn: () => {
      if (!version) throw new Error("Version is required");
      return getItems(version);
    },
    enabled: !!version,
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
  });

export const useRunes = (version?: string) =>
  useQuery({
    queryKey: versionQueryKeys.runes(version || ""),
    queryFn: () => {
      if (!version) throw new Error("Version is required");
      return getRunes(version);
    },
    enabled: !!version,
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
  });


