package com.teambuilder.service;

import java.util.List;

import com.teambuilder.dto.AbilityDTO;

public interface AbilityService {
	
	List<AbilityDTO> getAbilitiesByPokemonId(Integer pokemonId);
}
