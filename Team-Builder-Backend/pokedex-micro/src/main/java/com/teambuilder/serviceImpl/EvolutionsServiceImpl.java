package com.teambuilder.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teambuilder.dto.EvolutionsDTO;
import com.teambuilder.mapper.EvolutionsMapper;
import com.teambuilder.repository.EvolutionsRepository;
import com.teambuilder.service.EvolutionsService;

@Service
public class EvolutionsServiceImpl implements EvolutionsService {
	
	@Autowired
	private EvolutionsRepository evolutionsRepository;
	
	@Override
	public List<EvolutionsDTO> getEvolutionsFromPokemon(Integer pokemonId){
		List<Object[]> results = evolutionsRepository.findEvolutionsFromPokemon(pokemonId);
		
		return results.stream()
				.map(EvolutionsMapper::mapperFromObjectToPokeEvoDTO)
				.collect(Collectors.toList());
	}
	
	@Override
	public List<EvolutionsDTO> getEvolutionsToPokemon(Integer pokemonId){
		List<Object[]> results = evolutionsRepository.findEvolutionToPokemon(pokemonId);
		
		return results.stream()
			.map(EvolutionsMapper::mapperFromObjectToPokeEvoDTO)
			.collect(Collectors.toList());
	}
}
