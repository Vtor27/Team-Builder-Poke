package com.teambuilder.repository;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Predicate;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.teambuilder.domain.Generation;
import com.teambuilder.domain.Pokemon;
import com.teambuilder.domain.PokemonType;
import com.teambuilder.domain.Region;
import com.teambuilder.domain.RegionApparitions;
import com.teambuilder.domain.Tier;
import com.teambuilder.domain.Types;

@Repository
@Primary
public class PokedexRepositoryCustomImpl implements PokedexRepositoryCustom {

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public List<Pokemon> advancedFilter(String name, List<String> type, String regionApparitions, Integer generation,
			String tier, String regionOrigin) {

		CriteriaBuilder cb = entityManager.getCriteriaBuilder(); // Constructor de la query
		CriteriaQuery<Pokemon> cQuery = cb.createQuery(Pokemon.class); // Tipo de resultado

		Root<Pokemon> root = cQuery.from(Pokemon.class); // Punto de partida (tabla principal)

		// Fetch a todos los campos para que traiga la info completa de los pokes
		// filtrados aunque no se filtre por algún campo
		root.fetch("pokemonTypes", JoinType.LEFT);
		root.fetch("generation", JoinType.LEFT);
		root.fetch("tier", JoinType.LEFT);
		root.fetch("regionApparitions", JoinType.LEFT);
		root.fetch("regionOrigin", JoinType.LEFT);

		// Filtros -> Predicados
		List<Predicate> filters = new ArrayList<>();

		if (name != null && !name.isEmpty()) {
			// Filtro por nombre (transforma todoaminusculas), buscando coincidencias
			// parciales con LIKE:
			// por ejemplo, si name = "chu", coincidirá con "Pikachu", "Raichu", etc.
			filters.add(cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%"));
		}

		if (type != null && !type.isEmpty()) {
			Join<Pokemon, PokemonType> joinTypes = root.join("pokemonTypes", JoinType.INNER);
			Join<PokemonType, Types> joinTypeName = joinTypes.join("type", JoinType.INNER);
			filters.add(cb.lower(joinTypeName.get("name")).in(
				    type.stream().map(String::toLowerCase).collect(Collectors.toList())
					)
);
// name en este caso es el nombre del tipo(está en la
																	// tabla type)
		}

		if (generation != null && generation != 0) {
			Join<Pokemon, Generation> joinGeneration = root.join("generation", JoinType.INNER);
			filters.add(cb.equal(joinGeneration.get("number"), generation));
		}

		if (tier != null && !tier.isEmpty()) {
			Join<Pokemon, Tier> joinTier = root.join("tier", JoinType.INNER);
			filters.add(cb.equal(cb.lower(joinTier.get("name")), tier.toLowerCase()));
		}

		// Filtro por región de origen (ManyToOne hacia Region)
		// Se compara por nombre ignorando mayúsculas
		if (regionOrigin != null && !regionOrigin.isEmpty()) {
			Join<Pokemon, Region> joinRegionOrigin = root.join("regionOrigin", JoinType.INNER);
			filters.add(cb.equal(cb.lower(joinRegionOrigin.get("name")), regionOrigin.toLowerCase()));
		}

		if (regionApparitions != null && !regionApparitions.isEmpty()) {
			Join<Pokemon, RegionApparitions> joinRegionApparitions = root.join("regionApparitions", JoinType.INNER);
			Join<RegionApparitions, Region> joinRegion = joinRegionApparitions.join("region", JoinType.INNER);
			filters.add(cb.equal(cb.lower(joinRegion.get("name")), regionApparitions.toLowerCase()));
		}

		// Utilizar los filtros en el WHERE
		// Convierte la lista de predicados a un array y los combina con AND para que se
		// cumplan todos los criterios.
		Predicate[] filtersList = filters.toArray(new Predicate[0]);
		cQuery.select(root).where(cb.and(filtersList));
		
		//Ordena el filtro de pokes
		cQuery.orderBy(cb.asc(root.get("id")));

		// Devuelve una lista.
		return entityManager.createQuery(cQuery).getResultList();
	}

	@Override
	public Pokemon detailedPokemon(int id) {
		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		CriteriaQuery<Pokemon> cQuery = cb.createQuery(Pokemon.class);

		Root<Pokemon> root = cQuery.from(Pokemon.class);

		// Fetch a todos los campos para que traiga la info completa de los pokes
		// filtrados aunque no se filtre por algún campo
		root.fetch("pokemonTypes", JoinType.LEFT);
		root.fetch("generation", JoinType.LEFT);
		root.fetch("tier", JoinType.LEFT);
		root.fetch("regionApparitions", JoinType.LEFT);
		root.fetch("regionOrigin", JoinType.LEFT);

		// Filtro por la ID
		cQuery.select(root).where(cb.equal(root.get("id"), id));

		return entityManager.createQuery(cQuery).getSingleResult();
	}

//	Prefiero utilizar Criteria a @Query porque puedo detectar los fallos más facilmente, es más facil de testear y se puede escalar más facilmente. 
//	@Query("SELECT p FROM Pokemon p " +
//		       "LEFT JOIN FETCH p.types " +
//		       "LEFT JOIN FETCH p.generation " +
//		       "LEFT JOIN FETCH p.tier " +
//		       "LEFT JOIN FETCH p.region " +
//		       "LEFT JOIN FETCH p.regionApparitions " +
//		       "LEFT JOIN FETCH p.regionOrigin " +
//		       "WHERE p.id = :id")
//		Optional<Pokemon> findByIdConRelaciones(@Param("id") int id);

}
