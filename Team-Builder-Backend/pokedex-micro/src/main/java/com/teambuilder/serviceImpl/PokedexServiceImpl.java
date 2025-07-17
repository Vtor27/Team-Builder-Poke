package com.teambuilder.serviceImpl;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teambuilder.domain.Pokemon;
import com.teambuilder.dto.PokeInfoCompleteDTO;
import com.teambuilder.dto.PokedexFiltersDTO;
import com.teambuilder.dto.PokedexItemDTO;
import com.teambuilder.mapper.PokemonMapper;
import com.teambuilder.repository.PokedexRepositoryCustom;
import com.teambuilder.service.PokedexService;

@Service
public class PokedexServiceImpl implements PokedexService{

	@Autowired
	private PokedexRepositoryCustom pokedexRepositoryCustom;
	
	
	@Override
	public List<PokedexItemDTO> getFilteredPokemon(String name, List<String> type, String regionApparitions, Integer generation, String tier, String regionOrigin) {
	    List<Pokemon> pokemonList = pokedexRepositoryCustom.advancedFilter(name, type, regionApparitions, generation, tier, regionOrigin);

	    return pokemonList.stream()
	            .map(PokemonMapper::mapperToItemDTO) //Se transforma cada Pokemon en la clase mapeada.
	            .collect(Collectors.toList());
	}


	@Override
	public PokeInfoCompleteDTO getPokemonForId(int id) {
		
		Pokemon pokeSelec = pokedexRepositoryCustom.detailedPokemon(id);
		return PokemonMapper.mapperToDTO(pokeSelec);	//DTO mapeado para leerlo en el front.
	}
}
