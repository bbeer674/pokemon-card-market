import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "https://api.pokemontcg.io/v2/cards";
const PAGE_SIZE = 20;

interface PokemonCard {
  id: string;
  name: string;
  images: { small: string };
  cardmarket?: { prices?: { averageSellPrice?: number } };
  set?: { name?: string; total?: number };
  types?: string[];
  rarity?: string;
}

interface FetchPokemonParams {
  page: number;
  searchQuery?: string;
  type?: string;
  rarity?: string;
  set?: string;
}

const fetchPokemonCards = async ({
  page,
  searchQuery,
  type,
  rarity,
  set,
}: FetchPokemonParams): Promise<PokemonCard[]> => {
  const params: Record<string, string | number> = {
    pageSize: PAGE_SIZE,
    page,
  };

  let query: string[] = [];
  if (searchQuery) query.push(`name:*${searchQuery}*`);
  if (type) query.push(`types:*${type}*`);
  if (rarity) query.push(`rarity:*${rarity}*`);
  if (set) query.push(`set.name:*${set}*`);

  if (query.length > 0) params["q"] = query.join(" AND ");

  const { data } = await axios.get<{ data: PokemonCard[] }>(API_URL, {
    params,
  });
  return data.data;
};

export const usePokemon = (
  page: number,
  searchQuery?: string,
  type?: string,
  rarity?: string,
  set?: string
) => {
  return useQuery<PokemonCard[], Error>({
    queryKey: [
      "pokemonCards",
      page,
      searchQuery ?? "",
      type ?? "",
      rarity ?? "",
      set ?? "",
    ],
    queryFn: () => fetchPokemonCards({ page, searchQuery, type, rarity, set }),
  });
};
