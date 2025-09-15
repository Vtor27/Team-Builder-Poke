package com.teambuilder.repository;

import java.util.List;
import com.teambuilder.domain.Pokemon;
import com.teambuilder.dto.AbilityDTO;


public interface PokedexRepositoryCustom {

	List<Pokemon> advancedFilter (String name, List<String> type,Integer generation, String tier, String regionOrigin);
	
	Pokemon detailedPokemon (int id);
	
	List<AbilityDTO> findAbilitiesByPokemonId(Integer pokemonId);
}
