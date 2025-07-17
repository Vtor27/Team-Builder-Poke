package com.teambuilder.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;

import com.teambuilder.domain.Pokemon;

@SpringBootTest
//@TestConstructor(autowireMode = TestConstructor.AutowireMode.ALL)
public class PokedexRepositoryCustomImplTest {
	
	@Autowired
	@Qualifier("pokedexRepositoryCustomImpl")
	private PokedexRepositoryCustom pokedexRepository;
	
//	public PokedexRepositoryCustomImplTest(PokedexRepositoryCustom pokedexRepository) {
//		this.pokedexRepository = pokedexRepository;
//	}
	
//	@Test
//	public void testDetailedPokemon() {
//	    System.out.println("|---------  DETAILED POKE INFO -------|");
//	    int id = 150; // Mewtwo
//
//	    Pokemon dtoResult = pokedexRepository.detailedPokemon(id);
//
//	    assertNotNull(dtoResult);
//	    assertEquals(150, dtoResult.getId());
//	    assertEquals("Mewtwo", dtoResult.getName());
//	    assertNotNull(dtoResult.getGeneration());
//	    assertEquals(1, dtoResult.getGeneration().getId());
//
//	    boolean containType = dtoResult.getTypes().stream()
//	        .anyMatch(tipo -> tipo.getName().equals("Psychic"));
//	    assertTrue(containType);
//
//	    System.out.println("Nombre: " + dtoResult.getName());
//	    System.out.println("Tipos: " + dtoResult.getTypes());
//	    System.out.println("Generación: " + dtoResult.getGeneration());
//	}
	
	@Test
	public void testFilterByType() {
		System.out.println("|---------  FILTER BY TYPE -------|");
		List<String> types = new ArrayList<>();
		types.add("Fire");
		
		List<Pokemon> result = pokedexRepository.advancedFilter(null, types, null, null, null, null);
		
		assertNotNull(result);
		assertFalse(result.isEmpty());
		System.out.println("Pokemon de tipo fuego encontrados: " + result.size());
		System.out.println("|--------------------------------------------------------------|");
		System.out.println("|--------------------------------------------------------------|");
	}
	
	@Test
	public void testFilterByNameAndRegion() {
		System.out.println("|---------  FILTER BY NAME AND REGION -------|");
		List<Pokemon> result = pokedexRepository.advancedFilter("chu", null, null, null, null, "Kanto");
		
		assertNotNull(result);
		result.forEach(poke -> System.out.println("Pokemon buscado: " + poke.getName()));
		System.out.println("|--------------------------------------------------------------|");
		System.out.println("|--------------------------------------------------------------|");
	}
	
	@Test
	public void testFilterByGeneration() {
		System.out.println("|---------  FILTER BY GENERATION -------|");
		List<Pokemon> result = pokedexRepository.advancedFilter(null, null, null, 2, null, null);
		
		assertNotNull(result);
		assertFalse(result.isEmpty());
		
		System.out.println("Numero de pokes de generacion 2: " + result.size());
		System.out.println("El primer poke de la gen2 es -> " + result.get(0).getName());
		System.out.println("|--------------------------------------------------------------|");
		System.out.println("|--------------------------------------------------------------|");
	}
	
	@Test
	public void testFilterByRegionApparition() {
		System.out.println("|---------  FILTER BY REGION APPARITION -------|");
		List<Pokemon> result = pokedexRepository.advancedFilter(null, null, "Hoenn", null, null, null);
		
		assertNotNull(result);
		result.forEach(poke -> System.out.println("Pokes: " + poke.getName()));
		System.out.println("|--------------------------------------------------------------|");
		System.out.println("|--------------------------------------------------------------|");
	}
	
	@Test
	public void testFilterWithoutfilters() {
		System.out.println("|---------  NO FILTERS-------|");
		List<Pokemon> result = pokedexRepository.advancedFilter(null, null, null, null, null, null);
		
		assertNotNull(result);
		assertFalse(result.isEmpty());
		
		System.out.println("Numero de pokes: " + result.size());
		System.out.println("|--------------------------------------------------------------|");
		System.out.println("|--------------------------------------------------------------|");
	}

}
