package com.teambuilder.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.teambuilder.dto.PokeInfoCompleteDTO;
import com.teambuilder.dto.PokedexFiltersDTO;
import com.teambuilder.dto.PokedexItemDTO;
import com.teambuilder.service.PokedexService;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

@RestController
@RequestMapping("/api/pokemon")
public class PokemonController {

	@Autowired
	private PokedexService pokedexService;

	@Operation(summary = "Filtrar Pokémon", description = "Obtiene una lista de Pokémon en formato resumido aplicando filtros opcionales (nombre, tipo, región, etc.)")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Success"),
			@ApiResponse(responseCode = "400", description = "Bad Request"),
			@ApiResponse(responseCode = "401", description = "Unauthorized"),
			@ApiResponse(responseCode = "403", description = "Forbidden"),
			@ApiResponse(responseCode = "404", description = "Not Found"),
			@ApiResponse(responseCode = "500", description = "Internal Server Error"),
			@ApiResponse(responseCode = "503", description = "Service unavailable"),
			@ApiResponse(responseCode = "504", description = "Gateway timeout"), })
	@GetMapping(path = "/filter", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<PokedexItemDTO>> getPokemonWithFilters(
			@RequestParam(name = "name", required = false) String name,
		    @RequestParam(name = "type", required = false) List<String> type,
		    @RequestParam(name = "regionApparitions", required = false) String regionApparitions,
		    @RequestParam(name = "generation", required = false) Integer generation,
		    @RequestParam(name = "tier", required = false) String tier,
		    @RequestParam(name = "regionOrigin", required = false) String regionOrigin
		) {
		List<PokedexItemDTO> pokemonList = pokedexService.getFilteredPokemon(name, type, regionApparitions, generation, tier, regionOrigin);
		
		return ResponseEntity.ok(pokemonList);
	}

	@Operation(summary = "Obtener Pokémon por ID", description = "Devuelve toda la información detallada de un Pokémon a partir de su ID")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Success"),
			@ApiResponse(responseCode = "400", description = "Bad Request"),
			@ApiResponse(responseCode = "401", description = "Unauthorized"),
			@ApiResponse(responseCode = "403", description = "Forbidden"),
			@ApiResponse(responseCode = "404", description = "Not Found"),
			@ApiResponse(responseCode = "500", description = "Internal Server Error"),
			@ApiResponse(responseCode = "503", description = "Service unavailable"),
			@ApiResponse(responseCode = "504", description = "Gateway timeout"), })
	@GetMapping(path = "/{id}", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<PokeInfoCompleteDTO> getPokemonDetailedInfo(@PathVariable("id") int id) {
		PokeInfoCompleteDTO pokemonSelec = pokedexService.getPokemonForId(id);
		return ResponseEntity.ok(pokemonSelec);

	}
}
