package com.teambuilder.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.teambuilder.dto.AbilityDTO;
import com.teambuilder.repository.PokedexRepositoryCustom;
import com.teambuilder.service.AbilityService;

@Service
@Transactional(readOnly = true)	//Todos los metodos de este servicio son de lectura.
public class AbilityServiceImpl implements AbilityService{
	
	@Autowired
	private PokedexRepositoryCustom pokedexRepositoryCustom;
	
	@Override
	public List<AbilityDTO> getAbilitiesByPokemonId(Integer pokemonId) {
		
		return pokedexRepositoryCustom.findAbilitiesByPokemonId(pokemonId);
	}

}
