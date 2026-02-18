package com.teambuilder.mapper;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import com.teambuilder.domain.Pokemon;
import com.teambuilder.domain.PokemonType;
import com.teambuilder.dto.EvolutionsDTO;

public class EvolutionsMapper {

	public static EvolutionsDTO mapperToPokeEvoDTO(Pokemon pokeEvolution) {
		List<String> types = pokeEvolution.getPokemonTypes().stream()
				.sorted(Comparator.comparingInt(PokemonType::getSlot))
				.map(pokemonType -> pokemonType.getType().getName()).distinct().collect(Collectors.toList());

		return new EvolutionsDTO(pokeEvolution.getId(), pokeEvolution.getName(), types, pokeEvolution.getIcon());
	}

	public static EvolutionsDTO mapperFromObjectToPokeEvoDTO(Object[] poke) {
		Integer id = (Integer) poke[0];
		String name = (String) poke[1];
		String type = (String) poke[2];
		String icon = (String) poke[3];

		List<String> types;

		if (type != null && !type.isEmpty()) {
			types = Arrays.asList(type.split(","));
		} else {
			types = new ArrayList<>();
		}
		return new EvolutionsDTO(id, name, types, icon);
	}
}
