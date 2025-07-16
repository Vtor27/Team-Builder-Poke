package com.teambuilder.domain;

import java.io.Serializable;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Clase embebible que representa la clave primaria compuesta
 * de la entidad RegionApparitions.
 *
 * Esta clave se compone de dos campos:
 * - pokemon: ID del Pokémon (clave foránea hacia la entidad Pokemon)
 * - region: ID de la región (clave foránea hacia la entidad Region)
 *
 * Es utilizada por JPA mediante la anotación @EmbeddedId en la entidad principal.
 * 
 * Al implementar Serializable y usar @EqualsAndHashCode de Lombok,
 * se garantiza un funcionamiento correcto en el contexto de claves compuestas.
 */
@Embeddable
@Data
@EqualsAndHashCode
public class RegionApparitionsId implements Serializable {
	
	
	private static final long serialVersionUID = 1L;
	
	private Integer pokemon;
	private Integer region;
}
