package com.teambuilder.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teambuilder.dto.AbilityDTO;
import com.teambuilder.service.AbilityService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/api/pokemon")
public class AbilityController {

	@Autowired
	private AbilityService abilityService;
	
	@Operation(summary = "Listar habilidades", description = "Lista las habilidades de un poke según el id que reciba")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Success"),
			@ApiResponse(responseCode = "400", description = "Bad Request"),
			@ApiResponse(responseCode = "401", description = "Unauthorized"),
			@ApiResponse(responseCode = "403", description = "Forbidden"),
			@ApiResponse(responseCode = "404", description = "Not Found"),
			@ApiResponse(responseCode = "500", description = "Internal Server Error"),
			@ApiResponse(responseCode = "503", description = "Service unavailable"),
			@ApiResponse(responseCode = "504", description = "Gateway timeout"), })
	@GetMapping(path = "/{id}/ability", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<AbilityDTO>> getAbilitiesByPokemonId(@PathVariable("id") Integer id) {
		List<AbilityDTO> abilityList = abilityService.getAbilitiesByPokemonId(id);
		
		return ResponseEntity.ok(abilityList);
	}
}
	
	
