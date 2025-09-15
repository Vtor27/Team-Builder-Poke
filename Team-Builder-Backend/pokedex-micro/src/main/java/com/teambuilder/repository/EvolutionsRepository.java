package com.teambuilder.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.teambuilder.domain.Evolutions;

public interface EvolutionsRepository extends JpaRepository<Evolutions, Integer> {

	@Query(value = """
			SELECT p.id, p.name,
				   STRING_AGG(t.nombre, ',' ORDER BY pt.slot) as type,
				   p.image
			FROM evolutions e
			JOIN pokemon p ON e.from_pokemon_id = p.id
			JOIN pokemon_type pt ON p.id = pt.pokemon_id
			JOIN types t ON pt.type_id = t.id
			WHERE e.to_pokemon_id = :pokemonId
			GROUP BY p.id, p.name, p.image
			""", nativeQuery = true)
	List<Object[]> findEvolutionsFromPokemon(@Param("pokemonId") Integer pokemonId);

	@Query(value = """
			SELECT p.id, p.name,
				   STRING_AGG(t.nombre, ',' ORDER BY t.nombre) as type,
				   p.image
			FROM evolutions e
			JOIN pokemon p ON e.to_pokemon_id = p.id
			JOIN pokemon_type pt ON p.id = pt.pokemon_id
			JOIN types t ON pt.type_id = t.id
			WHERE e.from_pokemon_id = :pokemonId
			GROUP BY p.id, p.name, p.image
			""", nativeQuery = true)
	List<Object[]> findEvolutionToPokemon(@Param("pokemonId") Integer pokemonId);
	
//	// Método adicional para obtener info de un Pokémon específico (si lo necesitas)
//    @Query(value = """
//        SELECT p.id, p.name,
//               STRING_AGG(DISTINCT t.name, ',' ORDER BY pt.slot) as types,
//               p.icon
//        FROM pokemon p
//        JOIN pokemon_type pt ON p.id = pt.pokemon_id
//        JOIN type t ON pt.type_id = t.id
//        WHERE p.id = :pokemonId
//        GROUP BY p.id, p.name, p.icon
//        """, nativeQuery = true)
//    List<Object[]> findPokemonInfoById(@Param("pokemonId") Integer pokemonId);

}
