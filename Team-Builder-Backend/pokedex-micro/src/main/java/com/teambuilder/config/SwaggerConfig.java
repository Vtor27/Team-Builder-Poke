package com.teambuilder.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class SwaggerConfig {
	
	@Bean
	OpenAPI pokedexMicroOpenApi() {
		return new OpenAPI().info(new Info()
			.title("API Pokedex")
			.version("v1")
			.description("Endpoints expuestos por el Microservicio que se encarga de la pokedex"));
	}
}
