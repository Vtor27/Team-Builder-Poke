package com.teambuilder.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teambuilder.dto.EvolutionsDTO;
import com.teambuilder.service.EvolutionsService;

@RestController
@RequestMapping("/api/evolutions")
public class EvolutionsController {
	
	@Autowired
	private EvolutionsService evolutionsService;
	
//	public EvolutionsController(EvolutionsService evolutionsService) {
//		this.evolutionsService = evolutionsService;
//	}
	
	@GetMapping("from/{pokemonId}")
	public ResponseEntity<List<EvolutionsDTO>> getFromEvolution(@PathVariable("pokemonId") int pokemonId){
		List<EvolutionsDTO> evolution =  evolutionsService.getEvolutionsFromPokemon(pokemonId);
		
		return ResponseEntity.ok(evolution);
	}
	
	@GetMapping("to/{pokemonId}")
	public ResponseEntity<List<EvolutionsDTO>> getToEvolution(@PathVariable("pokemonId") Integer pokemonId){
		List<EvolutionsDTO> evolution = evolutionsService.getEvolutionsToPokemon(pokemonId);
		
		return ResponseEntity.ok(evolution);
	}
}
