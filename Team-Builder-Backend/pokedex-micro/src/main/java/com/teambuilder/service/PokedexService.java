package com.teambuilder.service;

import java.util.List;

import com.teambuilder.dto.PokeInfoCompleteDTO;
import com.teambuilder.dto.PokedexItemDTO;

public interface PokedexService {
	
	List<PokedexItemDTO> getFilteredPokemon(String name, List<String> type, String regionApparitions,
			Integer generation, String tier, String regionOrigin);
	
	PokeInfoCompleteDTO getPokemonForId(int id);
}
