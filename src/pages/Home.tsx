import { useState } from "react";
import { Filter } from "../components/Filter";
import { Card } from "../components/Card";
import { Pagination } from "../components/Pagination";
import { usePokemon } from "../hooks/usePokemon";
import Navbar from "../components/Navbar";
import { Cart } from "../components/Cart";
import { LoadingScreen } from "../components/LoadingScreen";

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ type: "", rarity: "", set: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const {
    data: pokemonCards,
    isLoading,
    error,
  } = usePokemon(
    currentPage,
    searchQuery,
    filters.type,
    filters.rarity,
    filters.set
  );

  if (error)
    return <p className="text-red-500">Error loading Pokémon cards.</p>;

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <div className="container mx-auto p-6">
        <Navbar
          onCartClick={() => setIsCartOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <hr className="border-1 border-button-add" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 pt-5">
          <span className="text-white text-lg w-full text-left">
            Choose Card
          </span>

          <Filter onFilter={setFilters} />
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <LoadingScreen />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center">
            {pokemonCards?.map((card) => (
              <Card
                key={card.id}
                id={card.id}
                name={card.name}
                imageUrl={card.images.small}
                price={card.cardmarket?.prices?.averageSellPrice || 0}
                quantity={card.set?.total || 0}
                stock={card.set?.total || 0}
              />
            ))}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={setCurrentPage}
        />
      </div>
      <div
        className={`fixed top-0 right-0 w-96 h-full bg-primary shadow-lg transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Cart onClose={() => setIsCartOpen(false)} />
      </div>
    </div>
  );
};
