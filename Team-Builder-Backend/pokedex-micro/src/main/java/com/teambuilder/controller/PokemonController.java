//package com.teambuilder.controller;
//
//
//import java.util.List;
//
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.teambuilder.dto.dtoPruebaPoke;
//import com.teambuilder.service.IPokemonService;
//
//import io.swagger.v3.oas.annotations.Operation;
//import io.swagger.v3.oas.annotations.responses.ApiResponses;
//import io.swagger.v3.oas.annotations.responses.ApiResponse;
//
//
//
//
//
//@RestController
//@RequestMapping("/api/pokemon")
//public class PokemonController {
//	
//	private final IPokemonService service;
//	
//	public PokemonController(IPokemonService service) {
//		this.service = service;
//	}
//	
//	@Operation(summary = "Controlador deprueba", description = "getAllPokes")
//	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Success"),
//			@ApiResponse(responseCode = "400", description = "Bad Request"),
//			@ApiResponse(responseCode = "401", description = "Unauthorized"),
//			@ApiResponse(responseCode = "403", description = "Forbidden"),
//			@ApiResponse(responseCode = "404", description = "Not Found"),
//			@ApiResponse(responseCode = "500", description = "Internal Server Error"),
//			@ApiResponse(responseCode = "503", description = "Service unavailable"),
//			@ApiResponse(responseCode = "504", description = "Gateway timeout"),	
//	}) 
//	@GetMapping(path = "/all", produces = { MediaType.APPLICATION_JSON_VALUE})
//	public ResponseEntity<List<dtoPruebaPoke>> obtenerTodos() {
//		List<dtoPruebaPoke> pokes = service.obtenerTodos();
//		
//		return ResponseEntity.ok(pokes);
//	}
//
//}
