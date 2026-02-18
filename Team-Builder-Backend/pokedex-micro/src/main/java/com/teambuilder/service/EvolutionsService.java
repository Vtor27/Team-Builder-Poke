package com.teambuilder.service;

import java.util.List;

import com.teambuilder.dto.EvolutionsDTO;

public interface EvolutionsService {

	List<EvolutionsDTO> getEvolutionsFromPokemon(Integer pokemonId);
	List<EvolutionsDTO> getEvolutionsToPokemon(Integer pokemonId);
}
