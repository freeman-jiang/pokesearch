import type { NextPage } from "next";
import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import PokeAPI from "pokeapi-typescript";

interface Inputs {
  name: string;
}

const Home: NextPage = () => {
  const { register, handleSubmit, watch } = useForm<Inputs>({
    defaultValues: { name: "" },
  });
  const pokemonName = watch("name");

  const getPokemonByName = async () => {
    return PokeAPI.Pokemon.resolve(pokemonName);
  };

  const { data: pokemon, refetch } = useQuery([pokemonName], getPokemonByName, {
    enabled: false,
  });

  const onSubmit: SubmitHandler<Inputs> = async ({ name }) => {
    refetch();
  };

  console.log(pokemon);

  return (
    <>
      <Head>
        <title>Pokésearch</title>
      </Head>
      <div className="flex w-full justify-center items-center min-h-screen">
        <div className="text-center w-full max-w-sm px-4">
          <h1 className="font-bold text-4xl">Pokésearch</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("name")}
              className="w-full mt-3 rounded-xl px-5 py-3 transition-all placeholder:text-neutral-500 border-2 border-neutral-200 focus:border-sky-500 outline-none"
              placeholder="Search for any Pokémon in the universe"
            />
          </form>
          {pokemon && (
            <div className="max-w-sm rounded-xl mt-4 overflow-hidden shadow-lg p-8">
              <img
                className="w-full"
                src={pokemon.sprites.front_default}
                alt="Sunset in the mountains"
              />
              <div>
                <div className="font-bold text-xl mb-2 capitalize">
                  {pokemon.name}
                </div>
                <p className="text-gray-700 text-base capitalize">
                  <span className="font-bold">Abilities: </span>
                  {pokemon.abilities
                    .map((ability) => ability.ability.name)
                    .join(", ")}
                </p>
              </div>
              <div className="mt-2">
                {pokemon.types.map(({ type: { name } }) => (
                  <span className="inline-block bg-pink-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
